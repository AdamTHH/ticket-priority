import { TicketChat } from "@/components/ticket-chat"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu, Sidebar, Ticket } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col h-svh bg-background">
      <header className="border-b px-4 py-3 shrink-0">
        <div className="container mx-auto flex items-center gap-4">

          <SidebarTrigger>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>

          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary">
            <Ticket className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-sm">
            Ticket Prioritás analizáló
          </h1>
        </div>
      </header>

      <div className="container mx-auto flex-1 overflow-hidden">
        <TicketChat />
      </div>

    </div>
  )
}
