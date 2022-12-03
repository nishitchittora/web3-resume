const { ethers } = require("hardhat");
async function main() {

   const Institute = await ethers.getContractFactory('Institute');

   const hw = await Institute.deploy();

   console.log('Institute Contract Deployed to:', hw.address);
}

main().then(() => process.exit(0))
.catch(error => {
 console.error(error);
 process.exit(1);
});