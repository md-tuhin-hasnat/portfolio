'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({href, label}){
  const currentPath = usePathname();
  return(
    <Link
      href={href} 
      className={cn("text-sm font-medium hover:text-primary", {
        "text-secondary-foreground/70": currentPath !== href,
        "text-primary border-b-2 border-primary": currentPath === href,
      })}
    >
      {label}
    </Link>
  );
}