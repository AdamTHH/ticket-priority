"use client"
import { cn } from "@/lib/utils";
import { Priority } from "./Priority";
import { Badge } from "@/components/ui/badge";

type BadgeVariant = "green" | "yellow" | "orange" | "red" | "link" | "default" | "secondary" | "destructive" | "outline" | "ghost"

const priorityConfig: Record<Priority, { label?: string; variant: BadgeVariant }> = {
    "Alacsony": {
        label: "Alacsony",
        variant: "green",
    },
    "Közepes": {
        label: "Közepes",
        variant: "yellow",
    },
    "Magas": {
        label: "Magas",
        variant: "orange",
    },
    "Kritikus": {
        label: "Kritikus",
        variant: "red",
    },
}

export const PriorityBadge = ({ text }: { text: Priority }) => {
    const config = priorityConfig[text] ?? { variant: "default" }
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