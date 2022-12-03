const { ethers } = require("hardhat");
 
const API_KEY = process.env.API_KEY; //get from alchemy
const CONTRACT_ADDRESS = process.env.SBT_CONTRACT_ADDRESS; //deployed contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; //metamask
 
const contract = require('../artifacts/contracts/sbt.sol/ProfessionalValidation.json');
 
// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
 
// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// console.log(signer)
 
// contract instance
const sbtContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
 
async function main() {

  var count = await sbtContract.instituteCount();
  console.log("Institute count is " + count);
  
  const tx = await sbtContract.addInstitute("Microsoft", "{type: corporation}",signer.address);
  await tx.wait();
  console.log("microsoft added as institute.")

  count = await sbtContract.instituteCount();
  console.log("Institute count is "+ count);
 
    await sbtContract.mint(signer.address,
      "bachlor degree",
      "btech CSE",
      "score: 7.8",
      12,
      13,
      false,
      14);
    console.log("Minting SBT done");
    
    // const tx = await instituteContract.addInstitute("Microsoft", "{type: corporation}",signer.address);
    // await tx.wait();

    // count = await instituteContract.instituteCount();
    // console.log("Institute count is "+ count);
 
}
 
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});