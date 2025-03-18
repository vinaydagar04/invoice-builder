import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import { buttonVariants } from "@/components/ui/button";
export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Hero Image" className="size-10" />
        <h3 className="text-3xl font-semibold text-black">
          Invoice <span className="text-blue-500">Marshal</span>
        </h3>
      </Link>
      <Link className={buttonVariants()} href="/login">
        <span className="text-white">Get Started</span>
      </Link>
    </div>
  );
}
