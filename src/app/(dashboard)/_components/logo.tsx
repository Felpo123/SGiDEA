import Image from "next/image";

export function Logo() {
  return (
        <Image
        height={200}
        width={230}
        alt="logo"
        src="/logo.png"
      />
  );
}
