import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comment/components/comments";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: { username: true };
      };
    };
  }>;
  /* Use interferred types from the API */
  /* ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>; */
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuthOrRedirect();
  const isTicketOwner = isOwner(user, ticket);
  if (!ticket) return null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="size-4" />
        </Button>
      }
    />
  ) : null;

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className=" size-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="size-4" />
      </Link>
    </Button>
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-x-1 gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card key={ticket.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>

          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
          <div className="flex flex gap-x-1 m-2">
            {isDetail ? (
              <>
                {editButton}
                {moreMenu}
              </>
            ) : (
              <>
                {editButton}
                {detailButton}
              </>
            )}
          </div>
        </Card>
      </div>

      {isDetail ? <Comments ticketId={ticket.id} /> : null}
    </div>
  );
};

export { TicketItem };
