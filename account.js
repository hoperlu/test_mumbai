const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const util = require('ethereumjs-util');

//const mnemonic = bip39.generateMnemonic();
const mnemonic ='pulse stove garment maple vital fence life kite boss assist can fish';
const seed = bip39.mnemonicToSeedSync(mnemonic);
const hdWallet = hdkey.fromMasterSeed(seed);
const key1 = hdWallet.derivePath("m/44'/966'/1'/0/0");
const address1 = util.pubToAddress(key1._hdkey._publicKey, true);
console.log(util.bufferToHex(address1));
console.log(util.bufferToHex(key1._hdkey._privateKey));

//address1 = util.toChecksumAddress(address1.toString('utf8'))
//console.log(address1);
