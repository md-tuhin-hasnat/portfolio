'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({href, label}){
  const currentPath = usePathname();
  return(
    <Link
      href={href} 
      className={cn("text-sm font-black uppercase tracking-widest hover:text-primary transition-all", {
        "text-white/70": currentPath !== href,
        "text-white border-b-2 border-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]": currentPath === href,
      })}
    >
      {label}
    </Link>
  );
}