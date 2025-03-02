import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comment/queries/get-comments";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) {
    /* Handle not found error */
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />
      <div className="flex justify-center animate-fade-from-top">
        <TicketItem ticket={ticket} isDetail comments={comments} />
      </div>
    </div>
  );
};

export default TicketPage;
