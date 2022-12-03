const { ethers } = require("hardhat");
 
const API_KEY = process.env.API_KEY; //get from alchemy
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; //deployed contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; //metamask
 
const contract = require('../artifacts/contracts/institutes.sol/Institute.json');
 
// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
 
// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// console.log(signer)
 
// contract instance
const instituteContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
 
async function main() {
 
    var count = await instituteContract.instituteCount();
    console.log("Institute count is " + count);
    
    const tx = await instituteContract.addInstitute("Microsoft", "{type: corporation}",signer.address);
    await tx.wait();

    count = await instituteContract.instituteCount();
    console.log("Institute count is "+ count);
 
}
 
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});