import { User as AuthUser } from "lucia";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/features/auth/actions/sign-out";
import { accountPasswordPath, accountProfilePath } from "@/paths";

type AccountDropdownProps = {
  user: AuthUser;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()}>
            <LucideUser className="mr-2 size-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()}>
            <LucideLock className="mr-2 size-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <LucideLogOut className="mr-2 size-4" />
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown };
