"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { Priority, PriorityBadge } from "./priority-badge"
import { ChatMessage, Message } from "./message"

export function TicketChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome2",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome3",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome4",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome5",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome6",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome7",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome8",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome9",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
    {
      id: "welcome10",
      type: "system",
      content:
        "Szia!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function analyzePriority(ticketText: string): Promise<{
    priority: Priority
    explanation: string
  }> {
    // Simulated analysis - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const text = ticketText.toLowerCase()

    // Critical indicators
    if (
      text.includes("down") ||
      text.includes("outage") ||
      text.includes("emergency") ||
      text.includes("security breach") ||
      text.includes("data loss") ||
      text.includes("production")
    ) {
      return {
        priority: "critical",
        explanation:
          "This ticket indicates a critical system issue that requires immediate attention. Production systems or security may be impacted.",
      }
    }

    // High priority indicators
    if (
      text.includes("urgent") ||
      text.includes("broken") ||
      text.includes("not working") ||
      text.includes("blocked") ||
      text.includes("asap") ||
      text.includes("deadline")
    ) {
      return {
        priority: "high",
        explanation:
          "This ticket describes an issue causing significant impact to users or workflows. Should be addressed soon.",
      }
    }

    // Medium priority indicators
    if (
      text.includes("slow") ||
      text.includes("issue") ||
      text.includes("problem") ||
      text.includes("error") ||
      text.includes("bug") ||
      text.includes("incorrect")
    ) {
      return {
        priority: "medium",
        explanation:
          "This ticket describes a moderate issue that affects functionality but has workarounds available.",
      }
    }

    // Default to low
    return {
      priority: "low",
      explanation:
        "This ticket describes a minor issue or feature request that can be addressed in the normal workflow.",
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const result = await analyzePriority(userMessage.content)

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: result.explanation,
        priority: result.priority,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, systemMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: "Valami hiba történt a jegy elemzése közben. Kérlek, próbáld újra.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto p-4 space-y-4">

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <ChatMessage key={Date.now().toString()} message={{
            id: (Date.now() + 1).toString(),
            type: "system",
            content: "Betöltés...",
            timestamp: new Date(),
          }} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
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
              className="w-full resize-none rounded-xl border bg-muted/50 px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[48px] max-h-[150px]"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="size-12 rounded-xl shrink-0"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
