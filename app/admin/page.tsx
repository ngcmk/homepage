"use client";

import { useMemo, useState } from "react";
import { SignIn, useAuth, useClerk } from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { LayoutDashboard, FolderKanban, Mail, ClipboardCheck, Search, LogOut, ArrowUpRight, X, Trash2, RefreshCw, Menu, ExternalLink } from "lucide-react";

type Lang = "mk" | "en" | "sr";
type Tab = "overview" | "projects" | "contacts" | "business";
type ProjectStatus = "new" | "reviewing" | "quoted" | "accepted" | "declined" | "in_progress" | "completed" | "cancelled";
type ContactStatus = "new" | "in_progress" | "resolved" | "closed" | "spam";
const projectStatuses: ProjectStatus[] = ["new", "reviewing", "quoted", "accepted", "declined", "in_progress", "completed", "cancelled"];
const contactStatuses: ContactStatus[] = ["new", "in_progress", "resolved", "closed", "spam"];
const dictionary = {
  mk: { overview:"Преглед", projects:"Проекти", contacts:"Контакти", business:"Business Check", workspace:"Работен простор", admin:"Администрација", welcome:"Добредојдовте назад", subtitle:"Сите барања и проекти на едно место.", totalProjects:"Вкупно проекти", totalContacts:"Контакт пораки", newRequests:"Нови барања", inProgress:"Во обработка", recent:"Последни активности", search:"Пребарај по име, е-пошта или компанија...", all:"Сите статуси", status:"Статус", person:"Клиент", date:"Датум", actions:"Акции", empty:"Нема записи за прикажување", loading:"Се вчитуваат податоците...", view:"Детали", delete:"Избриши", close:"Затвори", signout:"Одјави се", projectDetails:"Детали за проект", contactDetails:"Детали за контакт", confirm:"Дали сигурно сакаш да го избришеш овој запис?", businessTitle:"NGC Business Check", businessText:"Прашалникот е достапен на јавната страница. За резултатите да се појавуваат тука, потребно е поврзување со посебна Convex табела за Business Check.", openBusiness:"Отвори Business Check", noData:"Сè е ажурирано", loadError:"Неуспешна операција. Провери ги овластувањата и пробај повторно.", allRequests:"Сите барања", priority:"Приоритет", message:"Порака", description:"Опис", company:"Компанија", email:"Е-пошта", phone:"Телефон", budget:"Буџет", timeline:"Рок", type:"Тип", filters:"Пребарување и филтри", access:"Се проверува пристапот..." },
  en: { overview:"Overview", projects:"Projects", contacts:"Contacts", business:"Business Check", workspace:"Workspace", admin:"Administration", welcome:"Welcome back", subtitle:"All your inquiries and projects in one place.", totalProjects:"Total projects", totalContacts:"Contact messages", newRequests:"New requests", inProgress:"In progress", recent:"Recent activity", search:"Search by name, email or company...", all:"All statuses", status:"Status", person:"Client", date:"Date", actions:"Actions", empty:"No records to display", loading:"Loading data...", view:"Details", delete:"Delete", close:"Close", signout:"Sign out", projectDetails:"Project details", contactDetails:"Contact details", confirm:"Are you sure you want to delete this record?", businessTitle:"NGC Business Check", businessText:"The questionnaire is available on the public website. To display submissions here, a dedicated Business Check Convex table needs to be connected.", openBusiness:"Open Business Check", noData:"You're all caught up", loadError:"Operation failed. Check permissions and try again.", allRequests:"All requests", priority:"Priority", message:"Message", description:"Description", company:"Company", email:"Email", phone:"Phone", budget:"Budget", timeline:"Timeline", type:"Type", filters:"Search and filters", access:"Checking access..." },
  sr: { overview:"Pregled", projects:"Projekti", contacts:"Kontakti", business:"Business Check", workspace:"Radni prostor", admin:"Administracija", welcome:"Dobro došli nazad", subtitle:"Svi upiti i projekti na jednom mestu.", totalProjects:"Ukupno projekata", totalContacts:"Kontakt poruke", newRequests:"Novi zahtevi", inProgress:"U obradi", recent:"Poslednje aktivnosti", search:"Pretraži po imenu, e-pošti ili kompaniji...", all:"Svi statusi", status:"Status", person:"Klijent", date:"Datum", actions:"Akcije", empty:"Nema zapisa za prikaz", loading:"Učitavanje podataka...", view:"Detalji", delete:"Obriši", close:"Zatvori", signout:"Odjavi se", projectDetails:"Detalji projekta", contactDetails:"Detalji kontakta", confirm:"Da li sigurno želiš da obrišeš ovaj zapis?", businessTitle:"NGC Business Check", businessText:"Upitnik je dostupan na javnom sajtu. Za prikaz rezultata ovde potrebno je povezati posebnu Convex tabelu za Business Check.", openBusiness:"Otvori Business Check", noData:"Sve je ažurirano", loadError:"Operacija nije uspela. Proveri dozvole i pokušaj ponovo.", allRequests:"Svi zahtevi", priority:"Prioritet", message:"Poruka", description:"Opis", company:"Kompanija", email:"E-pošta", phone:"Telefon", budget:"Budžet", timeline:"Rok", type:"Tip", filters:"Pretraga i filteri", access:"Provera pristupa..." }
};

