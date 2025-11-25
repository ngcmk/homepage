import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params as required by Next.js
    const { slug: rawSlug } = await params;
    
    if (!rawSlug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Decode URL encoded slug
    const slug = decodeURIComponent(rawSlug);
    
    console.log('Fetching post with slug:', slug);

    // Fetch all posts and search in memory
    const allPosts = await client.fetch(
      `*[_type == "post"] {
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

    // Find post by matching any language slug
    const post = allPosts.find((p: any) => {
      const slugObj = p.slug;
      // Extract current value if slug is an object with current property
      const mkSlug = typeof slugObj.mk === 'string' ? slugObj.mk : slugObj.mk?.current;
      const srSlug = typeof slugObj.sr === 'string' ? slugObj.sr : slugObj.sr?.current;
      const enSlug = typeof slugObj.en === 'string' ? slugObj.en : slugObj.en?.current;
      
      return mkSlug === slug || srSlug === slug || enSlug === slug;
    });

    if (!post) {
      console.log('Post not found. Available slugs:', 
        allPosts.map((p: any) => ({
          mk: typeof p.slug.mk === 'string' ? p.slug.mk : p.slug.mk?.current,
          sr: typeof p.slug.sr === 'string' ? p.slug.sr : p.slug.sr?.current,
          en: typeof p.slug.en === 'string' ? p.slug.en : p.slug.en?.current,
        }))
      );
      return NextResponse.json(
        { error: 'Post not found', searchedSlug: slug },
        { status: 404 }
      );
    }

    console.log('Post found:', post._id);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: String(error) },
      { status: 500 }
    );
  }
}



