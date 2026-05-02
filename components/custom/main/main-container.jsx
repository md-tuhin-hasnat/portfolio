
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMenu } from "@/components/custom/nav/nav-menu";
import { BorderBeam } from "@/components/magicui/border-beam";

export function MainContainer({ children }) {

  return (
    <section className="w-full lg:flex-1 flex flex-col gap-2 min-w-0 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-0 relative z-10">
      <Card className="rounded-2xl lg:rounded-l-none lg:rounded-b-none border-none lg:border border-white/10 bg-transparent lg:bg-white/5 lg:backdrop-blur-md shadow-none lg:shadow-2xl lg:h-[6svh] flex items-center shrink-0 relative overflow-hidden">
        <NavMenu />
      </Card>

      <Card className="flex-1 rounded-2xl lg:rounded-l-none lg:rounded-t-none border-none lg:border border-white/10 bg-transparent lg:bg-white/5 lg:backdrop-blur-md shadow-none lg:shadow-2xl relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
          <div className="p-4 lg:p-6 pb-24 lg:pb-6 w-full">
            {children}
          </div>
        </div>
      </Card>
    </section>
  );
}
