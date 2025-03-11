interface iAppProps {
  amount: number;
  currency: "INR" | "EUR" | "USD";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
