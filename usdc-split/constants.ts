import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey("7JP1EJH9kP1MQhnCJZztpikJaQpJB5g5bNr1z1fQcQaP");

export const IDL = {
  "address": "7JP1EJH9kP1MQhnCJZztpikJaQpJB5g5bNr1z1fQcQaP",
  "instructions": [
    {
      "accounts": [],
      "args": [
        {
          "name": "total_amount",
          "type": "u64"
        },
        {
          "name": "recipients",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "percentages",
          "type": {
            "vec": "u8"
          }
        }
      ],
      "discriminator": [65, 141, 131, 36, 72, 133, 101, 245],
      "name": "split_usdc"
    }
  ],
  "metadata": {
    "name": "usdc_split",
    "spec": "0.1.0",
    "version": "0.1.0"
  }
}; 