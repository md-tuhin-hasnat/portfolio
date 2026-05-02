import { Terminal, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function FourOFour() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
      <div className="relative">
        <h1 className="text-9xl font-black text-white/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertTriangle className="w-20 h-20 text-primary animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Routing Error</h2>
        <p className="text-muted-foreground font-bold tracking-widest text-xs uppercase">
          Requested Node: Not Found in Architecture
        </p>
      </div>

      <Link 
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-[0.3em] transition-all"
      >
        <Terminal className="w-4 h-4" />
        Reboot to Core
      </Link>
    </div>
  );
}