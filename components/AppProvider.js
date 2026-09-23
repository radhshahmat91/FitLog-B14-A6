 "use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const PLAN_KEY = "fitlog-plan-v1";
const SAVED_KEY = "fitlog-saved-v1";
const DONE_KEY = "fitlog-done-v1";

export function AppProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem(PLAN_KEY) || "[]"));
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
      setDone(JSON.parse(localStorage.getItem(DONE_KEY) || "[]"));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); }, [plan, ready]);
  useEffect(() => { if (ready) localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); }, [saved, ready]);
  useEffect(() => { if (ready) localStorage.setItem(DONE_KEY, JSON.stringify(done)); }, [done, ready]);

  const addToPlan = (workout) => {
    if (plan.some(x => x.id === workout.id)) return { added:false, reason:"already" };
    if (plan.length >= 5) return { added:false, reason:"cap" };
    setPlan(prev => [...prev, workout]);
    return { added:true };
  };
  const saveForLater = (workout) => {
    if (saved.some(x => x.id === workout.id)) return { added:false, reason:"already" };
    setSaved(prev => [...prev, workout]);
    return { added:true };
  };
  const removeFromPlan = id => setPlan(prev => prev.filter(x => x.id !== id));
  const removeSaved = id => setSaved(prev => prev.filter(x => x.id !== id));
  const markDone = id => {
    setDone(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const value = useMemo(() => ({
    plan, saved, done, ready, addToPlan, saveForLater, removeFromPlan, removeSaved, markDone
  }), [plan,saved,done,ready]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useFitLog = () => useContext(AppContext);
