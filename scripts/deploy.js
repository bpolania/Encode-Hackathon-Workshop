// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("HackCoin");
  const token = await Token.deploy();

  await token.mint(deployer.address, ethers.utils.parseEther("1000"));

  console.log("HackCoin deployed to:", token.address);

  const LoanRequest = await ethers.getContractFactory("LoanRequest");
  const loanRequest = await LoanRequest.deploy(token.address, 1000, 2000, 2200, 60);

  console.log("LoanRequest deployed to:", loanRequest.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
