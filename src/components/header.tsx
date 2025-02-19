import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { homePath, ticketsPath } from "@/paths";

import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-start gap-x-6">
      <div>
        {/* First way to use shadcn components (asChild attribute needed) */}
        {/* <Button asChild variant={"outline"}> */}
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "outline" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
        {/* </Button> */}
      </div>
      <div>
        {/* Second way to use shadcn components */}
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };
