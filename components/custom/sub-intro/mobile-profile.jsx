import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { shortIntro } from "@/data/short-intro";
import { SocialHandle } from "@/components/custom/sub-intro/social-handle";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BorderBeam } from "@/components/magicui/border-beam";

export function MobileProfile() {
  return (
    <div className="w-full lg:hidden flex flex-col items-center justify-center p-6 mb-10 relative">
      <ShineBorder
        className="min-w-0 min-h-0 p-0 bg-transparent mb-6"
        color={"hsl(var(--primary))"}
        borderRadius={16}
        borderWidth={2}
      >
        <Image
          src={shortIntro.image}
          alt="Logo"
          width={150}
          height={150}
          className=" h-32 w-auto rounded-2xl border border-white/10"
        />
      </ShineBorder>
      <h2 className="text-3xl font-black text-foreground tracking-tighter mb-1">{shortIntro.name}</h2>
      <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">{shortIntro.role}</h3>
      <Separator orientation="horizontal" className="w-full bg-white/10 mb-8"/>

      <section className="flex flex-col w-full gap-3">
        {shortIntro.social.map((social, index) => (
          <SocialHandle key={index} Social={social} />
        ))}
      </section>
    </div>
  );
}
