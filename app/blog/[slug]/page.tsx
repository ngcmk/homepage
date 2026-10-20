
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/components/Language";
import { urlFor } from "@/lib/sanity";

const loc = (f: any, l: string) =>
  typeof f === "string"
    ? f
    : f?.[l] || f?.en || f?.mk || f?.sr || "";

export default function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang, t } = useLanguage();

  const [p, setP] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/api/blog/" + encodeURIComponent(slug))
      .then((r) => (r.ok ? r.json() : null))
      .then(setP)
      .catch(() => setP(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main>
        <div className="article cont">
          {lang === "mk"
            ? "Се вчитува објавата…"
            : lang === "sr"
              ? "Učitava se objava…"
              : "Loading article…"}
        </div>
      </main>
    );
  }

  if (!p) {
    return (
      <main>
        <div className="article cont">
          <Link href="/blog">← {t.nav[4]}</Link>
          <h1>
            {lang === "mk"
              ? "Објавата не е пронајдена"
              : lang === "sr"
                ? "Objava nije pronađena"
                : "Article not found"}
          </h1>
        </div>
      </main>
    );
  }

  const body = loc(p.body, lang);

  return (
    <main>
      <article className="article cont">
        <Link href="/blog">← {t.nav[4]}</Link>

        <small>
          {p.categories?.[0]?.title || (
            <>
              <span className="ngcGradientText">NGC</span> BLOG
            </>
          )}
        </small>

        <h1>{loc(p.title, lang)}</h1>

        <div className="ngcArticleContent">
          {p.mainImage && (
            <div className="ngcArticleImage">
              <Image
                src={urlFor(p.mainImage)
                  .width(1000)
                  .fit("max")
                  .url()}
                alt={loc(p.title, lang)}
                width={1000}
                height={700}
                priority
                sizes="(max-width: 768px) 100vw, 35vw"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          <div className="body portable ngcArticleBody">
            {Array.isArray(body) ? (
              <PortableText value={body} />
            ) : (
              <p>{body}</p>
            )}
          </div>
        </div>
      </article>

      <style jsx>{`
        .ngcArticleContent {
          display: flow-root;
          margin-top: 24px;
          width: 100%;
        }

        .ngcArticleImage {
          float: left;
          width: 35%;
          max-width: 520px;
          margin: 0 28px 18px 0;
          border-radius: 20px;
          overflow: hidden;
        }

        .ngcArticleImage :global(img) {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .ngcArticleContent :global(.ngcArticleBody) {
          display: block !important;
          width: auto !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
          float: none !important;
          clear: none !important;
        }

        @media (max-width: 768px) {
          .ngcArticleImage {
            float: none;
            width: 100%;
            max-width: 100%;
            margin: 0 0 22px;
          }
        }
      `}</style>
    </main>
  );
}
