require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json"); 
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);

async function transferFrom(_from,_from_key,_to,_tokenId) {
    const nonce = await web3.eth.getTransactionCount(_from, 'latest');
    const val = await photoCoreContract.methods.handlingFee().call();
    const tx = {
      'from': _from,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '300000',
      'gasPrice':'5000000000', //change according to gas market
      'value':val.toString(),
      'data': photoCoreContract.methods.transferFrom(_from,_to,_tokenId).encodeABI()
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

async function main(_from,_from_key,_to,_tokenId){
  x=await transferFrom(_from,_from_key,_to,_tokenId);
  console.log('done');
}

main(
    process.env.a7_address,
    process.env.a7_key,
    process.env.a1_address,
    '0');
