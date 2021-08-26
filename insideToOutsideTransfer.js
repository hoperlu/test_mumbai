require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json"); 
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);

async function insideToOutsideTransfer(_tokenId,_from,_from_key) {
    const nonce = await web3.eth.getTransactionCount(_from, 'latest');
    const val = await photoCoreContract.methods.betweenInsideOutsideFee().call();
    const tx = {
      'from': _from,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '130000',
      'value':val.toString(),
      'gasPrice':'5000000000', //change according to gas market
      'data': photoCoreContract.methods.insideToOutsideTransfer(_tokenId).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx,_from_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash: ", hash);
      } else {
        console.log(err)
      }
    });
}

async function main(_tokenId,_from,_from_key){
    await insideToOutsideTransfer(_tokenId,_from,_from_key);
    console.log('done');
  }
  
main('1',process.env.a1_address,process.env.a1_key);