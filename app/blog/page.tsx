"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect,useState} from "react";
import {useLanguage} from "@/components/Language";
import {urlFor} from "@/lib/sanity";
type BlogPost={_id:string;title:any;slug:any;mainImage:any;publishedAt:any;body:any;categories:any[]};
const loc=(f:any,l:string)=>typeof f==="string"?f:(f?.[l]||f?.en||f?.mk||f?.sr||"");
const slug=(s:any,l:string)=>typeof s==="string"?s:(s?.[l]?.current||s?.en?.current||s?.mk?.current||s?.sr?.current||s?.current||"");
const locale=(l:string)=>l==="mk"?"mk-MK":l==="sr"?"sr-RS":"en-GB";
export default function Blog(){
 const {lang,t}=useLanguage(); const [posts,setPosts]=useState<BlogPost[]>([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{fetch("/api/blog").then(r=>r.ok?r.json():[]).then(d=>setPosts(Array.isArray(d)?d:[])).finally(()=>setLoading(false))},[]);
 return <main><section className="subhero cont"><small>{t.blogTag}</small><h1>{t.blogPageTitle}</h1><p>{t.blogPageLead}</p></section>
 <section className="cont blogList">
 {loading?<div className="blogLoading">{lang==="mk"?"Се вчитуваат објавите…":lang==="sr"?"Učitavaju se objave…":"Loading posts…"}</div>:posts.map(p=><Link href={"/blog/"+slug(p.slug,lang)} className="blogRow" key={p._id}>
  {p.mainImage?<div className="realThumb"><Image src={urlFor(p.mainImage).width(900).height(560).fit("crop").url()} alt={loc(p.title,lang)} fill/></div>:<div className="postArt"><span className="ngcGradientText">NGC</span></div>}
  <div><small>{p.categories?.[0]?.title||<><span className="ngcGradientText">NGC</span> BLOG</>} · {new Date(typeof p.publishedAt==="string"?p.publishedAt:p.publishedAt?.current).toLocaleDateString(locale(lang))}</small><h2>{loc(p.title,lang)}</h2><b>{t.read} →</b></div>
 </Link>)}
 </section></main>}
