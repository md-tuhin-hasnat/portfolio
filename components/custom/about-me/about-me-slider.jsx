import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Marquee } from "@/components/magicui/marquee";
import {achivements} from "@/data/achivements";
import Image from "next/image";
import Link from "next/link";
const ReviewCard = ({
  brandTextColor,
  title,
  link,
  logo,
  brand,

}) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <Card className="w-64 flex flex-col h-48 bg-primary-foreground/10">
        <CardHeader>
          <section className="flex flex-row justify-between rounded items-center">
            <Image src={logo} alt={title} height={50} width={50} className="h-8 w-auto" />
            <h3 className="text-lg font-bold" style={{color:brandTextColor}}>{brand}</h3>
          </section>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <section>
            <h4 className="text-lg font-light text-center">{title}</h4>
          </section>
        </CardContent>
      </Card>
    </Link>
  );
};

export function AboutMeSlider() {
  return (
    <section className="flex w-full justify-center">
      <Marquee pauseOnHover className="[--duration:1s max-w-full]" >
        {achivements.map((achivement, key) => (
          <ReviewCard key={key} {...achivement} />
        ))}
      </Marquee>
    </section>
  );
}
