import { CardHeader, CardTitle } from "@/components/ui/card";

export function ChatHeader() {
  return (
    <CardHeader className="border-b border-zinc-700">
      <CardTitle className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <h2 className="text-zinc-100">AI Chat Assistant</h2>
      </CardTitle>
    </CardHeader>
  );
}
