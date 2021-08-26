'use strict'
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json"); 
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);
const gasPrice='5000000000';

async function transferFrom(_seller,_seller_key,_tokenId) {
    const nonce = await web3.eth.getTransactionCount(_seller, 'latest');
    const tx = {
      'from': _seller,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '1300000', //may change with _photoFormat
      'gasPrice':gasPrice, //change according to gas market
      'data': photoCoreContract.methods.transferFrom(_seller,contractAddress,_tokenId).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx,_seller_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) { 
        console.log("Transaction hash 1: ", hash);
      } else {
        console.log(err)
      }
    });
}

async function setSale(_buyer,_seller,_price,_tokenId) {
    const nonce = await web3.eth.getTransactionCount(process.env.a5_address, 'latest');
    const tx = {
      'from': process.env.a5_address,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '1800000',
      'gasPrice':gasPrice, //change according to gas market
      'data': photoCoreContract.methods.setSale(_buyer,_seller,_price,_tokenId).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx,process.env.a5_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash 2: ", hash);
      } else {
        console.log(err)
      }
    });
}

async function buySale(_buyer,_buyer_key,_price,_tokenId) {
    const nonce = await web3.eth.getTransactionCount(_buyer, 'latest');
    const tx = {
      'from': _buyer,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '150000',
      'value':_price,
      'gasPrice':gasPrice, //change according to gas market
      'data': photoCoreContract.methods.buySale(_tokenId).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx,_buyer_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash 3: ", hash);
      } else {
        console.log(err)
      }
    });
}

async function main(_buyer,_buyer_key,_seller,_seller_key,_price,_tokenId){
  await transferFrom(_seller,_seller_key,_tokenId);
  await setSale(_buyer,_seller,_price,_tokenId);
  await buySale(_buyer,_buyer_key,_price,_tokenId);
  console.log('done');
  }

main(
    process.env.a3_address,
    process.env.a3_key,
    process.env.a1_address,
    process.env.a1_key,
    '6000000000',
    '50'
  );