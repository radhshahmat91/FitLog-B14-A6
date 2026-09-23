 "use client";
import { useEffect, useState } from "react";
import { ArrowDown, Dumbbell, Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import SortSelect from "./SortSelect";
import { getWorkouts } from "@/lib/api";

export default function HomeClient() {
  const [workouts,setWorkouts]=useState([]), [loading,setLoading]=useState(true), [error,setError]=useState(""), [sort,setSort]=useState("duration"), [query,setQuery]=useState("");
  useEffect(()=>{getWorkouts().then(setWorkouts).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
  const shown=[...workouts].filter(w=>(w.name+" "+w.muscleGroups.join(" ")).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="duration"?a.duration-b.duration:sort==="calories"?a.caloriesBurned-b.caloriesBurned:b.rating-a.rating);
  return <>
    <section className="border-b border-[#242424]">
      <div className="container-fit grid min-h-[590px] items-center gap-10 py-14 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-extrabold tracking-[.28em] text-[#ccff00]">WORKOUT LIBRARY</p>
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] font-bold uppercase leading-[.86] tracking-tight">TRAIN WITH INTENT.<br/>LOG EVERY SET.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#9b9b9b]">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
          <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3.5 text-sm font-extrabold text-black transition hover:brightness-90"><Dumbbell size={18}/> BROWSE WORKOUTS <ArrowDown size={16}/></a>
        </div>
        <div className="relative mx-auto w-full max-w-[430px]"><div className="absolute -inset-4 rounded-[2rem] bg-[#ccff00]/10 blur-3xl"/><img src="/assets/banner.png" alt="Workout illustration" className="relative w-full rounded-[2rem] border border-[#2b2b2b] bg-[#151515] object-cover"/></div>
      </div>
    </section>
    <section id="library" className="container-fit scroll-mt-24 py-20">
      <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><p className="text-xs font-extrabold tracking-[.25em] text-[#666]">12 LIFTS / ALL LEVELS</p><h2 className="mt-2 font-display text-5xl font-bold uppercase">THE LIBRARY</h2><p className="mt-2 text-sm text-[#888]">Twelve lifts covering every major muscle group.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search workouts" className="w-full rounded-lg border border-[#333] bg-[#111] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#ccff00] sm:w-52"/></div><SortSelect value={sort} onChange={setSort}/></div>
      </div>
      {loading ? <div className="flex min-h-[420px] flex-col items-center justify-center gap-4"><div className="spinner"/><p className="text-sm font-semibold text-[#888]">Loading workouts…</p></div> : error ? <div className="rounded-2xl border border-red-900 bg-red-950/30 p-8 text-center text-sm">{error}</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{shown.map(w=><WorkoutCard key={w.id} workout={w}/>)}</div>}
      {!loading&&!error&&!shown.length&&<p className="py-20 text-center text-[#888]">No workouts match your search.</p>}
    </section>
  </>;
}