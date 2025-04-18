import { USDC_MINT_ADDRESS } from "@/lib/constants";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

/**
 * Build an unsigned USDC transfer‑transaction that a wallet can sign.
 *
 * @param connection  An existing RPC connection.
 * @param sender      The sender’s public key (the wallet that will pay the fee).
 * @param recipient   The receiver’s public key.
 * @param amountUi    Amount in “UI units” (e.g. 12.3 USDC, **not** 12_300_000).
 * @returns           A fully‑formed, **unsigned** Transaction object.
 */
export async function buildUsdcTransferTx(
  connection: Connection,
  sender: PublicKey,
  recipient: PublicKey,
  amountUi: number
): Promise<Transaction> {
  const usdcMint = new PublicKey(USDC_MINT_ADDRESS);

  /* ------------------------------------------------------------------ */
  /* Derive (or create) associated‑token accounts                       */
  /* ------------------------------------------------------------------ */

  const senderAta = await getAssociatedTokenAddress(usdcMint, sender);
  const recipientAta = await getAssociatedTokenAddress(usdcMint, recipient);

  const tx = new Transaction();

  // If the recipient has no USDC ATA yet, create it — the sender pays.
  const recipientInfo = await connection.getAccountInfo(recipientAta);
  if (!recipientInfo) {
    tx.add(
      createAssociatedTokenAccountInstruction(
        sender, // payer (will sign)
        recipientAta,
        recipient,
        usdcMint
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Transfer instruction                                               */
  /* ------------------------------------------------------------------ */

  const amountRaw = BigInt(Math.round(amountUi * 1e6)); // 1 000 000 = USDC decimals (6)
  tx.add(
    createTransferInstruction(
      senderAta,
      recipientAta,
      sender,
      Number(amountRaw) // SPL‑token helpers accept number | bigint
    )
  );

  /* ------------------------------------------------------------------ */
  /* Recent blockhash & fee payer                                       */
  /* ------------------------------------------------------------------ */

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("finalized");

  tx.recentBlockhash = blockhash;
  tx.lastValidBlockHeight = lastValidBlockHeight;
  tx.feePayer = sender;

  return tx; // <-- unsigned: ready for wallet.signTransaction(...)
}
