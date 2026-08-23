"use client";
import {use,useEffect,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {PortableText} from "@portabletext/react";
import {useLanguage} from "@/components/Language";
import {urlFor} from "@/lib/sanity";
const loc=(f:any,l:string)=>typeof f==="string"?f:(f?.[l]||f?.en||f?.mk||f?.sr||"");
export default function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=use(params); const {lang,t}=useLanguage(); const [p,setP]=useState<any>(null); const [loading,setLoading]=useState(true);
 useEffect(()=>{fetch("/api/blog/"+encodeURIComponent(slug)).then(r=>r.ok?r.json():null).then(setP).finally(()=>setLoading(false))},[slug]);
 if(loading)return <main><div className="article cont">{lang==="mk"?"Се вчитува објавата…":lang==="sr"?"Učitava se objava…":"Loading article…"}</div></main>;
 if(!p)return <main><div className="article cont"><Link href="/blog">← {t.nav[4]}</Link><h1>{lang==="mk"?"Објавата не е пронајдена":lang==="sr"?"Objava nije pronađena":"Article not found"}</h1></div></main>;
 const body=loc(p.body,lang);
 return <main><article className="article cont"><Link href="/blog">← {t.nav[4]}</Link><small>{p.categories?.[0]?.title||<><span className="ngcGradientText">NGC</span> BLOG</>}</small><h1>{loc(p.title,lang)}</h1>
 {p.mainImage&&<div className="articleRealImage"><Image src={urlFor(p.mainImage).width(1400).height(780).fit("crop").url()} alt={loc(p.title,lang)} fill priority/></div>}
 <div className="body portable">{Array.isArray(body)?<PortableText value={body}/>:<p>{body}</p>}</div></article></main>}