export default function AdminPage() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="ngca-centered">Loading...</div>;
  if (!isSignedIn) return <div className="ngca-centered"><SignIn routing="hash" fallbackRedirectUrl="/admin" /></div>;
  return <SignedInAdmin />;
}

function SignedInAdmin() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading || !isAuthenticated) return <div className="ngca-centered">Connecting securely...</div>;
  return <AdminWorkspace />;
}

function AdminWorkspace() {
  const [lang, setLang] = useState<Lang>("mk");
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<{ kind: "project" | "contact"; id: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useClerk();
  const t = dictionary[lang];
  const projects = useQuery(api.projectConsultations.getProjectConsultations, { limit: 500 });
  const contacts = useQuery(api.contacts.getContacts, { limit: 500 });
  const [checkFilter, setCheckFilter] = useState("all");
  const checks = useQuery(api.businessChecks.list, {});
  const updateCheck = useMutation(api.businessChecks.updateStatus);
  const updateProject = useMutation(api.projectConsultations.updateProjectStatus);
  const updateContact = useMutation(api.contacts.updateContactStatus);
  const deleteProject = useMutation(api.projectConsultations.deleteProjectConsultation);
  const deleteContact = useMutation(api.contacts.deleteContact);
  const pList = projects ?? [];
  const cList = contacts ?? [];
  const loading = projects === undefined || contacts === undefined;
  const newCount = pList.filter(p => p.status === "new").length + cList.filter(c => c.status === "new").length;
  const progressCount = pList.filter(p => ["reviewing", "in_progress"].includes(p.status)).length + cList.filter(c => c.status === "in_progress").length;
  const dateFormat = (ts: number) => new Intl.DateTimeFormat(lang === "mk" ? "mk-MK" : lang === "sr" ? "sr-RS" : "en-GB", { day:"2-digit", month:"short", year:"numeric" }).format(new Date(ts));
  const changeTab = (next: Tab) => { setTab(next); setSearch(""); setStatus("all"); setMobileOpen(false); };
  const rows = useMemo(() => {
    const source = tab === "contacts" ? cList.map(c => ({kind:"contact" as const, id:c._id as string, name:c.name, company:c.company, email:c.email, status:c.status, date:c.createdAt, detail:c.subject || c.message, record:c})) : pList.map(p => ({kind:"project" as const, id:p._id as string, name:p.contactName || p.name || "—", company:p.company, email:p.contactEmail, status:p.status, date:p.createdAt, detail:p.name || p.type, record:p}));
    const q = search.toLowerCase().trim();
    return source.filter(r => (status === "all" || r.status === status) && (!q || [r.name, r.company, r.email, r.detail].some(v => String(v ?? "").toLowerCase().includes(q)))).sort((a,b) => b.date - a.date);
  }, [tab, pList, cList, search, status]);
  const current = selected?.kind === "project" ? pList.find(p => p._id === selected.id) : selected?.kind === "contact" ? cList.find(c => c._id === selected.id) : undefined;
  const execute = async (fn: () => Promise<unknown>) => { setBusy(true); setError(""); try { await fn(); } catch(e) { setError(e instanceof Error ? e.message : t.loadError); } finally { setBusy(false); } };
  const handleStatus = (value: string) => { if (!selected) return; if (selected.kind === "project") void execute(() => updateProject({ id: selected.id as Id<"projectConsultations">, status: value as ProjectStatus })); else void execute(() => updateContact({ id: selected.id as Id<"contacts">, status: value as ContactStatus })); };
  const handleDelete = () => { if (!selected || !window.confirm(t.confirm)) return; void execute(async () => { if (selected.kind === "project") await deleteProject({ id: selected.id as Id<"projectConsultations">, permanent: true }); else await deleteContact({ id: selected.id as Id<"contacts">, permanent: true }); setSelected(null); }); };
  const navigation = [{id:"overview" as Tab, icon:LayoutDashboard, label:t.overview}, {id:"projects" as Tab, icon:FolderKanban, label:t.projects}, {id:"contacts" as Tab, icon:Mail, label:t.contacts}, {id:"business" as Tab, icon:ClipboardCheck, label:t.business}];
  return <div className="ngca-app">
    <aside className={`ngca-sidebar ${mobileOpen ? "ngca-open" : ""}`}>
      <div className="ngca-brand"><div style={{width:110,height:72,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#ffffff",borderRadius:14,padding:8}}><img src="/ngc-organizer-robot.png" alt="NGC Logo" style={{width:"100%",height:"auto",objectFit:"contain"}} /></div><div><strong>NGC Organizer</strong><small>ADMIN CONSOLE</small></div></div>
      <div className="ngca-section-label">{t.workspace}</div>
      <nav className="ngca-nav">{navigation.map(item => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => changeTab(item.id)}><item.icon size={19}/><span>{item.label}</span>{item.id === "projects" && <em>{pList.length}</em>}{item.id === "contacts" && <em>{cList.length}</em>}</button>)}</nav>
      <div className="ngca-sidebar-bottom"><div className="ngca-online"><span className="ngca-dot"/> {t.admin}</div><button className="ngca-signout" onClick={() => void signOut({redirectUrl:"/admin"})}><LogOut size={17}/>{t.signout}</button></div>
    </aside>
    {mobileOpen && <button className="ngca-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="ngca-main">
      <header className="ngca-topbar"><div className="ngca-top-left"><button className="ngca-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={23}/></button><span className="ngca-breadcrumb">NGC / <b>{navigation.find(n => n.id === tab)?.label}</b></span></div><div className="ngca-top-actions"><div className="ngca-languages">{(["mk", "en", "sr"] as const).map(l => <button key={l} onClick={() => setLang(l)} className={lang === l ? "selected" : ""}>{l.toUpperCase()}</button>)}</div><span className="ngca-avatar">NG</span></div></header>
      <div className="ngca-content"><div className="ngca-heading"><div><div className="ngca-eyebrow">NEXT GENERATION CODE <span> / </span> {t.workspace.toUpperCase()}</div><h1>{tab === "overview" ? t.welcome : navigation.find(n => n.id === tab)?.label}</h1><p>{tab === "overview" ? t.subtitle : tab === "business" ? t.businessTitle : t.allRequests}</p></div><div className="ngca-date">{dateFormat(Date.now())}</div></div>
      {tab === "overview" && <><div className="ngca-stats"><Stat label={t.totalProjects} value={pList.length} icon={FolderKanban} tone="blue" onClick={() => changeTab("projects")}/><Stat label={t.totalContacts} value={cList.length} icon={Mail} tone="purple" onClick={() => changeTab("contacts")}/><Stat label={t.newRequests} value={newCount} icon={ArrowUpRight} tone="orange" onClick={() => changeTab("projects")}/><Stat label={t.inProgress} value={progressCount} icon={RefreshCw} tone="green" onClick={() => changeTab("projects")}/></div><div className="ngca-panel"><div className="ngca-panel-head"><h2>{t.recent}</h2><span className="ngca-muted">{pList.length + cList.length} {t.allRequests.toLowerCase()}</span></div>{loading ? <div className="ngca-empty">{t.loading}</div> : [...pList.map(p => ({id:p._id, kind:"project" as const, title:p.company || p.contactName || p.name || "—", detail:p.name || p.type || t.projects, status:p.status, date:p.createdAt})), ...cList.map(c => ({id:c._id, kind:"contact" as const, title:c.company || c.name, detail:c.subject || c.email, status:c.status, date:c.createdAt}))].sort((a,b) => b.date-a.date).slice(0,8).length === 0 ? <div className="ngca-empty">{t.noData}</div> : <div className="ngca-activity">{[...pList.map(p => ({id:p._id, kind:"project" as const, title:p.company || p.contactName || p.name || "—", detail:p.name || p.type || t.projects, status:p.status, date:p.createdAt})), ...cList.map(c => ({id:c._id, kind:"contact" as const, title:c.company || c.name, detail:c.subject || c.email, status:c.status, date:c.createdAt}))].sort((a,b) => b.date-a.date).slice(0,8).map(r => <button key={r.id} onClick={() => setSelected({kind:r.kind,id:r.id})}><span className={`ngca-activity-icon ${r.kind}`} >{r.kind === "project" ? <FolderKanban size={18}/> : <Mail size={18}/>}</span><span className="ngca-activity-text"><strong>{r.title}</strong><small>{r.detail}</small></span><span className={`ngca-status ngca-status-${r.status}`}>{r.status.replaceAll("_", " ")}</span><span className="ngca-muted ngca-activity-date">{dateFormat(r.date)}</span><ArrowUpRight size={17}/></button>)}</div>}</div></>}
      {(tab === "projects" || tab === "contacts") && <div className="ngca-panel"><div className="ngca-panel-head"><h2>{tab === "projects" ? t.projects : t.contacts}</h2><span className="ngca-count">{rows.length}</span></div><div className="ngca-filters"><label className="ngca-search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}/></label><select value={status} onChange={e => setStatus(e.target.value)} aria-label={t.status}><option value="all">{t.all}</option>{(tab === "projects" ? projectStatuses : contactStatuses).map(s => <option key={s} value={s}>{s.replaceAll("_", " ")}</option>)}</select></div><div className="ngca-table-wrap"><table className="ngca-table"><thead><tr><th>{t.person}</th><th>{t.company}</th><th>{t.status}</th><th>{t.date}</th><th>{t.actions}</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.name}</strong><small>{r.email || "—"}</small></td><td>{r.company || "—"}</td><td><span className={`ngca-status ngca-status-${r.status}`}>{r.status.replaceAll("_", " ")}</span></td><td>{dateFormat(r.date)}</td><td><button className="ngca-detail-button" onClick={() => setSelected({kind:r.kind,id:r.id})}>{t.view}<ArrowUpRight size={15}/></button></td></tr>)}</tbody></table>{loading ? <div className="ngca-empty">{t.loading}</div> : rows.length === 0 ? <div className="ngca-empty">{t.empty}</div> : null}</div></div>}
      {tab === "business" && (
  <div className="ngca-panel">
    <div className="ngca-panel-head">
      <div>
        <h2>NGC Business Check</h2>
        <span className="ngca-muted">{checks?.length ?? 0} анализи</span>
      </div>
      <span className="ngca-count">{checks?.length ?? 0}</span>
    </div>

    <div style={{padding:20,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",borderBottom:"1px solid #e5e9f4"}}>
      <label style={{fontWeight:700,color:"#33456a"}}>Филтрирај:</label>
      <select
        value={checkFilter}
        onChange={e => setCheckFilter(e.target.value)}
        style={{padding:"10px 14px",border:"1px solid #dce3f1",borderRadius:10,background:"#fff",color:"#17264a"}}
      >
        <option value="all">Сите анализи</option>
        <option value="new">Нови</option>
        <option value="in_progress">Во обработка</option>
        <option value="contacted">Контактирани</option>
        <option value="closed">Завршени</option>
      </select>
    </div>

    {checks === undefined ? (
      <div className="ngca-empty">{t.loading}</div>
    ) : (
      <div style={{padding:20,display:"grid",gap:16}}>
        {checks.filter(c => checkFilter === "all" || c.status === checkFilter).length === 0 ? (
          <div className="ngca-empty">Нема анализи за избраниот статус.</div>
        ) : checks.filter(c => checkFilter === "all" || c.status === checkFilter).map(c => (
          <article key={c._id} style={{border:"1px solid #e0e6f2",borderRadius:16,background:"#fff",overflow:"hidden",boxShadow:"0 5px 18px rgba(24,42,86,.04)"}}>
            <div style={{padding:22,display:"flex",justifyContent:"space-between",gap:18,flexWrap:"wrap"}}>
              <div style={{flex:"1 1 300px"}}>
                <div style={{fontSize:12,color:"#6475a0",fontWeight:700,marginBottom:8}}>
                  {c.industry} · {dateFormat(c.createdAt)}
                </div>
                <h3 style={{fontSize:20,fontWeight:800,color:"#17264a",margin:"0 0 8px"}}>
                  {c.company || c.contactName || c.industry}
                </h3>
                <p style={{margin:0,color:"#536584",lineHeight:1.6}}>{c.solutionName}</p>
                {c.contactName && <p><b>Контакт:</b> {c.contactName}</p>}
                {c.contactEmail && (
                  <p><b>Е-пошта:</b> <a href={"mailto:" + c.contactEmail}>{c.contactEmail}</a></p>
                )}
              </div>

              <div style={{display:"grid",gap:8,minWidth:170,alignContent:"start"}}>
                <span style={{
                  padding:"8px 12px",borderRadius:20,textAlign:"center",fontWeight:700,fontSize:12,
                  background:c.status==="new"?"#e9efff":c.status==="in_progress"?"#fff4d9":c.status==="contacted"?"#e0f7eb":"#edf0f5",
                  color:c.status==="new"?"#3658d8":c.status==="in_progress"?"#986200":c.status==="contacted"?"#147a4b":"#536174"
                }}>
                  {c.status==="new"?"Ново":c.status==="in_progress"?"Во обработка":c.status==="contacted"?"Контактиран":"Завршено"}
                </span>
                <select
                  aria-label="Промени статус"
                  value={c.status}
                  onChange={e => void execute(() => updateCheck({
                    id:c._id,
                    status:e.target.value as "new"|"in_progress"|"contacted"|"closed"
                  }))}
                  style={{padding:10,border:"1px solid #dce3f1",borderRadius:9,background:"#fff"}}
                >
                  <option value="new">Ново</option>
                  <option value="in_progress">Во обработка</option>
                  <option value="contacted">Контактиран</option>
                  <option value="closed">Завршено</option>
                </select>
              </div>
            </div>

            <details style={{borderTop:"1px solid #e8edf5"}}>
              <summary style={{cursor:"pointer",padding:"16px 22px",fontWeight:700,color:"#4e61e8",background:"#f8faff"}}>
                Прикажи целосна анализа
              </summary>
              <div style={{padding:22,display:"grid",gap:18}}>
                <section>
                  <h4>Идентификуван проблем</h4>
                  <p style={{whiteSpace:"pre-wrap",lineHeight:1.8}}>{c.problem}</p>
                </section>
                <section style={{background:"#f4f6ff",padding:18,borderRadius:12}}>
                  <h4>Предлог од NGC</h4>
                  <p style={{whiteSpace:"pre-wrap",lineHeight:1.8}}>{c.proposedSolution}</p>
                </section>
                <section>
                  <h4>Придобивки</h4>
                  <ul style={{paddingLeft:20,lineHeight:1.9}}>
                    {c.benefits.map((benefit,i) => <li key={i}>{benefit}</li>)}
                  </ul>
                </section>
                <section style={{borderTop:"1px solid #e8edf5",paddingTop:16}}>
                  <h4>Петте прашања и одговори</h4>
                  <div style={{whiteSpace:"pre-wrap",lineHeight:2}}>{c.answersText}</div>
                </section>
                {c.note && (
                  <section style={{background:"#fff9e9",padding:16,borderRadius:12}}>
                    <h4>Дополнителна забелешка</h4>
                    <p style={{whiteSpace:"pre-wrap"}}>{c.note}</p>
                  </section>
                )}
              </div>
            </details>
          </article>
        ))}
      </div>
    )}

    <div style={{padding:20,borderTop:"1px solid #e5e9f4"}}>
      <a href="/business-check" target="_blank" rel="noopener noreferrer">
        Отвори го јавниот Business Check ↗
      </a>
      {error && <p className="ngca-error">{error}</p>}
    </div>
  </div>
)}
      </div>
    </main>
    {selected && current && <div className="ngca-modal-backdrop" onMouseDown={() => setSelected(null)}><section className="ngca-modal" role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()}><div className="ngca-modal-head"><div><div className="ngca-eyebrow">NGC ORGANIZER</div><h2>{selected.kind === "project" ? t.projectDetails : t.contactDetails}</h2></div><button onClick={() => setSelected(null)} aria-label={t.close}><X size={22}/></button></div><div className="ngca-modal-body"><div className="ngca-fields">{Object.entries(current).filter(([k,v]) => !k.startsWith("_") && !["notes", "activities", "userAgent", "ipAddress", "referrer"].includes(k) && v !== undefined && v !== null && (typeof v !== "object" || Array.isArray(v))).map(([k,v]) => <div key={k}><span>{k.replace(/([A-Z])/g," $1")}</span><strong>{Array.isArray(v) ? v.join(", ") : String(v)}</strong></div>)}</div><label className="ngca-modal-status">{t.status}<select disabled={busy} value={current.status} onChange={e => handleStatus(e.target.value)}>{(selected.kind === "project" ? projectStatuses : contactStatuses).map(s => <option key={s} value={s}>{s.replaceAll("_", " ")}</option>)}</select></label>{error && <p className="ngca-error">{error}</p>}</div><div className="ngca-modal-footer"><button className="ngca-danger" disabled={busy} onClick={handleDelete}><Trash2 size={16}/>{t.delete}</button><button className="ngca-close" onClick={() => setSelected(null)}>{t.close}</button></div></section></div>}
  </div>;
}

function Stat({label,value,icon:Icon,tone,onClick}:{label:string;value:number;icon:typeof FolderKanban;tone:string;onClick:()=>void}) { return <button className="ngca-stat" onClick={onClick}><span className={`ngca-stat-icon ${tone}`}><Icon size={22}/></span><span className="ngca-stat-label">{label}</span><strong>{value}</strong><span className="ngca-stat-arrow"><ArrowUpRight size={17}/></span></button>; }

