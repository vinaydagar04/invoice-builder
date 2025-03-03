"use client";

import { cn } from "@/lib/utils";
import { FileIcon, HomeIcon, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: User2,
  },
];

export function Dashboard() {
  const pathname = usePathname();
  return (
    <>
      {DashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex item-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary "
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
