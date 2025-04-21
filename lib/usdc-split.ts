import { Program, Idl } from "@coral-xyz/anchor";

export interface UsdcSplit extends Idl {
  version: string;
  name: string;
  address: string;
  metadata: {
    name: string;
    spec: string;
    version: string;
  };
  instructions: [
    {
      name: "split_usdc";
      accounts: [];
      args: [
        { name: "total_amount"; type: "u64" },
        { name: "recipients"; type: { vec: "pubkey" } },
        { name: "percentages"; type: { vec: "u8" } }
      ];
      discriminator: number[];
    }
  ];
  events: [
    {
      name: "UsdcSplit";
      fields: [
        { name: "total_amount"; type: "u64" },
        { name: "recipients"; type: { vec: "pubkey" } },
        { name: "amounts"; type: { vec: "u64" } }
      ];
      discriminator: number[];
    }
  ];
  errors: [
    { code: 6000; name: "RecipientCountMismatch"; msg: string },
    { code: 6001; name: "InvalidPercentageTotal"; msg: string }
  ];
}

export type UsdcSplitProgram = Program<UsdcSplit>; 