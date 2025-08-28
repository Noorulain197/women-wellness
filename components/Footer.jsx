export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800">
      <div className="container py-8 text-sm text-slate-400">
        <p className="opacity-80">
          Educational tool. Not medical advice. Always consult a qualified doctor for diagnosis/treatment.
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} NoorTech. All rights reserved.</p>
      </div>
    </footer>
  );
}
