import { useWallet } from "@solana/wallet-adapter-react";
import { Program, Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useState } from "react";
import { UsdcSplit, UsdcSplitProgram } from "../types/usdc-split";
import { IDL, PROGRAM_ID } from "../constants";

export function useUsdcSplit() {
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const splitUsdc = useCallback(
    async (totalAmount: number, recipients: string[], percentages: number[]) => {
      if (!publicKey || !signTransaction) {
        setError("Wallet not connected");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Convert inputs
        const amount = Math.floor(totalAmount * 1_000_000); // USDC has 6 decimals
        const recipientPubkeys = recipients.map((addr) => new PublicKey(addr));

        // Initialize program
        const provider = new Provider(window.solana, {
          preflightCommitment: "confirmed",
        });
        const program = new Program(IDL as UsdcSplit, PROGRAM_ID, provider) as UsdcSplitProgram;

        // Call the program
        const tx = await program.methods
          .split_usdc(
            new anchor.BN(amount),
            recipientPubkeys,
            percentages
          )
          .rpc();

        // Listen for the event
        const connection = program.provider.connection;
        const eventParser = new anchor.EventParser(program.programId, new anchor.BorshCoder(program.idl));
        
        const txInfo = await connection.getTransaction(tx, {
          commitment: "confirmed",
        });

        const events = eventParser.parseLogs(txInfo.meta.logMessages);
        const splitEvent = events.find((event) => event.name === "UsdcSplit");

        if (!splitEvent) {
          throw new Error("Split event not found");
        }

        return {
          tx,
          amounts: splitEvent.data.amounts.map((a: anchor.BN) => a.toNumber() / 1_000_000),
        };
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [publicKey, signTransaction]
  );

  return { splitUsdc, loading, error };
} 