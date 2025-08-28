import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComparisonTable from "../components/ComparisonTable";

export default function Analyzer() {
  const [age, setAge] = useState("");
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function onAnalyze(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, symptom }),
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
          <h1 className="text-2xl font-semibold">Symptom & Age‑based Analyzer</h1>
          <form onSubmit={onAnalyze} className="mt-4 grid sm:grid-cols-3 gap-3">
            <input className="input" placeholder="Age (e.g., 35)" value={age} onChange={e=>setAge(e.target.value)} required/>
            <input className="input sm:col-span-2" placeholder="Symptom (e.g., hair fall, hot flashes)" value={symptom} onChange={e=>setSymptom(e.target.value)} required/>
            <button className="btn sm:col-span-3" disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</button>
          </form>
          {error && <p className="mt-3 text-red-400">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="mt-2 text-slate-300 whitespace-pre-wrap">{result.summary}</p>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Natural Remedies</h2>
              <ul className="list-disc pl-6 text-slate-300">
                {result.natural?.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Modern Treatments</h2>
              <ul className="list-disc pl-6 text-slate-300">
                {result.modern?.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Comparison</h2>
              <ComparisonTable rows={result.comparison || []} />
            </div>
            <div className="card">
              <h2 className="text-xl font-semibold">Cautions</h2>
              <ul className="list-disc pl-6 text-slate-300">
                {result.cautions?.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
