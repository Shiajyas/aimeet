"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { BotIcon, StampIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashbordUserButton } from "./dashbord-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    title: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    title: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StampIcon,
    title: "Upgrade",
    href: "/upgrade",
  },
];

export const DashbordSidebar = () => {
  const pathName = usePathname();

  return (
    <Sidebar className="flex flex-col h-screen">
      {/* Header */}
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <img src="/logo.svg" alt="logo" height={36} width={36} />
          <p className="text-2xl font-semibold">Ai.meet</p>
        </Link>
      </SidebarHeader>

      <Separator className="opacity-70 text-[#050505]" />

      {/* Main Content */}
      <SidebarContent className="flex-1 flex flex-col">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 flex items-center px-3 rounded-md hover:bg-muted transition-colors",
                      pathName === item.href &&
                        "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border border-black/10"
                    )}
                    isActive={pathName === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="opacity-70 text-[#050505]" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 flex items-center px-3 rounded-md hover:bg-muted transition-colors",
                      pathName === item.href &&
                        "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border border-black/10"
                    )}
                    isActive={pathName === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer pinned to bottom */}
      <SidebarFooter className="mt-auto p-4">
        <DashbordUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
