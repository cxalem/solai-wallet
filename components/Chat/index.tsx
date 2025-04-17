"use client";

import { useChat } from "@ai-sdk/react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChatContainer } from "@/components/Chat/chat-container";
import { LoadingScreen } from "@/components/Chat/loading-screen";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const { authenticated, ready } = usePrivy();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [authenticated, router, ready]);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <ChatContainer
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
    />
  );
}
