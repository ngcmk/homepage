import Image from "next/image";
import styles from "./products.module.css";

const logos: Partial<Record<string, string>> = {
  shiftmate: "/products/shiftmate-logo.png",
  tableflow: "/products/tableflow-logo.png",
  "online-shop": "/products/online-shop-logo.png",
  "nextform-ai": "/products/nextform-ai-logo.png",
};

export default function ProductLogo({ slug }: { slug: string }) {
  const src = logos[slug];
  if (!src) return null;

  return (
    <span className={styles.productLogo} data-product={slug}>
      <Image src={src} alt="" fill sizes={slug === "nextform-ai" ? "76px" : "176px"} />
    </span>
  );
}
