import { apiGet, apiPost } from "./client";

export function fetchWorkouts() {
  return apiGet("/api/workouts");
}

export function createWorkout(data) {
  return apiPost("/api/workouts", data);
}
