import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import warningGIf from "@/public/warning.gif.gif";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { DeleteInvoice } from "@/app/action";

async function Authorized(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function DeleteInvoiceRoute({
  params,
}: {
  params: Params;
}) {
  const session = await requireUser();
  const { invoiceId } = await params;
  await Authorized(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={warningGIf} alt="Warning Gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await DeleteInvoice(invoiceId);
            }}
          >
            <SubmitButtons text="Delete Invoice" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
