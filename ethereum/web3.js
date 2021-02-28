import Web3 from 'web3';

let web3;

//window==object => v=browser

if(typeof window !== 'undefined' && window.web3 !=='undefined') {
  //we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
}else{
  //we are in the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/a2d33b5e1e8444a58290f9d4749cabc7'

  );

  web3 = new Web3(provider);

}

export default web3;
