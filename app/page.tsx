import { TicketChat } from "@/components/ticket-chat"
import { Ticket } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col h-svh bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary">
            <Ticket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Ticket Priority Analyzer</h1>
            <p className="text-xs text-muted-foreground">
              Paste a ticket to analyze its priority
            </p>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-3xl mx-auto">
          <TicketChat />
        </div>
      </main>
    </div>
  )
}
