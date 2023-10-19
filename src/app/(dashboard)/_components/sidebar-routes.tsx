"use client";
import { appRoutes } from "@/routes";
import { useSession } from "next-auth/react";
import { Role } from "@/types/role";
import { SidebarItem } from "./sidebar-item";
import { Home, ClipboardSignature, UserCog, Container } from "lucide-react";

const adminRoutes = [
  {
    icon: Home,
    label: "Inicio",
    href: appRoutes.home,
  },
  {
    icon: ClipboardSignature,
    label: "Asignaciones",
    href: appRoutes.assignments,
  },
  {
    icon: UserCog,
    label: "Usuarios",
    href: appRoutes.users,
  },
  {
    icon: Container,
    label: "Inventario",
    href: appRoutes.inventory,
  },
];
const ideaRoutes = [
  {
    icon: Home,
    label: "Inicio",
    href: appRoutes.home,
  },
  {
    icon: Container,
    label: "Inventario",
    href: appRoutes.inventory,
  },
  {
    icon: ClipboardSignature,
    label: "Asignaciones",
    href: appRoutes.assignments,
  },
];
const userRoutes = [
  {
    icon: Home,
    label: "Inicio",
    href: appRoutes.home,
  },
  {
    icon: Container,
    label: "Inventario",
    href: appRoutes.inventory,
  },
  {
    icon: ClipboardSignature,
    label: "Asignaciones",
    href: appRoutes.assignments,
  },
];

export function SidebarRoutes() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full">
      {session?.user.role === Role.ADMINISTRADOR &&
        adminRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      {session?.user.role === Role.USUARIO &&
        userRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      {session?.user.role === Role.IDEA &&
        ideaRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
    </div>
  );
}
