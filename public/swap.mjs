//const { ethers } = require("ethers");
//import { ethers } from "ethers";

//import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

console.log("working");
// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

async function start(){
    const block = await provider.getBlockNumber()
    console.log(block)
}

start();




// module.exports = {swap};