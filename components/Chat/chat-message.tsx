import { Avatar } from "@/components/ui/avatar";
import type { Message } from "@ai-sdk/react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Avatar
          className={`h-8 w-8 flex items-center justify-center text-zinc-100 ${
            message.role === "user" ? "bg-blue-500" : "bg-zinc-700"
          }`}
        >
          {message.role === "user" ? (
            <span className="text-xs font-medium">You</span>
          ) : (
            <span className="text-xs font-medium">AI</span>
          )}
        </Avatar>

        <div
          className={`p-3 rounded-lg ${
            message.role === "user"
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-zinc-700 text-zinc-100 rounded-tl-none"
          }`}
        >
          {message.parts?.map((part, i) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${i}`}
                    className="whitespace-pre-wrap"
                  >
                    {part.text}
                  </div>
                );
              default:
                return null;
            }
          })}
          <div className="text-xs opacity-70 mt-1 text-right">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
