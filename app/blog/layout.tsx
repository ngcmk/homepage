import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NGC Blog – Web Development, AI & Digital Business",
  description:
    "Articles from NGC about web development, websites, mobile applications, AI solutions and digital business.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "NGC Blog – Web Development, AI & Digital Business",
    description:
      "Practical articles about websites, modern development, AI and digital business from NGC.",
    url: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
