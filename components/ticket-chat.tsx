"use client"

import { useState, useRef, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Priority } from "./priority-badge"
import { ChatMessage, Message } from "./message"
import { analyzeTicket } from "@/app/actions/analyze-ticket"
import { Textarea } from "./ui/textarea"
import { useChatHistoryStore } from "@/store/chat-history"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const priorityMap: Record<string, Priority> = {
  Alacsony: "low",
  Közepes: "medium",
  Magas: "high",
  Kritikus: "critical",
}

export function TicketChat() {
  const messages = useChatHistoryStore((s) => s.messages)
  const addMessage = useChatHistoryStore((s) => s.addMessage)
  const addTicket = useChatHistoryStore((s) => s.addTicket)
  const [input, setInput] = useState("")
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const mutation = useMutation({
    mutationFn: (userMessage: Message) => analyzeTicket(userMessage.content),
    onSuccess: (result, userMessage) => {
      const priority = priorityMap[result.priority]
      addMessage({
        id: (Date.now() + 1).toString(),
        type: "system",
        content: result.description,
        priority,
        timestamp: new Date(),
      })
      addTicket({
        id: userMessage.id,
        date: userMessage.timestamp,
        input: userMessage.content,
        priority,
      })
    },
    onError: (error) => {
      addMessage({
        id: (Date.now() + 1).toString(),
        type: "system",
        content: "Valami hiba történt a jegy elemzése közben. Kérlek, próbáld újra.",
        timestamp: new Date(),
        errorDetails: error instanceof Error
          ? `${error.name}: ${error.message}${error.stack ? `\n\n${error.stack}` : ""}`
          : String(error),
      })
    },
  })

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    if (!input.trim() || mutation.isPending) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setInput("")
    mutation.mutate(userMessage)
  }

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onShowError={setErrorDetails}
            />
          ))}

          {mutation.isPending && (
            <ChatMessage message={{
              id: "loading",
              type: "system",
              content: "Betöltés...",
              timestamp: new Date(),
            }} />
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-background p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Másold ide a ticket leírását..."
              className="w-full resize-none rounded-xl bg-muted/50 px-4 py-3"
              rows={1}
              disabled={mutation.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="size-12 rounded-xl"
              disabled={!input.trim() || mutation.isPending}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      <Dialog open={!!errorDetails} onOpenChange={() => setErrorDetails(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Hiba részletei</DialogTitle>
          </DialogHeader>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-auto max-h-96 whitespace-pre-wrap wrap-break-word">
            {errorDetails}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  )
}
