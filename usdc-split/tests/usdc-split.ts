import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from '@solana/web3.js';
import { UsdcSplit } from "../target/types/usdc_split";
import { expect } from 'chai';

describe("usdc-split", () => {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.UsdcSplit as Program<UsdcSplit>;

  it("Splits USDC amount correctly", async () => {
    // Generate some test recipient addresses
    const recipients = [
      anchor.web3.Keypair.generate().publicKey,
      anchor.web3.Keypair.generate().publicKey,
      anchor.web3.Keypair.generate().publicKey,
    ];

    // Test with simple percentages that add up to 100
    const percentages = [50, 30, 20];
    const totalAmount = new anchor.BN(1000000); // 1 USDC (6 decimals)

    try {
      // Call the split_usdc instruction
      const tx = await program.methods
        .split_usdc( // Updated to match on-chain name
          totalAmount,
          recipients,
          percentages,
        )
        .accounts({
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("Transaction signature:", tx);

      // Verify the transaction was successful
      const txInfo = await provider.connection.getTransaction(tx, {
        commitment: "confirmed",
      });

      // Check for the emitted event
      const eventParser = new anchor.EventParser(program.programId, new anchor.BorshCoder(program.idl));
      const events = eventParser.parseLogs(txInfo.meta.logMessages);
      
      const splitEvent = events.find((event) => event.name === "UsdcSplit");
      expect(splitEvent).to.not.be.undefined;
      
      // Verify event data
      expect(splitEvent.data.total_amount.toString()).to.equal(totalAmount.toString());
      expect(splitEvent.data.recipients.map(r => r.toString()))
        .to.deep.equal(recipients.map(r => r.toString()));
      expect(splitEvent.data.amounts.map(a => a.toString()))
        .to.deep.equal(['500000', '300000', '200000']); // 50%, 30%, 20% of 1000000

    } catch (err) {
      console.error("Transaction failed:", err);
      throw err;
    }
  });

  it("Fails when percentages don't sum to 100", async () => {
    const recipients = [
      anchor.web3.Keypair.generate().publicKey,
      anchor.web3.Keypair.generate().publicKey,
    ];
    const percentages = [50, 40]; // Only sums to 90
    const totalAmount = new anchor.BN(1000000);

    try {
      await program.methods
        .split_usdc( // Updated to match on-chain name
          totalAmount,
          recipients,
          percentages,
        )
        .accounts({
          authority: provider.wallet.publicKey,
        })
        .rpc();
      
      // Should not reach here
      expect.fail("Expected transaction to fail");
    } catch (err) {
      expect(err.error.errorCode.code).to.equal("InvalidPercentageTotal");
    }
  });

  it("Fails when recipients and percentages length mismatch", async () => {
    const recipients = [
      anchor.web3.Keypair.generate().publicKey,
      anchor.web3.Keypair.generate().publicKey,
    ];
    const percentages = [50, 30, 20]; // 3 percentages for 2 recipients
    const totalAmount = new anchor.BN(1000000);

    try {
      await program.methods
        .split_usdc( // Updated to match on-chain name
          totalAmount,
          recipients,
          percentages,
        )
        .accounts({
          authority: provider.wallet.publicKey,
        })
        .rpc();
      
      // Should not reach here
      expect.fail("Expected transaction to fail");
    } catch (err) {
      expect(err.error.errorCode.code).to.equal("RecipientCountMismatch");
    }
  });
});
