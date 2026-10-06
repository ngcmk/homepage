import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NGC – Digital Agency in Skopje",
  description:
    "Learn about NGC – Next Generation Code, a digital agency from Skopje, Macedonia specializing in web development, mobile applications and AI solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About NGC – Next Generation Code",
    description:
      "Digital agency from Skopje focused on modern websites, applications and AI solutions.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
