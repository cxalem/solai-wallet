"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function getSession(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl");

  const cookieAuthToken = request.cookies.get("privy-token");
  const cookieSession = request.cookies.get("privy-session");

  if (!cookieAuthToken || !cookieSession) {
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect(redirectUrl || "/wallet");
}
