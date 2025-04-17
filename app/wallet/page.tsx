import Chat from "@/components/Chat";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WalletPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("privy-token");

  if (!token) {
    redirect("/");
  }

  return <Chat />;
}
