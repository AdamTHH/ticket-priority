"use client"

import { useChatHistoryStore } from "@/store/chat-history"
import { HistoryTable } from "./_components/table"

export default function Page() {
  const history = useChatHistoryStore((s) => s.history)

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold">Előzmények</h1>
      <div className="border-2 rounded-md">
        <HistoryTable data={history} />
      </div>
    </div>
  )
}