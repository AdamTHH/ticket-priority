"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { ArrowUpDown } from "lucide-react"

import { PriorityBadge } from "@/components/priority-badge"
import { TicketHistoryItem } from "@/store/chat-history"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const columns: ColumnDef<TicketHistoryItem>[] = [
    {
        accessorKey: "date",
        header: "Dátum",
        cell: ({ row }) => row.original.date.toLocaleString(),
    },
    {
        accessorKey: "input",
        header: "Ticket",
        cell: ({ row }) => (
            <Textarea
                value={row.original.input}
                className="w-full rounded-xl bg-muted/50 px-4 py-3"
                rows={1}
                readOnly
            />
        ),
    },
    {
        accessorKey: "priority",
        header: "Prioritás",
        cell: ({ row }) =>
            row.original.priority ? (
                <PriorityBadge text={row.original.priority} />
            ) : (
                <span className="text-muted-foreground text-sm">—</span>
            ),
    },
]

export function HistoryTable({ data }: { data: TicketHistoryItem[] }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: { sorting },
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                            No tickets yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
