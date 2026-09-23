"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useFitLog } from "./AppProvider";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);
  const active = (p) => path === p ? "text-[#ccff00]" : "text-[#aaa] hover:text-white";

  return <header className="sticky top-0 z-50 border-b border-[#242424] bg-[#080808]/95 backdrop-blur">
    <div className="container-fit flex h-[72px] items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide" onClick={() => setOpen(false)}>
        <img src="/assets/logo.png" className="h-7 w-7" alt="FitLog logo"/><span>FITLOG</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        <Link href="/" className={`text-sm font-bold uppercase tracking-wider ${active("/")}`}>Workout</Link>
        <Link href="/my-plan?tab=plan#plan" className={`text-sm font-bold uppercase tracking-wider ${active("/my-plan")}`}>My Plan</Link>
      </nav>
      <div className="hidden items-center gap-2 sm:flex">
        <Link href="/my-plan?tab=plan#plan" className="nav-badge rounded-full bg-[#ccff00] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-black">Plan <span className="ml-1">{plan.length}</span></Link>
        <Link href="/my-plan?tab=saved#saved" className="nav-badge badge-outline rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">Saved <span className="ml-1">{saved.length}</span></Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="border-t border-[#242424] bg-[#0d0d0d] px-4 py-5 md:hidden">
      <div className="container-fit flex flex-col gap-5">
        <Link href="/" onClick={() => setOpen(false)} className="font-bold uppercase">Workout</Link>
        <Link href="/my-plan?tab=plan#plan" onClick={() => setOpen(false)} className="font-bold uppercase">My Plan</Link>
        <div className="flex gap-2">
          <Link href="/my-plan?tab=plan#plan" onClick={() => setOpen(false)} className="nav-badge rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black">Plan {plan.length}</Link>
          <Link href="/my-plan?tab=saved#saved" onClick={() => setOpen(false)} className="nav-badge rounded-full border border-[#454545] px-4 py-2 text-xs font-bold">Saved {saved.length}</Link>
        </div>
      </div>
    </div>}
  </header>;
}
