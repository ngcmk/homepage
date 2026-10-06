import type {Metadata} from "next";
import Script from "next/script";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata:Metadata={
  metadataBase:new URL("https://www.ngc.mk"),
  title:{
    default:"NGC | Web Development, Mobile Apps & AI Solutions",
    template:"%s | NGC"
  },
  description:"NGC – Next Generation Code is a digital agency from Skopje, Macedonia specializing in modern websites, web applications, mobile apps and AI solutions.",
  keywords:[
    "NGC",
    "Next Generation Code",
    "web development Skopje",
    "web development Macedonia",
    "izrabotka na web strani",
    "izrabotka na web strani Skopje",
    "web applications Macedonia",
    "mobile app development Macedonia",
    "AI solutions Macedonia",
    "software development company Macedonia"
  ],
  authors:[{name:"NGC – Next Generation Code"}],
  creator:"NGC – Next Generation Code",
  publisher:"NGC – Next Generation Code",
  alternates:{
    canonical:"/"
  },
  openGraph:{
    type:"website",
    locale:"mk_MK",
    url:"https://www.ngc.mk/",
    siteName:"NGC – Next Generation Code",
    title:"NGC | Web Development, Mobile Apps & AI Solutions",
    description:"Digital agency from Skopje building modern websites, web applications, mobile apps and AI solutions.",
    images:[
      {
        url:"/ngc-hero-final.png",
        width:913,
        height:574,
        alt:"NGC – Next Generation Code"
      }
    ]
  },
  twitter:{
    card:"summary_large_image",
    title:"NGC | Web Development, Mobile Apps & AI Solutions",
    description:"Digital agency from Skopje building modern websites, web applications, mobile apps and AI solutions.",
    images:["/ngc-hero-final.png"]
  },
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true
    }
  }
};

const organizationSchema={
  "@context":"https://schema.org",
  "@type":"Organization",
  name:"NGC – Next Generation Code",
  url:"https://www.ngc.mk/",
  logo:"https://www.ngc.mk/ngc-logo.png",
  description:"Digital agency from Skopje, Macedonia specializing in web development, web applications, mobile applications and AI solutions.",
  address:{
    "@type":"PostalAddress",
    addressLocality:"Skopje",
    addressCountry:"MK"
  },
  areaServed:["Macedonia","Serbia","Europe"],
  knowsAbout:[
    "Web Development",
    "Web Applications",
    "Mobile Application Development",
    "UI/UX Design",
    "Artificial Intelligence",
    "Software Development"
  ]
};
export default function Layout({children}:{children:React.ReactNode}){
  return (
    <html lang="mk">
      <body>
        <Shell>{children}</Shell>

        <Script
          id="ngc-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}
        />

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
