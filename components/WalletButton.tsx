"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";
import { useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { truncateAddress } from "@/lib/truncateAddress";

export function WalletButton() {
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useSolanaWallets();
  const [isHovering, setIsHovering] = useState(false);

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  // Disable logout when Privy is not ready or the user is not authenticated
  const showLogout = ready && authenticated;

  if (!ready) {
    return (
      <button
        disabled
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </button>
    );
  }

  if (showLogout) {
    return (
      <button
        onClick={logout}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative group overflow-hidden px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          {isHovering ? (
            <span>Disconnect</span>
          ) : (
            <span>
              {wallets[0]?.address
                ? truncateAddress(wallets[0].address)
                : "Connected"}
            </span>
          )}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    );
  }

  return (
    <button
      disabled={disableLogin}
      onClick={login}
      className="relative overflow-hidden px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </div>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
    </button>
  );
}
