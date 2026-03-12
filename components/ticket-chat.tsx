"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Priority = "low" | "medium" | "high" | "critical"

interface Message {
  id: string
  type: "user" | "system"
  content: string
  priority?: Priority
  timestamp: Date
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "Low",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  high: {
    label: "High",
    className: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  },
  critical: {
    label: "Critical",
    className: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  },
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority]
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border",
        config.className
      )}
    >
      {config.label} Priority
    </span>
  )
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.type === "user"

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        {message.priority && (
          <div className="mb-2">
            <PriorityBadge priority={message.priority} />
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p
          className={cn(
            "text-xs mt-1.5",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}

export function TicketChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "Paste a ticket description below and I'll analyze its priority level.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }, [input])

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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

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
        content: "Sorry, there was an error analyzing your ticket. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing ticket...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your ticket description here..."
              className="w-full resize-none rounded-xl border bg-muted/50 px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[48px] max-h-[150px]"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
