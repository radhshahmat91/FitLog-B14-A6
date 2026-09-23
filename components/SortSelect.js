 "use client";
import { ChevronDown } from "lucide-react";
export default function SortSelect({ value,onChange }) {
 return <div className="relative"><select value={value} onChange={e=>onChange(e.target.value)} className="appearance-none rounded-lg border border-[#333] bg-black px-4 py-2.5 pr-10 text-sm font-bold text-white outline-none focus:border-[#ccff00]"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white"/></div>
}