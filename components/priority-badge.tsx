"use client"
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type BadgeVariant = "green" | "yellow" | "orange" | "red" | "link" | "default" | "secondary" | "destructive" | "outline" | "ghost"

export type Priority = "low" | "medium" | "high" | "critical"

const priorityConfig: Record<Priority, { label: string; variant: BadgeVariant }> = {
    low: {
        label: "Alacsony",
        variant: "green",
    },
    medium: {
        label: "Közepes",
        variant: "yellow",
    },
    high: {
        label: "Magas",
        variant: "orange",
    },
    critical: {
        label: "Kritikus",
        variant: "red",
    },
}

export const PriorityBadge = ({ text }: { text: Priority }) => {
    const config = priorityConfig[text]
    return (
        <Badge
            variant={config.variant}
            className={cn(
                "rounded-md p-2.5"
                // "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border",
            )}
        >
            {config.label}
        </Badge>
    )
}