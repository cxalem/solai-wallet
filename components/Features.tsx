"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Shield, Clock, DollarSign } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-purple-400" />,
      title: "One Transaction",
      description: "Split USDC payments to multiple recipients with just a single transaction on Solana.",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "Secure & On-Chain",
      description: "All payment splits are executed securely on-chain with full transparency.",
    },
    {
      icon: <Clock className="h-10 w-10 text-purple-400" />,
      title: "Save Time",
      description: "No need to send multiple transactions. Save time with automated payment splitting.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-purple-400" />,
      title: "Reduce Fees",
      description: "Pay less in transaction fees by consolidating multiple payments into one.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Why choose SolAI?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our payment splitter makes managing multiple payments easier than ever before on Solana.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-purple-900/20 to-black/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)" }}
            >
              <div className="bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
