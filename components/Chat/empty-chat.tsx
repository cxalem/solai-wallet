import { User } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-2">
      <div className="p-4 rounded-full bg-zinc-700">
        <User size={24} />
      </div>
      <p>Start a conversation with the AI assistant</p>
    </div>
  );
}
