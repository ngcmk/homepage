"use client";
import Link from "next/link";import Image from "next/image";import {useState} from "react";import {useLanguage} from "./Language";
export default function Header(){const {lang,setLang,t}=useLanguage();const [open,setOpen]=useState(false);const closeMenu=()=>setOpen(false);return <header><div className="nav">
<Link href="/" className="logo officialLogo"><Image src="/ngc-logo.png" alt="NGC – Next Generation Code" width={240} height={96} priority/></Link>
<nav className={open?"open":""}><Link href="/" onClick={closeMenu}>{t.nav[0]}</Link><Link href="/about" onClick={closeMenu}>{t.nav[1]}</Link><a href="/#services" onClick={closeMenu}>{t.nav[2]}</a><a href="/#work" onClick={closeMenu}>{t.nav[3]}</a><Link href="/blog" onClick={closeMenu}>{t.nav[4]}</Link><Link href="/start-project" onClick={closeMenu}>{t.nav[5]}</Link></nav>
<div className="navActions"><div className="langs">{(["mk","sr","en"] as const).map(x=><button type="button" aria-label={`Switch language to ${x.toUpperCase()}`} className={lang===x?"on":""} onClick={()=>setLang(x)} key={x}>{x.toUpperCase()}</button>)}</div><Link href="/start-project" className="talk">{t.talk} →</Link><button type="button" className="hamb" aria-label="Toggle navigation menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button></div>
</div></header>}
