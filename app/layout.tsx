import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import type React from "react";
import { LanguageProvider } from "./contexts/language-context";
// import { ThemeProvider } from "./components/ThemeProvider";
import { ConvexClientProvider } from "./providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ngc | Creative Web Solutions",
  description: "Crafting digital experiences with purpose and precision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-sans bg-background text-foreground`}
      >
        <ConvexClientProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <LanguageProvider>{children}</LanguageProvider>
          <Toaster />
          {/* </ThemeProvider> */}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
