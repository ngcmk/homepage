import { NextResponse } from "next/server";
import { sanityQuery } from "@/lib/sanity";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = await sanityQuery<any>(
      `*[_type == "post" && (
        slug.en.current == $slug ||
        slug.mk.current == $slug ||
        slug.sr.current == $slug ||
        slug.current == $slug
      )][0]{
        _id, title, slug, mainImage, body, publishedAt,
        categories[]->{_id,title}
      }`,
      { slug }
    );
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
