import { Suspense } from "react";

import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All yout tickets at one place" />

      {/* Alternative way to error route of displaying a error warning. */}
      {/* <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}> */}
      <Suspense
        /* Temporal action while data is fetching */ fallback={<Spinner />}
      >
        <TicketList />
      </Suspense>
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default TicketsPage;
