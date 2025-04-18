"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProgressBar } from "./progress-bar";
import { TransferForm, type ProcessedTransferData } from "./transfer-form";
import { TransferConfirmation } from "./transfer-confirmation";
import { ProcessingAnimation } from "./processing-animation";
import { TransactionResult } from "./transaction-result";
import { useSolanaWallets } from "@privy-io/react-auth";
import { Connection, PublicKey } from "@solana/web3.js";
import { buildUsdcTransferTx } from "./actions";

/* ------------------------------------------------------------------ */
/* Types & constants                                                  */
/* ------------------------------------------------------------------ */

type TransferStatus = "success" | "error" | null;
type Step = "form" | "confirm" | "processing" | "result";

const TITLES: Record<Step, string> = {
  form: "Transfer Funds",
  confirm: "Confirm Transfer",
  processing: "Processing Transaction",
  result: "Transfer Result",
};

const DESCRIPTIONS: Record<Step, string> = {
  form: "Enter recipient address and amount",
  confirm: "Verify the transfer details before signing",
  processing: "Please wait while your transaction is being processed",
  result: "Your transfer has been processed",
};

const STEP_INDEX: Record<Step, number> = {
  form: 1,
  confirm: 2,
  processing: 3,
  result: 4,
};

/* ------------------------------------------------------------------ */

export default function TransferModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);
  const [transferData, setTransferData] =
    useState<ProcessedTransferData | null>(null);
  const [transferStatus, setTransferStatus] = useState<TransferStatus>(null);

  const isProcessing = step === "processing";

  const { wallets } = useSolanaWallets();

  const wallet = wallets[0];

  /* ------------------------- Handlers ----------------------------- */

  const handleSubmit = useCallback((data: ProcessedTransferData) => {
    setTransferData(data);
    setStep("confirm");
  }, []);

  const handleSign = useCallback(
    async (data: ProcessedTransferData) => {
      try {
        setStep("processing");

        if (!wallet) throw new Error("Connect wallet first");
        if (!data) throw new Error("Missing transfer data");

        const connection = new Connection(
          process.env.NEXT_PUBLIC_GO_GETBLOCK_URL!,
          "confirmed"
        );

        const tx = await buildUsdcTransferTx(
          connection,
          new PublicKey(wallet.address),
          new PublicKey(data.walletAddress),
          data.amount
        );

        const signature = await wallet.sendTransaction(tx, connection, {
          maxRetries: 5,
        });
        setTransactionSignature(signature);
        setStep("result");
        setTransferStatus("success");
      } catch (error) {
        console.error(error);
        setTransferStatus("error");
      }
    },
    [wallet?.address]
  );

  const resetModal = useCallback(() => {
    setTransferData(null);
    setTransferStatus(null);
    setStep("form");
    setOpen(false);
  }, []);

  /* -------------------------- Render ------------------------------ */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ---------- Trigger ---------- */}
      <DialogTrigger asChild>
        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">
          <SendHorizontal className="mr-2 h-4 w-4" />
          Transfer
        </Button>
      </DialogTrigger>

      {/* ---------- Content ---------- */}
      <DialogContent className="max-w-md rounded-lg border border-gray-700 bg-gray-800 p-0 shadow-none">
        <Card className="w-full border-none bg-transparent shadow-none text-gray-100">
          {/* ---------- Header ---------- */}
          <CardHeader className="pb-2">
            <ProgressBar step={STEP_INDEX[step]} />
            <DialogTitle className="text-xl font-bold">
              {TITLES[step]}
            </DialogTitle>
            <CardDescription className="text-gray-400">
              {DESCRIPTIONS[step]}
            </CardDescription>
          </CardHeader>

          {/* ---------- Body ---------- */}
          <CardContent className="w-full">
            {step === "form" && <TransferForm onSubmit={handleSubmit} />}

            {step === "confirm" && transferData && (
              <TransferConfirmation transferData={transferData} />
            )}

            {step === "processing" && <ProcessingAnimation />}

            {step === "result" && (
              <TransactionResult
                transferStatus={transferStatus!}
                transferData={transferData}
                transactionId={transactionSignature!}
              />
            )}
          </CardContent>

          {/* ---------- Footer ---------- */}
          <CardFooter className="flex justify-between">
            {/* Left button / info */}
            {step === "form" && (
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            )}

            {step === "processing" && (
              <span className="w-full text-center text-sm text-gray-400">
                Transaction in progress…
              </span>
            )}

            {step !== "processing" && step !== "form" && (
              <Button
                variant="ghost"
                onClick={step === "result" ? resetModal : () => setStep("form")}
                className="cursor-pointer"
              >
                {step === "result" ? (
                  "New Transfer"
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </>
                )}
              </Button>
            )}

            {/* Right button */}
            {step === "confirm" && (
              <Button
                className="bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                onClick={() => {
                  if (!transferData) return;
                  handleSign(transferData);
                }}
                disabled={isProcessing}
              >
                Sign Transaction
              </Button>
            )}

            {step === "result" && (
              <Button
                variant="outline"
                onClick={resetModal}
                className="cursor-pointer text-neutral-800"
              >
                Close
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
