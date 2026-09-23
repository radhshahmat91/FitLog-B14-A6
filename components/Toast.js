 "use client";
import { CheckCircle2, X } from "lucide-react";
export default function Toast({ message, onClose }) {
  if (!message) return null;
  return <div className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-xl border border-[#383838] bg-[#151515] px-4 py-3 shadow-2xl fade-in">
    <CheckCircle2 size={19} className="text-[#ccff00]" />
    <span className="text-sm font-semibold">{message}</span>
    <button onClick={onClose} className="ml-2 text-[#888] hover:text-white"><X size={16}/></button>
  </div>;
}