import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

import { buttonVariants } from "./ui/button";

const Header = () => {
  const navItems = (
    <>
      <Link
        href={ticketsPath()}
        className={`font-semibold ${buttonVariants({ variant: "outline" })}`}
      >
        Tickets
      </Link>
      <Link
        href={signUpPath()}
        className={`font-semibold ${buttonVariants({ variant: "outline" })}`}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={`font-semibold ${buttonVariants({ variant: "default" })}`}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between gap-x-6">
      <div className="flex items-center gap-x-2">
        {/* First way to use shadcn components (asChild attribute needed) */}
        {/* <Button asChild variant={"outline"}> */}
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "outline" })}
        >
          <LucideKanban />
          <h1 className="font-semibold">TicketBounty</h1>
        </Link>
        {/* </Button> */}
        {/* Second way to use shadcn components */}
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
