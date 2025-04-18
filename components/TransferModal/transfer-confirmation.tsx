import type { ProcessedTransferData } from "./transfer-form";

interface TransferConfirmationProps {
  transferData: ProcessedTransferData;
}

export function TransferConfirmation({
  transferData,
}: TransferConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-700 p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Recipient:</span>
          <span className="text-gray-100 font-mono text-sm truncate max-w-[200px]">
            {transferData.walletAddress}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Amount:</span>
          <span className="text-gray-100 font-mono">
            {typeof transferData.amount === "number"
              ? transferData.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })
              : "0.000000"}{" "}
            SOL
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Network Fee:</span>
          <span className="text-gray-100 font-mono">~0.000005 SOL</span>
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
        <p className="text-gray-300 text-sm">
          Please verify all details before signing the transaction. Once signed,
          this transaction cannot be reversed.
        </p>
      </div>
    </div>
  );
}
