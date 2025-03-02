import { navLink } from "@/data/nav-link"
import { NavLink } from "./nav-link"
export function NavMenu(){
  return(
    <nav className="flex justify-end items-center gap-4 mr-8 h-[6svh]">
      {
        navLink.map((link, index) => (
          <NavLink key={index} href={link.href} label={link.label}/>
        ))
      }
    </nav>
  )
}