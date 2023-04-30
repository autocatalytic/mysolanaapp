import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mysolanaapp } from "../target/types/mysolanaapp";
import { SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("mysolanaapp", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Mysolanaapp as Program<Mysolanaapp>;

  const baseAccount = anchor.web3.Keypair.generate(); // test counter account

  it("Creates a counter", async () => {
    /* Call the create function via RPC */

    const tx = await program.methods.create()
      .accounts({
        // user: provider.wallet.publicKey,         // Redundant, OK with derive(Accounts) only
        // systemProgram: SystemProgram.programId,  // same
        baseAccount: baseAccount.publicKey,
      })
      .signers([baseAccount])
      .rpc();

    // Fetch the account and check the value of the count
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    // console.log('Counter count: ', account.count.toNumber());
    expect(account.count.toNumber()).to.equal(0);
  });

  it("Increments the counter", async () => {
    const tx = await program.methods.increment()
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
//      .signers([baseAccount])
      .rpc();

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
      expect(account.count.toNumber()).to.equal(1);
  });
});
