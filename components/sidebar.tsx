"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, History } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Chat", href: "/chat", icon: MessageSquare },
  { title: "History", href: "/history", icon: History },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar draggable>
      <SidebarContent>
        <SidebarMenu className="p-4 space-y-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild className="p-1" isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}