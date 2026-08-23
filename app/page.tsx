"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect,useState} from "react";
import {useLanguage} from "@/components/Language";
import {Code2,ShieldCheck,Sparkles,Smartphone,BrainCircuit,Palette,Rocket,HeartHandshake,ArrowUpRight} from "lucide-react";
import {urlFor} from "@/lib/sanity";

const icons=[Code2,Palette,Smartphone,BrainCircuit,Rocket,HeartHandshake];

type BlogPost={_id:string;title:any;slug:any;mainImage:any;publishedAt:any;body:any;categories:any[]};

function localized(field:any,lang:string){
  if(!field) return "";
  if(typeof field==="string") return field;
  return field[lang] || field.en || field.mk || field.sr || "";
}
function dateLocale(lang:string){return lang==="mk"?"mk-MK":lang==="sr"?"sr-RS":"en-GB"}
function slugOf(slug:any,lang:string){
  if(typeof slug==="string") return slug;
  return slug?.[lang]?.current || slug?.en?.current || slug?.mk?.current || slug?.sr?.current || slug?.current || "";
}

export default function Home(){
 const {lang,t}=useLanguage();
 const [posts,setPosts]=useState<BlogPost[]>([]);
 useEffect(()=>{fetch("/api/blog").then(r=>r.ok?r.json():[]).then(d=>setPosts(Array.isArray(d)?d.slice(0,3):[])).catch(()=>{})},[]);
 return <main>
<section className="hero">
 <div className="cont heroGrid">
  <div className="heroText">
   <div className="tag">● {t.heroTag}</div>
   <h1>{t.hero1}<em>{t.hero2}</em></h1>
   <p>{t.heroText}</p>
   <div className="buttons"><Link className="primary" href="/start-project">{t.start} →</Link><a className="secondary" href="#services">◉ {t.work}</a></div>
   <div className="benefits"><span><Sparkles/> {t.benefits[0]}</span><span><ShieldCheck/> {t.benefits[1]}</span><span><ArrowUpRight/> {t.benefits[2]}</span></div>
  </div>
  <div className="heroPhotoWrap">
   <Image
     src="/ngc-hero-final.png"
     alt="NGC web, mobile and AI solutions"
     width={1100}
     height={760}
     priority
     className="heroPhoto"
   />
  </div>
 </div>
 <div className="heroCurve"/>
</section>

<section id="services" className="section cont">
 <div className="head"><div><small>{t.servicesTag}</small><h2>{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div>
 <div className="services">{t.services.map((s:any,i:number)=>{const I=icons[i];return <article key={s[0]}><div className={"ico i"+i}><I/></div><h3>{s[0]}</h3><p>{s[1]}</p><b>{s[2]}</b></article>})}</div>
</section>

<section className="aboutStrip">
 <div className="cont aboutGrid">
  <div className="aboutArt"><div className="codeWindow"><div className="dots">● ● ●</div><code><span>const</span> idea = business.need;<br/><span>const</span> product = <span className="ngcGradientText">NGC</span>.build(idea);<br/><b>return</b> product.grow();</code></div><div className="floatChip">WEB · MOBILE · AI</div></div>
  <div className="aboutCopy"><small>{t.aboutTag}</small><h2>{t.aboutTitle}</h2><p>{t.aboutP1}</p><p>{t.aboutP2}</p><Link href="/about" className="ngcBrandLink">{lang === "mk" ? "Повеќе за NGC" : lang === "sr" ? "Više o NGC-u" : "More about NGC"} →</Link></div>
 </div>
</section>

<section id="work" className="section cont">
 <div className="head"><div><h2>{t.why}</h2></div><p>{t.aboutP3}</p></div>
 <div className="why">{t.whyItems.map((x:any,i:number)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div>
</section>

<section className="process"><div className="cont"><div className="head"><div><small>{t.processTag}</small><h2>{t.processTitle}</h2></div></div><div className="steps">{t.process.map((x:any)=><article key={x[0]}><b>{x[0]}</b><div><h3>{x[1]}</h3><p>{x[2]}</p></div></article>)}</div></div></section>

<section className="section cont">
 <div className="head"><div><small>{t.blogTag}</small><h2>{t.blogTitle}</h2></div><Link href="/blog" className="textlink">{t.nav[4]} →</Link></div>
 {posts.length>0 ? <div className="postGrid">{posts.map((p,i)=><Link className="post" href={"/blog/"+slugOf(p.slug,lang)} key={p._id}>
   {p.mainImage?<div className="postImage"><Image src={urlFor(p.mainImage).width(800).height(500).fit("crop").url()} alt={localized(p.title,lang)} fill/></div>:<div className={"postArt p"+i}><span className="ngcGradientText">NGC</span></div>}
   <small>{p.categories?.[0]?.title || <><span className="ngcGradientText">NGC</span> BLOG</>} · {new Date(typeof p.publishedAt==="string"?p.publishedAt:p.publishedAt?.current).toLocaleDateString(dateLocale(lang))}</small>
   <h3>{localized(p.title,lang)}</h3><b>{t.read} →</b>
 </Link>)}</div> :
 <div className="blogLoading">{lang === "mk" ? "Се вчитуваат објавите…" : lang === "sr" ? "Učitavaju se objave…" : "Loading blog posts…"}</div>}
</section>

<section className="cta cont"><div><small><span className="ngcGradientText">NGC</span> · NEXT GENERATION CODE</small><h2>{t.cta}</h2><p>{t.ctaText}</p></div><Link href="/start-project">{t.start} →</Link></section>
</main>}
