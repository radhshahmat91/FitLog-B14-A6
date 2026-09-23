export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load workouts.");
  return res.json();
}

export async function getWorkout(id) {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Workout not found.");
  return res.json();
}