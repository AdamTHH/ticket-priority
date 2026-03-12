import { cn } from "@/lib/utils"
import { Priority, PriorityBadge } from "./priority-badge"

export type Message = {
    id: string
    type: "user" | "system"
    content: string
    priority?: Priority
    timestamp: Date
}

export const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.type === "user"

    return (
        <div className={cn(
            "flex gap-3",
            isUser ? "justify-end" : "justify-start"
        )}
        >
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
                        <PriorityBadge text={message.priority} />
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