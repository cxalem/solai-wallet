"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "Connect wallet",
      description: "Connect your Solana wallet to the SolAI platform.",
    },
    {
      number: "02",
      title: "Set recipients",
      description: "Add multiple recipient addresses and specify the percentage or amount each should receive.",
    },
    {
      number: "03",
      title: "Send USDC",
      description: "Send a single USDC transaction that will be automatically split among all recipients.",
    },
    {
      number: "04",
      title: "Track payments",
      description: "Monitor all your split payments in one cute dashboard.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">Split your USDC payments in just a few simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 hidden lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-gradient-to-b from-purple-900/20 to-black/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 h-full"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)" }}
              >
                <div className="relative mb-12">
                  {" "}
                  {/* Increased margin-bottom from mb-6 to mb-12 */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold z-10 lg:z-20">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
