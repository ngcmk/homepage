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
import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl font-semibold mb-5 leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-2xl font-semibold mb-4 leading-snug">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6 text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-6 leading-relaxed text-lg">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8 relative w-full h-96 rounded-2xl overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Blog image"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

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

  const backText: Record<string, string> = {
    mk: "← Назад на блог",
    sr: "← Назад на блог",
    en: "← Back to blog",
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) throw new Error(`Failed to fetch post: ${response.status}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  const getCurrentLanguageContent = (field: any) => {
    if (!field) return "";
    const langKey = language === "mk" ? "mk" : language === "sr" ? "sr" : "en";
    return field[langKey] || field.en || "";
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "mk" ? "mk-MK" : language === "sr" ? "sr-RS" : "en-US");

  if (loading)
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground className="z-0" />
        <Header className="relative z-10" />
        <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground py-12">Вчитување...</p>
        </main>
        <Footer />
      </div>
    );

  if (!post)
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground className="z-0" />
        <Header className="relative z-10" />
        <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "mk" ? "Пост не пронајден" : language === "sr" ? "Пост није пронађен" : "Post not found"}
          </h1>
          <Link href="/blog" className="text-primary hover:underline">
            {backText[language]}
          </Link>
        </main>
        <Footer />
      </div>
    );

  const title = getCurrentLanguageContent(post.title);
  const body = getCurrentLanguageContent(post.body);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground className="z-0" />
      <Header className="relative z-10" />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
          {backText[language]}
        </Link>

        <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-8 leading-tight">{title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-12">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.categories?.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2 flex-wrap">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="px-3 py-1 bg-primary/10 rounded-full text-sm whitespace-nowrap"
                  >
                    {getCurrentLanguageContent(cat.title)}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {post.mainImage && (
          <div className="relative w-full h-[28rem] mb-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-12">
          {body && typeof body === "object" && Array.isArray(body) ? (
            <PortableText value={body} components={components} />
          ) : (
            <p className="mb-6 leading-relaxed text-lg">{body}</p>
          )}
        </div>

        <div className="border-t border-border pt-8 mt-12">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
            {backText[language]}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
