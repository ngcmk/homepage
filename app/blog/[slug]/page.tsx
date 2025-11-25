"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AnimatedBackground from "../../components/Hero/AnimatedBackground";
import { useLanguage } from "../../contexts/language-context";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react';

interface BlogPost {
  _id: string;
  title: { mk: string; sr: string; en: string };
  slug: { mk: string; sr: string; en: string };
  mainImage: any;
  body: { mk: any; sr: any; en: any };
  publishedAt: string;
  categories: any[];
}

export default function BlogPostPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with slug:", slug);
        const response = await fetch(`/api/blog/${slug}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched post:", data);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const getCurrentLanguageContent = (field: any) => {
    if (!field) return "";
    const langKey = language === "mk" ? "mk" : language === "sr" ? "sr" : "en";
    return field[langKey] || field.en || "";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === "mk" ? "mk-MK" : "sr-RS");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground className="z-0" />
        <Header className="relative z-10" />
        <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Вчитување...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground className="z-0" />
        <Header className="relative z-10" />
        <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Пост не пронајден</h1>
            <Link href="/blog" className="text-primary hover:underline">
              ← Назад на блог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = getCurrentLanguageContent(post.title);
  const body = getCurrentLanguageContent(post.body);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground className="z-0" />
      <Header className="relative z-10" />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
          ← Назад на блог
        </Link>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">{title}</h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.categories && post.categories.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {post.categories.map((cat) => (
                  <span key={cat._id} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                    {getCurrentLanguageContent(cat.title)}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full h-96 mb-12 rounded-2xl overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          {body && typeof body === "object" && Array.isArray(body) ? (
            <PortableText value={body} />
          ) : (
            <p>{body}</p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8 mt-12">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
            ← Назад на блог
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
