 "use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Check, CheckCircle2, ListPlus } from "lucide-react";
import { useFitLog } from "./AppProvider";
import Toast from "./Toast";

export default function WorkoutDetail({workout}) {
  const {addToPlan,saveForLater,plan,saved}=useFitLog();
  const [toast,setToast]=useState("");
  const [feedback,setFeedback]=useState("");
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},[]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),2600);return()=>clearTimeout(t)},[toast]);
  const showFeedback = (type) => {
    setFeedback(type);
    window.setTimeout(() => setFeedback(""), 1000);
  };
  const add=()=>{
    const r=addToPlan(workout);
    if (r.reason === "already") {
      setToast("Already added to today's plan");
      showFeedback("already-plan");
    } else if (r.reason === "cap") {
      setToast("Today's plan is full (5 lifts)");
      showFeedback("cap");
    } else {
      setToast("Added to today's plan");
      showFeedback("added-plan");
    }
  };
  const save=()=>{
    const r=saveForLater(workout);
    if (r.reason === "already") {
      setToast("Already saved");
      showFeedback("already-saved");
    } else {
      setToast("Saved for later");
      showFeedback("saved");
    }
  };
  return <><div className="container-fit pt-8"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#888] hover:text-white"><ArrowLeft size={16}/> Back to library</Link></div>
  <section className="container-fit grid gap-10 py-8 lg:grid-cols-[.95fr_1.05fr] lg:py-12">
    <div className="lg:sticky lg:top-24 lg:h-fit"><div className="overflow-hidden rounded-3xl border border-[#292929] bg-[#111]"><img src={workout.image} alt={workout.name} className="aspect-square w-full object-cover"/></div></div>
    <div className="py-2">
      <div className="flex flex-wrap gap-2">{workout.muscleGroups.map(x=><span key={x} className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black">{x}</span>)}</div>
      <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">{workout.name}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#999]">{workout.description}</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#292929] bg-[#111]">
        {[["EQUIPMENT",workout.equipment],["DIFFICULTY",workout.difficulty],["SETS",workout.sets],["REPS",workout.reps],["DURATION",`${workout.duration} min`],["CALORIES",`${workout.caloriesBurned} kcal`],["RATING",workout.rating]].map(([l,v])=><div key={l} className="flex items-center justify-between border-b border-[#252525] px-5 py-3.5 last:border-0"><span className="text-[11px] font-extrabold tracking-[.16em] text-[#666]">{l}</span><span className="text-sm font-bold text-white">{v}</span></div>)}
      </div>
      <div className="mt-9"><h2 className="font-display text-3xl font-bold uppercase">INSTRUCTIONS</h2><ol className="mt-4 space-y-3">{workout.instructions.map((x,i)=><li key={x} className="flex gap-4 rounded-xl border border-[#242424] bg-[#0e0e0e] p-4"><span className="font-display text-xl font-bold text-[#ccff00]">{String(i+1).padStart(2,"0")}</span><span className="text-sm leading-6 text-[#aaa]">{x}</span></li>)}</ol></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button onClick={add} className={`fit-action-button flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-4 text-sm font-extrabold text-black ${feedback === "added-plan" ? "button-success" : ""} ${feedback === "already-plan" ? "button-already" : ""} ${feedback === "cap" ? "button-already" : ""}`}>
          {feedback === "added-plan" ? <CheckCircle2 size={19}/> : <ListPlus size={19}/>} 
          {feedback === "added-plan" ? "ADDED!" : feedback === "already-plan" ? "ALREADY ADDED" : feedback === "cap" ? "PLAN IS FULL" : "ADD TO TODAY'S PLAN"}
        </button>
        <button onClick={save} className={`fit-action-button flex items-center justify-center gap-2 rounded-xl border border-[#3b3b3b] bg-[#141414] px-5 py-4 text-sm font-extrabold text-white ${feedback === "saved" ? "button-success" : ""} ${feedback === "already-saved" ? "button-already" : ""}`}>
          {feedback === "saved" ? <CheckCircle2 size={19}/> : <Bookmark size={19}/>} 
          {feedback === "saved" ? "SAVED!" : feedback === "already-saved" ? "ALREADY SAVED" : "SAVE FOR LATER"}
        </button>
      </div>
    </div>
  </section><Toast message={toast} onClose={()=>setToast("")}/></>;
}