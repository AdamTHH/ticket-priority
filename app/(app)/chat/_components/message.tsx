"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Priority } from "./Priority"
import { ProbabilityLine } from "./probability-line"
import { PriorityBadge } from "./priority-badge"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export type Message = {
    id: string
    type: "user" | "system"
    content: string
    priority?: Priority
    timestamp: Date

    features?: {
        priority?: Priority

        priorityLowProbability?: number
        priorityMediumProbability?: number
        priorityHighProbability?: number
        priorityCriticalProbability?: number

        errorDetails?: string
    }
}

export const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.type === "user"
    const [errorOpen, setErrorOpen] = useState(false)

    return (
        <>
            <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
                <div
                    className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 space-y-3",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted rounded-bl-md"
                    )}
                >
                    {message.priority && (
                        <PriorityBadge text={message.priority} />
                    )}

                    <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                    </p>

                    {!isUser && message.features && (message.features.priorityLowProbability != null || message.features.priorityMediumProbability != null || message.features.priorityHighProbability != null || message.features.priorityCriticalProbability != null) && (
                        <div className="flex flex-col gap-1.5">
                            {message.features.priorityLowProbability && <ProbabilityLine value={message.features.priorityLowProbability} label="Alacsony" />}
                            {message.features.priorityMediumProbability && <ProbabilityLine value={message.features.priorityMediumProbability} label="Közepes" />}
                            {message.features.priorityHighProbability && <ProbabilityLine value={message.features.priorityHighProbability} label="Magas" />}
                            {message.features.priorityCriticalProbability && <ProbabilityLine value={message.features.priorityCriticalProbability} label="Kritikus" />}
                        </div>
                    )}

                    {message.features?.errorDetails && (
                        <Label
                            onClick={() => setErrorOpen(true)}
                            className="text-xs text-destructive underline underline-offset-2 w-min whitespace-nowrap hover:opacity-80"
                        >
                            Részletek megtekintése
                        </Label>
                    )}

                    <p className={cn("text-xs", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                </div>
            </div>

            {message.features?.errorDetails && (
                <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Hiba részletei</DialogTitle>
                        </DialogHeader>
                        <pre className="rounded-md bg-muted p-4 text-xs overflow-auto max-h-96 whitespace-pre-wrap wrap-break-word">
                            {message.features.errorDetails}
                        </pre>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
