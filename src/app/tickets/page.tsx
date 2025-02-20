import { Suspense } from "react";

import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All yout tickets at one place" />

      <Suspense
        /* Temporal action while data is fetching */ fallback={<Spinner />}
      >
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
