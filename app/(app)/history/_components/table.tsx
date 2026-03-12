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

import { Priority } from "@/components/priority-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type TicketItem = {
    id: string
    date: Date
    input: string
    priority?: Priority
}

const columns: ColumnDef<TicketItem>[] = [
    {
        accessorKey: "date",
        header: "Dátum",
        cell: ({ row }) => row.original.date.toLocaleString(),
    },
    {
        accessorKey: "input",
        header: "Ticket",
        cell: ({ row }) => (
            <span className="line-clamp-2 max-w-md">{row.original.input}</span>
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

export function HistoryTable({ data }: { data: TicketItem[] }) {
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
