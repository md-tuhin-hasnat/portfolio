import { Separator } from "@/components/ui/separator";
import { aboutMe } from "@/data/about-me";
import { BoxReveal } from "@/components/magicui/box-reveal";
export function AboutMeSection() {
  return (
    <section className="flex flex-col gap-4 mt-2">
      {
        aboutMe.content.map((content, index) => (
            <p key={index} className="font-normal text-primary-foreground/65">{content}</p>
        ))
      }
    </section>
  );
}