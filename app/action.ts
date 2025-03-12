"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { client } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });
  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

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
      template_uuid: "571a51f8-56b5-427e-aa74-3c589ec7a44b",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          new Date(submission.value.date)
        ),
        totalAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as any,
        }),
        invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
      },
    })
    .then(console.log, console.error);
  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

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
      template_uuid: "1b0ece38-4da1-42cd-8f8a-c7cf3e1c6812",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          new Date(submission.value.date)
        ),
        totalAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as any,
        }),
        invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
      },
    })
    .then(console.log, console.error);
  return redirect("/dashboard/invoices");
}
