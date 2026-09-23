import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, Star } from "lucide-react";
export default function WorkoutCard({ workout }) {
  return <Link href={`/workouts/${workout.id}`} className="card-hover group block overflow-hidden rounded-2xl border border-[#272727] bg-[#101010]">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#181818]">
      <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">{workout.muscleGroups.map(t=><span key={t} className="rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">{t}</span>)}</div>
      <span className="absolute bottom-3 right-3 rounded-full bg-[#ccff00] p-2 text-black"><ArrowUpRight size={16}/></span>
    </div>
    <div className="p-4">
      <h3 className="font-display text-xl font-bold uppercase leading-tight">{workout.name}</h3>
      <p className="mt-2 text-xs font-medium text-[#929292]">{workout.equipment}</p>
      <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-[#aaa]"><span className="flex items-center gap-1"><Clock3 size={14}/> {workout.duration} min</span><span className="flex items-center gap-1"><Flame size={14}/> {workout.caloriesBurned} kcal</span><span className="flex items-center gap-1"><Star size={14} className="text-[#ccff00]"/> {workout.rating}</span></div>
    </div>
  </Link>
}