import type {Metadata} from "next";
import Script from "next/script";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata:Metadata={
  title:"NGC | Next Generation Code",
  description:"Modern websites, mobile applications and AI solutions by NGC.",
  robots:{index:true,follow:true}
};

export default function Layout({children}:{children:React.ReactNode}){
  return (
    <html lang="mk">
      <body>
        <Shell>{children}</Shell>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BZ4J1WEFKE"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BZ4J1WEFKE');
          `}
        </Script>
      </body>
    </html>
  );
}