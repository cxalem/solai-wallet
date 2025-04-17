import { ChatMessage } from "./chat-message";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { EmptyChat } from "./empty-chat";
import { LoadingIndicator } from "./loading-indicator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Message } from "@ai-sdk/react";
import type { ChangeEvent, FormEvent, RefObject } from "react";

interface ChatContainerProps {
  messages: Message[]
  input: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messagesEndRef: RefObject<HTMLDivElement>
}

export function ChatContainer({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messagesEndRef,
}: ChatContainerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-900 text-zinc-100">
      <Card className="w-full max-w-2xl shadow-lg border-zinc-800 bg-zinc-800 max-h-[60vh]">
        <ChatHeader />

        <CardContent className="p-0">
          <div className="h-[30vh] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <EmptyChat />
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} />)
            )}

            {isLoading && <LoadingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="border-t border-zinc-700">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
