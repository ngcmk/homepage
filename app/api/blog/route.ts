import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug {
          mk,
          sr,
          en
        },
        mainImage,
        body,
        publishedAt,
        categories[]-> {
          _id,
          title
        }
      }`
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
