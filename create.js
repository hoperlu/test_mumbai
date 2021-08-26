'use strict'
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json"); 
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);
const gasPrice='5000000000';

async function create(_photoFormat,_creator,_creatorName,_description) {
    const nonce = await web3.eth.getTransactionCount(process.env.a5_address, 'latest');
    const tx = {
      'from': process.env.a5_address,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '3000000', //may change with _photoFormat
      'gasPrice':gasPrice, //change according to gas market
      'data': photoCoreContract.methods.createPhoto(_photoFormat,_creator,_creatorName,_description).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx,process.env.a5_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash: ", hash);
      } else {
        console.log(err)
      }
    });
}

async function main(_photoFormat,_creator,_creatorName,_description){
  await create(_photoFormat,_creator,_creatorName,_description);
  console.log('done');
}

main(
  'git',
  process.env.a3_address,
  '小熊',
  '哈囉大家好我是小熊');
