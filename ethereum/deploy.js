const HDWalletProvider = require('truffle-hdwallet-provider');
const  Web3 = require('web3');
const {interface, bytecode} =require('./compile');


const provider  =new HDWalletProvider(
  'finger orchard candy task buddy sunny into head army payment nominee lab',
  'https://rinkeby.infura.io/a2d33b5e1e8444a58290f9d4749cabc7'
);

const web3 = new Web3(provider);

const deploy = async()=>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '3000000', from: accounts[0]});

  console.log('Contract deployed at',result.options.address);
};
deploy();
