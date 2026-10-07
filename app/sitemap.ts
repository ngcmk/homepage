import type { MetadataRoute } from "next";
import { sanityQuery } from "@/lib/sanity";

type BlogPost = {
  slug?: {
    en?: { current?: string };
    mk?: { current?: string };
    sr?: { current?: string };
  };
  publishedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ngc.mk";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/start-project`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const posts = await sanityQuery<BlogPost[]>(
      `*[_type == "post"]{
        slug,
        publishedAt
      }`
    );

    const blogPages: MetadataRoute.Sitemap = posts.flatMap((post) => {
      const slugs = [
        post.slug?.en?.current,
        post.slug?.mk?.current,
        post.slug?.sr?.current,
      ].filter((slug): slug is string => Boolean(slug));

      return slugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: post.publishedAt
          ? new Date(post.publishedAt)
          : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    });

    return [...staticPages, ...blogPages];
  } catch {
    return staticPages;
  }
}