"use client";

import { useLogin } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { login } = useLogin();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-900/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-b from-purple-900/30 to-black/60 backdrop-blur-md p-12 rounded-3xl border border-purple-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <div className="text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to simplify your USDC payments?
            </motion.h2>
            <motion.p
              className="text-white/70 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join half a dozen of users who are already saving time and
              reducing fees with our Solana payment splitter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-xl text-lg"
                size="lg"
                onClick={login}
              >
                Launch app now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
