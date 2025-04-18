"use client";

import { Suspense, useState } from "react";
import { useSolanaWallets } from "@privy-io/react-auth";
import { getUsdcBalance } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletSkeleton } from "./wallet-skeleton";
import { Copy, Check, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import TransferModal from "@/components/TransferModal";

// Assuming 1 USDC = $1 (this is generally true as USDC is a stablecoin)
const USDC_TO_USD_RATE = 1;

function truncateAddress(address: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function WalletContent() {
  const { wallets } = useSolanaWallets();
  const [copied, setCopied] = useState(false);

  const walletAddress = wallets[0]?.address || "";

  const {
    data: usdcBalance,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "usdcBalance",
      {
        walletAddress,
      },
    ],
    queryFn: () => getUsdcBalance({ wallet_address: walletAddress }),
    refetchInterval: 60000,
  });

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <WalletSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card className="w-full bg-zinc-900 border-zinc-700">
          <CardContent className="py-3">
            <p className="text-red-500">Error: {error.message}</p>
          </CardContent>
        </Card>
        <Button disabled className="w-full">
          Transfer
        </Button>
      </div>
    );
  }

  // Format the USDC balance to max 3 decimal places
  const formattedUsdcBalance = Number.parseFloat(usdcBalance || "0").toFixed(3);
  // Calculate USD value (assuming 1:1 for USDC to USD as it's a stablecoin)
  const usdValue = (
    Number.parseFloat(usdcBalance || "0") * USDC_TO_USD_RATE
  ).toFixed(2);

  return (
    <div className="space-y-4">
      <Card className="w-full bg-zinc-800 border-zinc-700">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-zinc-800 border border-zinc-700">
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-xl text-white">My Wallet</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm text-zinc-400">
                    {truncateAddress(walletAddress)}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-xl text-white">${usdValue}</p>
              <p className="text-sm text-zinc-400">
                {formattedUsdcBalance} USDC
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <TransferModal />
    </div>
  );
}

export function Wallet() {
  return (
    <Suspense fallback={<WalletSkeleton />}>
      <WalletContent />
    </Suspense>
  );
}
