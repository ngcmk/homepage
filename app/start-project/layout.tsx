import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project – Web, Mobile & AI Development",
  description:
    "Start a project with NGC. Tell us about your website, web application, mobile app or AI solution and we will help you choose the right next step.",
  alternates: {
    canonical: "/start-project",
  },
  openGraph: {
    title: "Start a Project with NGC",
    description:
      "Build your next website, application or AI solution with NGC – Next Generation Code.",
    url: "/start-project",
  },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
