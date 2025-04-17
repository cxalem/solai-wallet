import Link from "next/link";
import { WalletButton } from "@/components/WalletButton";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent text-2xl font-bold">
              SolAI Wallet
            </div>
          </Link>

          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
