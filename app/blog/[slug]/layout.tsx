import type { Metadata } from "next";
import { sanityQuery, urlFor } from "@/lib/sanity";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

const localized = (field: any) =>
  typeof field === "string"
    ? field
    : field?.mk || field?.en || field?.sr || "";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await sanityQuery<any>(
      `*[_type == "post" && (
        slug.en.current == $slug ||
        slug.mk.current == $slug ||
        slug.sr.current == $slug ||
        slug.current == $slug
      )][0]{
        title, mainImage
      }`,
      { slug }
    );

    if (!post) {
      return {
        title: "NGC Blog",
        robots: { index: false, follow: true },
      };
    }

    const title = localized(post.title);
    const image = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
      : "/ngc-hero-final.png";

    return {
      title,
      description: `${title} – Read the latest insights from NGC about web development, AI and digital business.`,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        type: "article",
        title,
        url: `/blog/${slug}`,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title,
        images: [image],
      },
    };
  } catch {
    return {
      title: "NGC Blog",
    };
  }
}

export default function ArticleLayout({ children }: Props) {
  return children;
}
