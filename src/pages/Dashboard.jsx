import { useEffect, useState } from "react";
import { fetchWorkouts, createWorkout } from "../api/workouts";

function Dashboard() {
  const [form, setForm] = useState({
    date: "",
    type: "",
    duration: "",
    notes: "",
  });
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch {
        setError("Could not load workouts");
      } finally {
        setLoadingList(false);
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAdding(true);
    try {
      const newW = await createWorkout({
        ...form,
        duration: Number(form.duration),
      });
      setWorkouts((prev) => [newW, ...prev]);
      setForm({ date: "", type: "", duration: "", notes: "" });
    } catch {
      setError("Could not add workout");
    } finally {
      setAdding(false);
    }
  };

  return (
    <section>
      <h1>Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Workout type (Run, Push, etc.)"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add workout"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loadingList ? (
        <p>Loading workouts...</p>
      ) : workouts.length === 0 ? (
        <p>No workouts yet. Add your first workout!</p>
      ) : (
        <ul>
          {workouts.map((w) => (
            <li key={w.id}>
              <strong>{w.date}</strong> – {w.type} – {w.duration} min
              {w.notes && ` – ${w.notes}`}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Dashboard;
