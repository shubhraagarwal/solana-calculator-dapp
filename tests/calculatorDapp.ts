import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CalculatorDapp } from "../target/types/calculator_dapp";
import assert from "assert";

const { SystemProgram } = anchor.web3;

describe("calculatorDapp", async () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = await anchor.workspace.CalculatorDapp;
  const _calculator = calculator;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Adds two numbers", async function () {
    const calculator = _calculator;

    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Multiplies two numbers", async function () {
    const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Subtracts two numbers", async function () {
    const calculator = _calculator;

    await program.rpc.sub(new anchor.BN(23), new anchor.BN(22), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Divides two numbers", async function () {
    const calculator = _calculator;

    await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(3)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });
});
