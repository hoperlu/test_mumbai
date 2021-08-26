require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./build/contracts/PhotoCore.json"); 
const contractAddress = "0xA01dB1402D03eBF19De7aa974c98A88792829589";
const photoCoreContract = new web3.eth.Contract(contract.abi, contractAddress);

async function onlySM(x) {//param
    const nonce = await web3.eth.getTransactionCount(process.env.a5_address, 'latest');
    const tx = {
      'from': process.env.a5_address,
      'to': contractAddress,
      'nonce': nonce,
      'gas': '60000',
      'gasPrice':'5000000000', //change according to gas market
      'data': photoCoreContract.methods.setHandlingFee(x).encodeABI()//param
    };//setHandlingFee destroyPhoto setSellerCut setCreatorCut deleteSale setBetweenInsideOutsideFee setMaxSetInsideOutsideTimes
    const signedTx = await web3.eth.accounts.signTransaction(tx,process.env.a5_key);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash: ", hash);
      } else {
        console.log(err)
      }
    });
    
}

async function main(x){//param
    await onlySM(x);//param
    console.log('done');
  }
  
main('77000000000');//param