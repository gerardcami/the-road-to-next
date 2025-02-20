import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 flex flex-col items-center justify-center self-center"
    >
      <LucideLoaderCircle className="size-12 animate-spin" />
    </div>
  );
};

export { Spinner };
