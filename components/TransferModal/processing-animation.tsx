import { Loader2 } from "lucide-react";

export function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
        </div>

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 bg-purple-500 rounded-full animate-ping"
            style={{
              top: `calc(50% + ${30 * Math.sin((i * Math.PI) / 3)}px)`,
              left: `calc(50% + ${30 * Math.cos((i * Math.PI) / 3)}px)`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.5s",
            }}
          ></span>
        ))}
      </div>

      <h3 className="text-xl font-medium text-gray-100 mt-6 mb-2">
        Processing Transaction
      </h3>
      <p className="text-gray-400 text-center mb-4">
        Your transaction is being processed on the Solana network. This may take
        a few moments.
      </p>
      <div className="w-full max-w-xs bg-gray-700 rounded-full h-1.5 mb-4 overflow-hidden">
        <div className="bg-purple-500 h-1.5 rounded-full animate-pulse-width"></div>
      </div>
      <p className="text-gray-500 text-sm">Please do not close this window</p>
    </div>
  );
}
