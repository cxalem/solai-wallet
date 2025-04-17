import Chat from "@/components/Chat";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WalletPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("privy-token");

  if (!token) {
    redirect("/");
  }

  return (
    <section className="flex flex-col justify-between min-h-[calc(100vh-100px)]">
      <h1>Hello</h1>
      <Chat />
    </section>
  );
}
