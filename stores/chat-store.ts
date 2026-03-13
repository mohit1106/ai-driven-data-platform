import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  chatOpen: boolean;
  addMessage: (role: "user" | "assistant", content: string) => string;
  updateMessage: (id: string, content: string) => void;
  setStreaming: (streaming: boolean) => void;
  setChatOpen: (open: boolean) => void;
  clearMessages: () => void;
}

let counter = 0;

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  chatOpen: false,
  addMessage: (role, content) => {
    const id = `msg-${++counter}-${Date.now()}`;
    set((state) => ({
      messages: [
        ...state.messages,
        { id, role, content, timestamp: Date.now() },
      ],
    }));
    return id;
  },
  updateMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content } : m
      ),
    })),
  setStreaming: (streaming) => set({ isStreaming: streaming }),
  setChatOpen: (open) => set({ chatOpen: open }),
  clearMessages: () => set({ messages: [] }),
}));
