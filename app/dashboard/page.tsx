import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function Dashboard() {
  const session = await requireUser();
  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
      </div>
    </>
  );
}
