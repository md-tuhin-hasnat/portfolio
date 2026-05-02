import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { shortIntro } from "@/data/short-intro";
import { SocialHandle } from "@/components/custom/sub-intro/social-handle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BorderBeam } from "@/components/magicui/border-beam";

export function IntroContainer() {
  return (
    <Card className="hidden lg:flex flex-col w-full lg:w-[320px] lg:shrink-0 lg:sticky lg:top-0 rounded-2xl lg:rounded-r-none border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden h-fit lg:h-[calc(100vh-8rem)] relative z-10">
      <CardContent className="flex flex-col items-center justify-center p-6 mt-4 relative">
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
        <h2 className="text-2xl mt-4 font-bold text-foreground drop-shadow-md">{shortIntro.name}</h2>
        <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">{shortIntro.role}</h3>
        <Separator orientation="horizontal" className="mt-4 bg-white/10"/>

        <section className="flex flex-col mt-6 w-full gap-2">
          {shortIntro.social.map((social, index) => (
            <SocialHandle key={index} Social={social} />
          ))}
        </section>
      </CardContent>
    </Card>
  );
}