"use server";

import { USDC_MINT_ADDRESS } from "@/lib/constants";
import { Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

export const getUsdcBalance = async ({
  wallet_address,
}: {
  wallet_address: string;
}) => {
  const connection = new Connection(
    `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    "confirmed"
  );
  const publicKey = new PublicKey(wallet_address);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { mint: new PublicKey(USDC_MINT_ADDRESS) }
  );

  const usdcBalance = tokenAccounts.value[0]
    ? tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
    : 0;

  return usdcBalance || 0;
};
