import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mysolanaapp } from "../target/types/mysolanaapp";
import { SystemProgram } from "@solana/web3.js";
import { expect } from "chai";

describe("mysolanaapp", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Mysolanaapp as Program<Mysolanaapp>;

  // Set test account up here so both tests have access
  // it works because we're not doing PDA/CPI
  const baseAccount = anchor.web3.Keypair.generate(); 

  it("It initializes the account", async () => {
    const tx = await program.methods.initialize("Hello World")
      .accounts({
        // user and systemProgram are redundant
        baseAccount: baseAccount.publicKey,
      })
      .signers([baseAccount])
      .rpc();

    // Fetch the account and check the value of the count
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log('Initialized data: ', account.data);
    expect(account.data).to.equal("Hello World");
  });

  it("Updates a previously created account", async () => {
    const tx = await program.methods.update("Some new data")
      .accounts({
        baseAccount: baseAccount.publicKey,
      }) // don't need .signers next, so send it
      .rpc();

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
      console.log('Updated data: ', account.data);
      console.log('all account data: ', account);
      console.log('All data: ', account.dataList);
      expect(account.dataList.length).to.equal(2);
    });

    it("Updates a previously created account", async () => {
      const tx = await program.methods.update("Last new data")
        .accounts({
          baseAccount: baseAccount.publicKey,
        }) // don't need .signers next, so send it
        .rpc();
  
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
        console.log('Updated data: ', account.data);
        console.log('all account data: ', account);
        expect(account.dataList.length).to.equal(3);
      });
  });
