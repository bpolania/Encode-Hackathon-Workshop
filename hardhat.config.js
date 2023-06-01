require("@nomicfoundation/hardhat-toolbox");
// hardhat.config.js

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

module.exports = {
    solidity: "0.8.4",
};

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;
const AURORA_PLUS_KEY = process.env.AURORA_PLUS_KEY;
module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet: {
      url: `https://mainnet.aurora.dev/${AURORA_PLUS_KEY}`,
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161554,
    },
    testnet: {
      url: `https://testnet.aurora.dev/${AURORA_PLUS_KEY}`,
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161555,
    },
    hackathon_silo: {
      url: 'http://hackathon.aurora.dev',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161558,
    },
    local: {
      url: 'http://localhost:8545',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161555,
      gasPrice: 120 * 1000000000
    },
  }
};