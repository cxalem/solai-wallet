import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export declare interface UsdcSplitProgram extends Program<UsdcSplit> {}

export declare interface UsdcSplit extends anchor.Idl {
  version: string;
  name: string;
  instructions: {
    name: string;
    accounts: never[];
    args: (
      | { name: string; type: string }
      | { name: string; type: { vec: string } }
    )[];
  }[];
  metadata: anchor.IdlMetadata;
  events: {
    name: string;
    fields: {
      name: string;
      type: string | { vec: string };
      index: boolean;
    }[];
  }[];
  errors: {
    code: number;
    name: string;
    msg: string;
  }[];
}

export declare type SplitUsdcAccounts = {};

export declare type SplitUsdcArgs = {
  totalAmount: anchor.BN;
  recipients: PublicKey[];
  percentages: number[];
};

export declare type UsdcSplitEvent = {
  totalAmount: anchor.BN;
  recipients: PublicKey[];
  amounts: anchor.BN[];
};

export declare const IDL: UsdcSplit;
