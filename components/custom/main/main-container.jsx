
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMenu } from "@/components/custom/nav/nav-menu";

export function MainContainer({ children }) {

  return (
    <section className="w-[70%] flex flex-col gap-2">
      <Card className="h-[6svh] rounded-l-none rounded-br-none border-t-primary border-r-primary">
        <NavMenu />
      </Card>

      <Card className="h-[calc(84svh-8px)] rounded-l-none rounded-tr-none border-b-primary border-r-primary relative">
        <ScrollArea className="h-full p-4 relative">
          {children}
        </ScrollArea>
      </Card>
    </section>
  );
}
