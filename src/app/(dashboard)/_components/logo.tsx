import { appRoutes } from "@/routes";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={appRoutes.home}>      
        <Image
        height={200}
        width={230}
        alt="logo"
        src="/logo.png"
      />
    </Link>
  );
}
