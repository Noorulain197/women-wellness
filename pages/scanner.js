import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Scanner() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function onScan(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setResult(data);
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
          <h1 className="text-2xl font-semibold">Side‑Effect Scanner</h1>
          <form onSubmit={onScan} className="mt-4 grid sm:grid-cols-3 gap-3">
            <input className="input sm:col-span-2" placeholder="Product/Treatment name (e.g., Glutathione injection)" value={name} onChange={e=>setName(e.target.value)} required/>
            <button className="btn" disabled={loading}>{loading ? "Scanning..." : "Scan"}</button>
          </form>
          {error && <p className="mt-3 text-red-400">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold">Verdict</h2>
              <p className="mt-2 text-slate-300">{result.verdict}</p>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Potential Side‑Effects</h2>
              <ul className="list-disc pl-6 text-slate-300">
                {result.sideEffects?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Notes</h2>
              <p className="mt-2 text-slate-300 whitespace-pre-wrap">{result.notes}</p>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
