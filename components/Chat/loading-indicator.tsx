import { Avatar } from "@/components/ui/avatar";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[80%]">
        <Avatar className="h-8 w-8 bg-zinc-700 flex items-center justify-center">
          <span className="text-xs text-zinc-100 font-medium">AI</span>
        </Avatar>
        <div className="p-3 rounded-lg bg-zinc-700 text-zinc-100 rounded-tl-none">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"></div>
            <div
              className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
