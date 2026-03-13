import { create } from "zustand"
import { Priority } from "@/components/priority-badge"
import { Message } from "@/components/message"

export type TicketHistoryItem = {
  id: string
  date: Date
  input: string
  priority?: Priority
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  type: "system",
  content: "Szia!",
  timestamp: new Date(),
}

type ChatHistoryStore = {
  messages: Message[]
  addMessage: (message: Message) => void
  history: TicketHistoryItem[]
  addTicket: (item: TicketHistoryItem) => void
}

export const useChatHistoryStore = create<ChatHistoryStore>((set) => ({
  messages: [WELCOME_MESSAGE],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  history: [],
  addTicket: (item) => set((state) => ({ history: [item, ...state.history] })),
}))
