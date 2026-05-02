import { BoxReveal} from "@/components/magicui/box-reveal";
import { Separator } from "@/components/ui/separator";
export function SectionHeading({children,className}){
  return(
    <BoxReveal boxColor={"hsl(var(--primary))"} className={className}>
      <h2 className="text-3xl font-light mb-2 text-white tracking-tight drop-shadow-sm">{children}</h2>
      <div className="bg-primary w-24 h-0.5 mb-6 shadow-[0_0_15px_hsl(var(--primary)/0.6)] rounded-full"/>
    </BoxReveal>
  )
}