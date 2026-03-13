import { cn } from "@/lib/utils"
import { Priority, PriorityBadge } from "./priority-badge"

export type Message = {
    id: string
    type: "user" | "system"
    content: string
    priority?: Priority
    timestamp: Date
    errorDetails?: string
}

export const ChatMessage = ({
    message,
    onShowError,
}: {
    message: Message
    onShowError?: (details: string) => void
}) => {
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
                {message.errorDetails && onShowError && (
                    <button
                        onClick={() => onShowError(message.errorDetails!)}
                        className="text-xs mt-1 text-destructive underline underline-offset-2 hover:opacity-80"
                    >
                        Részletek megtekintése
                    </button>
                )}
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
