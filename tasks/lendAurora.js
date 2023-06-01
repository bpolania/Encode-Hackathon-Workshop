// tasks/lendAurora.js
const { task } = require("hardhat/config");
const { ethers } = require("hardhat");

task("lendAurora", "Calls the lendAurora function on the LoanRequest contract")
    .addParam("contract", "The address of the LoanRequest contract")
    .setAction(async taskArgs => {
        const { contract } = taskArgs;
        const Contract = await ethers.getContractFactory("LoanRequest");
        const instance = Contract.attach(contract);

        const tx = await instance.lendAurora({value: ethers.utils.parseEther("2.0")}); // Assumes 2 ether as loanAmount
        await tx.wait();

        console.log(`Called lendAurora on contract: ${contract}`);
    });
