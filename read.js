'use strict';
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json");
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);
const accounts=['0xf215893aeD38B7A307e84A9A2c1D775c9d5bA472',//1
'0x9bB69CcCD27d2625fdd5661Ea31629BF057CC215',//2 admin
'0xd53b9aFf80819413EbF8316df64fca008911F8Ba',//3 小熊       yuniko0720
'0x1bCfa752f9052aaef54aa9B66FDB2514d61fd4bf',//4 高橋聖子    lbj
'0x351c28343b37B1862c2A96BCED671982C3A9f281',//5 sm,        000
'0xCDB7B4E39922d8AC0e2355b7395950c73fC145a5',//6 谷原希美    imrich
'0xA8047E897bFED7e32d8c2f2473Ce990Ac5c31433',//7 ?          candice
'0xa666Ad8c31A2eCD1BFd5Fd4efA295ac782F3FB06',//8 ?           imrich2
'0x0130B0a0F318672fC0c1fdC2Eb62bd24b8D82b64'];//9           imfat

async function main() {//param
    //getPhoto getSale ownerOf insideAddress betweenInsideOutsideFee outsideToInsideAddress
    //setInsideOutsideCount insideToOutsideAddress handlingFee sellerCut creatorCut
    const res = await photoCoreContract.methods.ownerOf(process.argv[2]).call();//param
    console.log(res);
}
main();//param
/*
async function ma(){//param
    for (let i = 0; i < accounts.length; i++) {
        await main(accounts[i]);
    }
}
ma();
*/