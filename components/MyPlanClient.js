"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Dumbbell, Flame, ListChecks } from "lucide-react";
import PlanCard from "./PlanCard";
import SortSelect from "./SortSelect";
import Toast from "./Toast";
import { useFitLog } from "./AppProvider";

export default function MyPlanClient() {
 const {plan,saved,ready}=useFitLog();
 const [tab,setTab]=useState("plan");
 const [sort,setSort]=useState("duration");
 const [toast,setToast]=useState("");
 const tabsRef=useRef(null);

 useEffect(() => {
   const params = new URLSearchParams(window.location.search);
   const requestedTab = params.get("tab");
   const target = requestedTab === "saved" ? "saved" : "plan";
   setTab(target);
   requestAnimationFrame(() => {
     if (window.location.hash === "#saved" || window.location.hash === "#plan") {
       tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
     }
   });
 }, []);

 const changeTab = (next) => {
   setTab(next);
   window.history.replaceState(null, "", `/my-plan?tab=${next}#${next}`);
   requestAnimationFrame(() => tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
 };

 const current=useMemo(()=>[...(tab==="plan"?plan:saved)].sort((a,b)=>sort==="duration"?a.duration-b.duration:sort==="calories"?a.caloriesBurned-b.caloriesBurned:b.rating-a.rating),[plan,saved,tab,sort]);
 const minutes=plan.reduce((a,x)=>a+x.duration,0), calories=plan.reduce((a,x)=>a+x.caloriesBurned,0);
 return <section className="container-fit py-10 sm:py-14">
   <div className="flex flex-col gap-7 border-b border-[#242424] pb-9 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-extrabold tracking-[.25em] text-[#ccff00]">YOUR LOG</p><h1 className="mt-2 font-display text-6xl font-bold uppercase">MY PLAN</h1><p className="mt-3 max-w-xl text-sm text-[#888]">Cap of five lifts for today. Finish them, then load more.</p></div><div className="flex items-center gap-2"><span className="text-xs font-bold uppercase text-[#666]">Sort By</span><SortSelect value={sort} onChange={setSort}/></div></div>
   <div className="grid gap-3 py-7 sm:grid-cols-3"><Metric icon={<ListChecks/>} label="Exercises" value={plan.length}/><Metric icon={<Dumbbell/>} label="Minutes" value={minutes}/><Metric icon={<Flame/>} label="Calories" value={calories}/></div>
   <div ref={tabsRef} id={tab === "saved" ? "saved" : "plan"} className="scroll-mt-24 mb-6 flex border-b border-[#292929]">
     <button onClick={()=>changeTab("plan")} className={`px-5 py-3 text-sm font-extrabold uppercase ${tab==="plan"?"border-b-2 border-[#ccff00] text-[#ccff00]":"text-[#777]"}`}>Today's Plan <span className="ml-1">({plan.length})</span></button>
     <button onClick={()=>changeTab("saved")} className={`px-5 py-3 text-sm font-extrabold uppercase ${tab==="saved"?"border-b-2 border-[#ccff00] text-[#ccff00]":"text-[#777]"}`}>Saved <span className="ml-1">({saved.length})</span></button>
   </div>
   {!ready ? <div className="flex min-h-[300px] items-center justify-center"><div className="spinner"/></div> : current.length ? <div className="space-y-3">{current.map(w=><PlanCard key={w.id} workout={w} savedCard={tab==="saved"} onToast={setToast}/>)}</div> : <div className="rounded-2xl border border-dashed border-[#333] py-24 text-center"><h2 className="font-display text-4xl font-bold uppercase">NOTHING HERE YET</h2><p className="mx-auto mt-3 max-w-md text-sm text-[#777]">Browse the library and add a lift to get today moving.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-extrabold text-black">Go to workouts</Link></div>}
   <Toast message={toast} onClose={()=>setToast("")}/>
 </section>
}
function Metric({icon,label,value}){return <div className="rounded-2xl border border-[#292929] bg-[#111] p-5"><div className="flex items-center gap-2 text-[#ccff00]">{icon}<span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#777]">{label}</span></div><p className="mt-2 font-display text-4xl font-bold">{value}</p></div>}
