import { NextResponse } from "next/server";
import { sanityQuery } from "@/lib/sanity";

export async function GET() {
  try {
    const posts = await sanityQuery<any[]>(`*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, mainImage, body, publishedAt,
      categories[]->{_id,title}
    }`);
    return NextResponse.json(posts || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
