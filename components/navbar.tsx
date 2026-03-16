"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Menu, Ticket } from "lucide-react"

export function Navbar() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky h-14 top-0 z-50 flex flex-row gap-4 p-4 items-center border-b bg-background">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="container mx-auto flex items-center gap-4">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary">
          <Ticket className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="font-semibold text-sm">
          Ticket Prioritás analizáló
        </h1>
      </div>
    </header>
  )
}