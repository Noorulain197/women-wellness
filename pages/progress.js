import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Progress() {
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ category: "other", notes: "", energy: 5, mood: 5, sleepHours: 7 });
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    if (!email) return;
    try {
      const res = await fetch(`/api/progress?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setList(data?.items || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); }, [email]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setForm({ category: "other", notes: "", energy: 5, mood: 5, sleepHours: 7 });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <section className="container pt-10">
        <div className="card">
          <h1 className="text-2xl font-semibold">Progress Tracker</h1>
          <p className="mt-2 text-slate-300 text-sm">Save daily check‑ins and review your journey.</p>

          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <input className="input sm:col-span-1" placeholder="Email (for saving)" value={email} onChange={e=>setEmail(e.target.value)} />
            <select className="select" value={form.category} onChange={e=>setForm(f=>({...f, category:e.target.value}))}>
              {["skin","hair","mood","menopause","stress","other"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className="input" type="number" min="0" max="10" value={form.energy} onChange={e=>setForm(f=>({...f, energy:Number(e.target.value)}))} placeholder="Energy (0-10)" />
            <input className="input" type="number" min="0" max="10" value={form.mood} onChange={e=>setForm(f=>({...f, mood:Number(e.target.value)}))} placeholder="Mood (0-10)" />
            <input className="input" type="number" min="0" max="24" value={form.sleepHours} onChange={e=>setForm(f=>({...f, sleepHours:Number(e.target.value)}))} placeholder="Sleep hours" />
            <textarea className="textarea sm:col-span-3" rows="3" placeholder="Notes" value={form.notes} onChange={e=>setForm(f=>({...f, notes:e.target.value}))} />
            <button className="btn sm:col-span-3" onClick={onSubmit} disabled={loading || !email}>{loading ? "Saving..." : "Save Entry"}</button>
            {error && <p className="sm:col-span-3 text-red-400">{error}</p>}
          </div>
        </div>

        <div className="card mt-8">
          <h2 className="text-xl font-semibold">History</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Energy</th>
                  <th>Mood</th>
                  <th>Sleep</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {list.map((it, i) => (
                  <tr key={i}>
                    <td>{new Date(it.date || it.createdAt).toLocaleString()}</td>
                    <td>{it.category}</td>
                    <td>{it.energy}</td>
                    <td>{it.mood}</td>
                    <td>{it.sleepHours}</td>
                    <td className="max-w-sm">{it.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
