import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { shortIntro } from "@/data/short-intro";
import { SocialHandle } from "@/components/custom/sub-intro/social-handle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShineBorder } from "@/components/magicui/shine-border";
export function IntroContainer() {
  return (
    <Card className="h-[90svh] w-[20%] rounded-r-none border-l-primary border-t-primary border-b-primary bg-card">
      <ScrollArea className="h-[calc(84svh-8px)] p-4">
        <CardContent className="flex flex-col items-center justify-center mt-8">
          <ShineBorder
            className="min-w-0 min-h-0 p-0"
            color={"hsl(var(--primary))"}
            borderRadius={16}
            borderWidth={2}
          >
            <Image
              src={shortIntro.image}
              alt="Logo"
              width={150}
              height={150}
              className=" h-32 w-auto rounded-2xl border"
            />
          </ShineBorder>
          <h2 className="text-2xl mt-2 font-extralight">{shortIntro.name}</h2>
          <h3 className="text-sm font-extralight text-secondary-foreground/70">{shortIntro.role}</h3>
          <Separator orientation="horizontal" className="mt-3 bg-primary"/>

          <section className="flex flex-col mt-7 gap-1">

            {shortIntro.social.map((social, index) => (
              <SocialHandle key={index} Social={social} />
            ))}
        </section>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}