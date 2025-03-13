import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { client } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Mailtrap Test",
    };
    const recipients = [
      {
        email: "vinaydagar514@gmail.com",
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: "acd36657-9d72-4e26-99c2-8a92476f6d74",
        template_variables: {
          first_name: invoiceData.clientName,
          company_info_name: "InvoiceMarshal",
          company_info_address: "Khandewla Haryana",
          company_info_city: "Delhi",
          company_info_zip_code: "122504",
          company_info_country: "India",
        },
      })
      .then(console.log, console.error);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
