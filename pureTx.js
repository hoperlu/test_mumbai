async function main() {
    require('dotenv').config();
    const API_URL = process.env.API_URL;
    const PRIVATE_KEY=process.env.a2_key;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = process.env.b2_address;
   
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': process.env.b1_address, // faucet address to return eth
     'value': 100,
     'gas': 30000,
     'maxFeePerGas': 1000000108,
     'nonce': nonce,
     'gasPrice':'5000000000'
     // optional data field to send message or execute smart contract
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("transaction: ", hash, "\ndone");
    }
   });
}

main();