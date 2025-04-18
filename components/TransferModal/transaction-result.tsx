"use client";

import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import type { ProcessedTransferData } from "./transfer-form";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TransactionResultProps {
  transferStatus: "success" | "error";
  transferData: ProcessedTransferData | null;
  transactionId: string;
}

export function TransactionResult({
  transferStatus,
  transferData,
  transactionId,
}: TransactionResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {transferStatus === "success" ? (
        <>
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-100 mb-2">
            Transfer Complete
          </h3>
          <p className="text-gray-400 text-center mb-4">
            Your transfer of{" "}
            {typeof transferData?.amount === "number"
              ? transferData.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })
              : "0.000000"}{" "}
            SOL has been successfully processed.
          </p>
          <div className="bg-gray-700 rounded p-3 w-full max-w-sm md:max-w-md text-center">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm mr-2">
                Transaction ID:
              </span>
              <div className="flex items-center justify-between flex-1">
                <p className="text-gray-300 text-sm max-w-[120px] md:max-w-[260px] font-mono truncate">
                  {transactionId}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy transaction ID"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-100 mb-2">
            Transfer Failed
          </h3>
          <p className="text-gray-400 text-center mb-4">
            There was an error processing your transfer. Please try again.
          </p>
          <div className="bg-gray-700 rounded p-3 w-full">
            <p className="text-gray-300 text-sm">
              Error: Insufficient funds or network congestion. Please check your
              balance and try again later.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
