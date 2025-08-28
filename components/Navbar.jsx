import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
      <nav className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-amber-400">Women</span> Wellness AI
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/analyzer" className="hover:text-amber-400">Analyzer</Link>
          <Link href="/scanner" className="hover:text-amber-400">Side‑Effect Scanner</Link>
          <Link href="/progress" className="hover:text-amber-400">Progress</Link>
          {/* <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline hover:text-amber-400"
          >
            Deploy
          </a> */}
        </div>
      </nav>
    </header>
  );
}
