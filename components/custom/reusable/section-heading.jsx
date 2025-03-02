import { BoxReveal} from "@/components/magicui/box-reveal";
import { Separator } from "@/components/ui/separator";
export function SectionHeading({children,className}){
  return(
    <BoxReveal boxColor={"hsl(272.1 71.7% 47.1%)"} className={className}>
      <h2 className="text-3xl font-light mb-2">{children}</h2>
      <Separator orientation="horizontal" className="bg-primary w-24 h-1 mb-4"/>
    </BoxReveal>
  )
}