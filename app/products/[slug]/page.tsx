import { notFound } from "next/navigation";
import ProductDetails from "../ProductDetails";

const productSlugs = ["shiftmate", "tableflow", "online-shop", "nextform-ai"] as const;

function isProductSlug(slug: string): slug is (typeof productSlugs)[number] {
  return productSlugs.some((productSlug) => productSlug === slug);
}

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  return <ProductDetails slug={slug} />;
}
