"use client"
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type BadgeVariant = "green" | "yellow" | "orange" | "red" | "link" | "default" | "secondary" | "destructive" | "outline" | "ghost"

export type Priority = "low" | "medium" | "high" | "critical"

const priorityConfig: Record<Priority, { label: string; variant: BadgeVariant }> = {
    low: {
        label: "Low Priority",
        variant: "green",
    },
    medium: {
        label: "Medium Priority",
        variant: "yellow",
    },
    high: {
        label: "High Priority",
        variant: "orange",
    },
    critical: {
        label: "Critical Priority",
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