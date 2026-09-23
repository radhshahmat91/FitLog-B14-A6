import WorkoutDetail from "@/components/WorkoutDetail";
import { getWorkout } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function Page({params}) {
  try { const workout=await getWorkout(params.id); return <WorkoutDetail workout={workout}/>; }
  catch { return <div className="container-fit py-32 text-center"><h1 className="font-display text-6xl uppercase">Workout Not Found</h1><a href="/" className="mt-6 inline-block rounded-lg bg-[#ccff00] px-5 py-3 font-bold text-black">Back to Library</a></div>; }
}