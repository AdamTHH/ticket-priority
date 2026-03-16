"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MessageSquare, History } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"

const items = [
  { title: "Chat", href: "/chat", icon: MessageSquare },
  { title: "Előzmények", href: "/history", icon: History },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Sidebar draggable className="top-14">
      <SidebarContent>
        {isMobile && (
          <>
            <div className="p-4">
              <h2 className="text-2xl font-bold">TicketPrio</h2>
            </div>
          </>
        )}
        <SidebarMenu className="p-4 space-y-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                className={cn(
                  "p-5 transition-colors bg-transparent! hover:bg-accent/80! active:bg-accent/60! cursor-pointer",
                  pathname === item.href && "bg-accent!"
                )}
                onClick={() => {
                  router.push(item.href);
                  isMobile && toggleSidebar();
                }}
              >
                <item.icon className="text-primary" />
                <span className="text-primary">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}