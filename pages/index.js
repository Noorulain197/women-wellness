import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="container pt-12">
        <div className="card">
          <h1 className="text-3xl sm:text-4xl font-bold">
            All‑in‑One <span className="text-amber-400">Women’s Health & Wellness</span> Assistant
          </h1>
          <p className="mt-3 text-slate-300">
            Honest comparison of natural remedies vs modern treatments. Track progress. 
            Built for women 25+ with real‑world concerns—skin, hair, mood, menopause, stress.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/analyzer" className="btn">Open Analyzer</Link>
            <Link href="/scanner" className="btn">Side‑Effect Scanner</Link>
            <Link href="/progress" className="btn">Progress Tracker</Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { t:"Analyzer", d:"Personalized guidance based on age + symptom."},
            { t:"Compare", d:"See cost, timeframe, side‑effects—side by side."},
            { t:"Track", d:"Measure mood, energy, sleep—build healthy habits."},
          ].map((c, i) => (
            <div key={i} className="card">
              <h3 className="text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-slate-300">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="card mt-8">
          <h2 className="text-xl font-semibold">Disclaimer</h2>
          <p className="mt-2 text-slate-300 text-sm">
            Educational content only. Not a substitute for professional medical advice, diagnosis, or treatment.
            Always consult a qualified healthcare provider for personal decisions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
