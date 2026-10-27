"use client";
import {FormEvent,useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import {useLanguage} from "@/components/Language";
import {convexHttpUrl} from "@/lib/convexHttpUrl";

export default function Start(){
 const {lang,t}=useLanguage();
 const router=useRouter();
 const [sending,setSending]=useState(false);
 const [error,setError]=useState("");
 const [suggestedServices,setSuggestedServices]=useState<string[]>([]); const [newService,setNewService]=useState(""); const [prefill,setPrefill]=useState({industry:"",company:"",note:""}); useEffect(()=>{const q=new URLSearchParams(window.location.search);if(q.get("from")!=="business-check")return;const service=q.get("service")?.trim();if(service)setSuggestedServices([service]);setPrefill({industry:q.get("industry")||"",company:q.get("company")||"",note:q.get("note")||""});},[]);

 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  setSending(true);
  setError("");

  const fd=new FormData(e.currentTarget);
  const payload={
   name:String(fd.get("projectName")||(lang==="mk"?"Барање од веб-страница":lang==="sr"?"Upit sa web sajta":"Website inquiry")),
   description:String(fd.get("message")||""),
   type:String(fd.get("type")||"new-website"),
   urgency:String(fd.get("urgency")||"medium"),
   industry:String(fd.get("industry")||""),
   targetAudience:String(fd.get("targetAudience")||""),
   timeline:String(fd.get("timeline")||""),
   budget:String(fd.get("budget")||"not-sure"),
   hasContent:"not-sure",
   designPreferences:String(fd.get("designPreferences")||""),
   contactName:String(fd.get("name")||""),
   contactEmail:String(fd.get("email")||""),
   contactPhone:String(fd.get("phone")||""),
   company:String(fd.get("company")||""),
   preferredContact:"email",
   goals:[],
   features:suggestedServices,
   source:"website"
  };

  try{
   const base=convexHttpUrl();
   const r=await fetch(base+"/project-consultations",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload)
   });
   if(!r.ok) throw new Error("Submission failed");
   router.push("/thank-you");
  }catch(err){
   console.error(err);
   setError(t.submitError);
  }finally{
   setSending(false);
  }
 }

 return <main>
  <section className="formPage cont">
   <div>
    <small><span className="ngcGradientText">NGC</span> · {lang==="mk"?"ПРОЕКТ":lang==="sr"?"PROJEKAT":"PROJECT"}</small>
    <h1>{t.formTitle}</h1>
    <p>{t.formLead}</p>
    <div className="mail">contact@ngc.solutions</div>
   </div>

   <form onSubmit={submit}>
    <label>{t.name}<input name="name" required/></label>
    <label>{t.email}<input name="email" type="email" required/></label>
    <label>{t.company}<input name="company" defaultValue={prefill.company} key={"company-"+prefill.company}/></label>
    <label>{t.phone}<input name="phone"/></label>

    <label>{t.projectName}<input name="projectName"/></label>

    <label>{t.type}
     <select name="type">
      <option value="new-website">{t.projectTypes[0]}</option>
      <option value="mobile-app">{t.projectTypes[1]}</option>
      <option value="web-app">{t.projectTypes[2]}</option>
      <option value="branding">{t.projectTypes[3]}</option>
     </select>
    </label>

    <label>{t.urgency}
     <select name="urgency">
      <option value="low">{t.urgencyOptions[0]}</option>
      <option value="medium">{t.urgencyOptions[1]}</option>
      <option value="high">{t.urgencyOptions[2]}</option>
      <option value="urgent">{t.urgencyOptions[3]}</option>
     </select>
    </label>

    <label>{t.budget}
     <select name="budget">
      <option value="not-sure">{t.notSure}</option>
      <option value="under-1k">{t.budgetOptions[0]}</option>
      <option value="1k-5k">{t.budgetOptions[1]}</option>
      <option value="5k-10k">{t.budgetOptions[2]}</option>
      <option value="10k-25k">{t.budgetOptions[3]}</option>
      <option value="25k-50k">{t.budgetOptions[4]}</option>
      <option value="over-50k">{t.budgetOptions[5]}</option>
     </select>
    </label>

    <label>{t.industry}<input name="industry" defaultValue={prefill.industry} key={"industry-"+prefill.industry}/></label>
    <label>{t.timeline}<input name="timeline"/></label>
    <label className="full">{t.targetAudience}<input name="targetAudience"/></label>

    <label className="full">{t.message}
     <textarea name="message" rows={6} required defaultValue={prefill.note} key={"message-"+prefill.note}/>
    </label>

    <label className="full">{t.designPreferences}
     <textarea name="designPreferences" rows={3}/>
    </label>

    {prefill.industry && <div className="full"><strong>{lang==="mk"?"Предложени услуги":lang==="sr"?"Predložene usluge":"Suggested services"}</strong>{suggestedServices.map((service,i)=><div key={i} style={{display:"flex",gap:10,marginTop:10}}><span style={{flex:1}}>{service}</span><button type="button" onClick={()=>setSuggestedServices(a=>a.filter((_,j)=>j!==i))}>×</button></div>)}<div style={{display:"flex",gap:10,marginTop:12}}><input value={newService} onChange={e=>setNewService(e.target.value)} placeholder={lang==="mk"?"Додај услуга":lang==="sr"?"Dodaj uslugu":"Add service"}/><button type="button" onClick={()=>{if(newService.trim()){setSuggestedServices(a=>[...a,newService.trim()]);setNewService("");}}}>+</button></div></div>}
    {error&&<p className="formError">{error}</p>}

    <button disabled={sending}>
     {sending?t.sending:t.send+" →"}
    </button>
   </form>
  </section>
 </main>
}
