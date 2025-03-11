import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN!;

export const client = new MailtrapClient({
  token: TOKEN,
});
