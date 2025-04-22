"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/Cta";

export default function Home() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/wallet");
    }
  }, [ready, authenticated, router]);

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
