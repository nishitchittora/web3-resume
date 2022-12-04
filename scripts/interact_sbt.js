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

  // var is_admin =  await sbtContract.is_admin(signer.address);
  // // var count = await sbtContract.instituteCount();
  // console.log("Am I the admin ?" + is_admin);
  
  // const tx = await sbtContract.addInstitute("Microsoft", "{type: corporation}",signer.address);
  // await tx.wait();
  // console.log("microsoft added as institute.")

  // count = await sbtContract.instituteCount();
  // console.log("Institute count is "+ count);
 
  // await sbtContract.mint(signer.address,
  //   "Professional Experience",
  //   "Senior Software Engineer",
  //   "score: 7.8",
  //   "1609459200",
  //   "1661990400",
  //   );
  // console.log("Minted 1 SBT by microsoft");
  
  // await sbtContract.mint(signer.address,
  //   "Quarterly spot award",
  //   "Senior Software Engineer",
  //   "score: 7.8",
  //   "1609459200",
  //   "1614556800",
  //   false,
  //   0);
    
  // console.log("Minted 1 more SBT by microsoft");

  // list of SBTs owned by signer
  var token = await sbtContract.tokenURI(0);
  console.log(token)

  

    // const tx = await instituteContract.addInstitute("Microsoft", "{type: corporation}",signer.address);
    // await tx.wait();

    
 
}
 
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});