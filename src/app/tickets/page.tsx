import { Suspense } from "react";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = async () => {
  const { user } = await getAuth();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My tickets" description="All yout tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      {/* Alternative way to error route of displaying a error warning. */}
      {/* <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}> */}
      <Suspense
        /* Temporal action while data is fetching */ fallback={<Spinner />}
      >
        <TicketList userId={user?.id} />
      </Suspense>
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default TicketsPage;
