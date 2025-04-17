import Chat from "@/components/Chat";
import { Wallet } from "@/components/Wallet";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WalletPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("privy-token");

  if (!token) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-100px)] pt-4 max-w-7xl mx-auto gap-6">
      <section>
        <Wallet />
      </section>
      <Chat />
    </div>
  );
}
