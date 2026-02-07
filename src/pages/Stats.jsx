import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts } from "../api/workouts";

function Stats() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch {
        setError("Could not load workouts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const summary = useMemo(() => {
    if (!workouts.length) return null;

    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
    const byType = workouts.reduce((acc, w) => {
      acc[w.type] = (acc[w.type] || 0) + 1;
      return acc;
    }, {});
    return { totalWorkouts, totalMinutes, byType };
  }, [workouts]);

  return (
    <section>
      <h1>Stats</h1>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (!workouts.length || !summary) && (
        <p>Not enough data yet. Log some workouts first.</p>
      )}

      {summary && (
        <>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h3>Total workouts</h3>
              <p>{summary.totalWorkouts}</p>
            </div>
            <div>
              <h3>Total minutes</h3>
              <p>{summary.totalMinutes}</p>
            </div>
          </div>

          <div>
            <h3>By type</h3>
            <ul>
              {Object.entries(summary.byType).map(([type, count]) => (
                <li key={type}>
                  {type}: {count}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

export default Stats;
