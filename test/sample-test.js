const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentManager", function () {
  it("Should return the new greeting once it's changed", async function () {
    const PaymentManager = await ethers.getContractFactory("PaymentManager");
    const greeter = await PaymentManager.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
