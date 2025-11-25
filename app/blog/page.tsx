"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "../components/Hero/AnimatedBackground";
import { useLanguage } from "../contexts/language-context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface BlogPost {
  _id: string;
  title: { mk: string; sr: string; en: string };
  slug: { mk?: { current: string }; sr?: { current: string }; en?: { current: string } } | string;
  mainImage: any;
  body: { mk: any; sr: any; en: any };
  publishedAt: string | { current: string };
  categories: any[];
}

export default function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts from API route...');
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getCurrentLanguageContent = (field: any) => {
    if (!field) return "";
    const langKey = language === "mk" ? "mk" : language === "sr" ? "sr" : "en";
    return field[langKey] || field.en || "";
  };

  const getSlugForLanguage = (slugObj: any): string => {
    if (!slugObj) return "unknown";
    try {
      const langKey = language === "mk" ? "mk" : language === "sr" ? "sr" : "en";
      if (typeof slugObj === "string") return slugObj;
      if (slugObj[langKey]?.current) return slugObj[langKey].current;
      if (slugObj.mk?.current) return slugObj.mk.current;
      if (slugObj.sr?.current) return slugObj.sr.current;
      if (slugObj.en?.current) return slugObj.en.current;
      if (slugObj.current) return slugObj.current;
    } catch (e) {
      console.error("Error in getSlugForLanguage:", e);
    }
    return "unknown";
  };

  // 🟢 Функција за исправен формат на датум
  const formatDate = (dateInput: string | { current: string }) => {
    if (!dateInput) return "Непознато";

    let dateStr = typeof dateInput === "string" ? dateInput : dateInput.current;
    if (!dateStr) return "Непознато";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Непознато";

    return date.toLocaleDateString(
      language === "mk" ? "mk-MK" : language === "sr" ? "sr-RS" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  const blogTitles: Record<string, { title: string; subtitle: string }> = {
    mk: { title: "Нашиот Блог", subtitle: "Најнови вести, совети и ресурси за вас." },
    sr: { title: "Наш Блог", subtitle: "Најновије вести, савети и ресурси за вас." },
    en: { title: "Our Blog", subtitle: "Latest news, tips and resources for you." },
  };

  const currentTitles = blogTitles[language] || blogTitles.en;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground className="z-0" />
      <Header className="relative z-10" />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold gradient-text mb-4">{currentTitles.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{currentTitles.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Вчитување...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Нема блог постови во моментот.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link key={post._id} href={`/blog/${getSlugForLanguage(post.slug)}`}>
                <div className="bg-muted/60 border border-border rounded-2xl overflow-hidden shadow-md backdrop-blur-md hover-lift transition cursor-pointer h-full">
                  {post.mainImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={getCurrentLanguageContent(post.title)}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-2 line-clamp-2">{getCurrentLanguageContent(post.title)}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{formatDate(post.publishedAt)}</p>
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {post.categories.map((cat: any) => (
                          <span key={cat._id} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{cat.title}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {typeof post.body?.en === "string" ? post.body.en.substring(0, 150) : "..."}
                    </p>
                    <span className="text-primary font-semibold hover:underline">
                      {language === "mk" ? "Прочитај повеќе →" : language === "sr" ? "Прочитај више →" : "Read More →"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer className="relative z-10" />
    </div>
  );
}
