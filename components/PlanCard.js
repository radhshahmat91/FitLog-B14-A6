 "use client";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { useFitLog } from "./AppProvider";
export default function PlanCard({workout,savedCard=false,onToast}) {
 const {removeFromPlan,removeSaved,markDone,done}=useFitLog();
 const isDone=done.includes(workout.id);
 const remove=()=>{savedCard?removeSaved(workout.id):removeFromPlan(workout.id);onToast(savedCard?"Removed from saved":"Removed from today's plan")};
 return <div className={`flex flex-col gap-4 rounded-2xl border ${isDone?"border-[#ccff00]/40 bg-[#101700]":"border-[#292929] bg-[#101010]"} p-3 sm:flex-row sm:items-center`}>
  <Link href={`/workouts/${workout.id}`} className="flex min-w-0 flex-1 items-center gap-4"><img src={workout.image} alt="" className="h-24 w-28 rounded-xl object-cover"/><div className="min-w-0"><h3 className="font-display text-2xl font-bold uppercase leading-none">{workout.name}</h3><p className="mt-2 text-xs text-[#888]">{workout.equipment}</p><div className="mt-3 flex flex-wrap gap-3 text-[11px] font-bold text-[#999]"><span className="flex gap-1"><Clock3 size={13}/> {workout.duration}m</span><span className="flex gap-1"><Flame size={13}/> {workout.caloriesBurned} kcal</span><span className="flex gap-1"><Star size={13} className="text-[#ccff00]"/> {workout.rating}</span></div></div></Link>
  <div className="flex items-center gap-2 sm:flex-col lg:flex-row"><Link href={`/workouts/${workout.id}`} className="rounded-lg border border-[#333] px-3 py-2 text-[11px] font-extrabold uppercase">View Details</Link>{!savedCard&&<button onClick={()=>{markDone(workout.id);onToast("Workout marked as done")}} className="rounded-lg bg-[#ccff00] px-3 py-2 text-[11px] font-extrabold uppercase text-black"><Check size={14} className="mr-1 inline"/>{isDone?"Done":"Mark as Done"}</button>}<button onClick={remove} className="rounded-lg border border-[#333] p-2 text-[#999] hover:border-red-800 hover:text-white" aria-label="Remove"><X size={16}/></button></div>
 </div>
}