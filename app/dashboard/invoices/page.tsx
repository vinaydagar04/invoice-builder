import { InvoiceList } from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoiceRoute() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between ">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="" className={buttonVariants()}>
            <PlusIcon color="white" />{" "}
            <span className="text-white">Create Invoices</span>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceList />
      </CardContent>
    </Card>
  );
}
