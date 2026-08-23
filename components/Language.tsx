"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {C,Lang} from "@/lib/content";
const X=createContext<any>(null);
export function LanguageProvider({children}:{children:React.ReactNode}){const [lang,setL]=useState<Lang>("mk");useEffect(()=>{const x=localStorage.getItem("ngc-lang") as Lang;if(x&&["mk","sr","en"].includes(x))setL(x)},[]);useEffect(()=>{document.documentElement.lang=lang==="mk"?"mk":lang==="sr"?"sr":"en"},[lang]);const setLang=(x:Lang)=>{setL(x);localStorage.setItem("ngc-lang",x)};return <X.Provider value={{lang,setLang,t:C[lang]}}>{children}</X.Provider>}
export const useLanguage=()=>useContext(X);
