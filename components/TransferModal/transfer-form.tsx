"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema with Zod
const transferSchema = z.object({
  walletAddress: z
    .string()
    .min(1, "Wallet address is required")
    .regex(
      /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
      "Invalid Solana wallet address format"
    ),
  amount: z.union([
    z.string().min(0), // Empty string or string value
    z
      .number()
      .positive("Amount must be positive")
      .min(0.000001, "Minimum amount is 0.000001"),
  ]),
});

// Define a proper type for our form values
export type TransferFormValues = {
  walletAddress: string;
  amount: string | number;
};

// Define a type for processed transfer data (after submission)
export type ProcessedTransferData = {
  walletAddress: string;
  amount: number;
};

interface TransferFormProps {
  onSubmit: (data: ProcessedTransferData) => void;
}

export function TransferForm({ onSubmit }: TransferFormProps) {
  // Initialize form with defined values to ensure inputs remain controlled
  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      walletAddress: "",
      amount: "", // String for the input field
    },
  });

  // Handle form submission
  function handleSubmit(data: TransferFormValues) {
    // Convert amount to number for processing
    const formattedData: ProcessedTransferData = {
      walletAddress: data.walletAddress,
      amount:
        typeof data.amount === "string"
          ? Number.parseFloat(data.amount) || 0
          : data.amount,
    };
    onSubmit(formattedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Recipient Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Solana address..."
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Enter the recipient&apos;s wallet address
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  {...field}
                  value={field.value === undefined ? "" : field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : value);
                  }}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Enter the amount you want to transfer
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
