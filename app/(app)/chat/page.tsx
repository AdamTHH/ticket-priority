import { TicketChat } from "@/components/ticket-chat"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu, Sidebar, Ticket } from "lucide-react"

export const metadata = {
  title: "Ticket Prioritás - Chat",
}

export default function Page() {
  return (
    <div className="container h-full mx-auto bg-background">
      <TicketChat />

    </div>
  )
}
