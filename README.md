# E-Voting-Ethereum
A Blockchain based code for E Voting System which prevents miscounting of votes and stores the votes in different locations so that they cannot be tampered with.


# Smart Contract
The election.sol placed in /ethereum/contracts is written in solidity v0.4.17 which contains the smart contract written for returning a list of voters, add a candidate, add a voter, cast a vote, return a candidate, return list of candidates, and much more. The manager can also add candidates or voters to the contract. The manager will be the one who deploys the smart contract. Only the manager can find the complete results of the eletion. We have calculated the number of voted for a particular candidate by iterating a chain. This number is then typecasted to uint. We also add a require statement in calculateVotes() which checks if the function is called by the manager or not. If not, then this function will not return anything. 
You can read more about smart contracts [here.](https://en.wikipedia.org/wiki/Smart_contract)
You can read more about the solidity language [here.](https://solidity.readthedocs.io/en/v0.4.25/)

# Compiling the Smart Contract
To compile the smart contract we will be using solc compiler which is used to compile solidity codes. The compile code is placed in compile.js. 
The code is written in [JavaScript.](https://en.wikipedia.org/wiki/JavaScript)

# Testing our Smart Contract
The election.test.js file, written in JavaScript tests our smart contracts by using multiple testcases written in it. We will be using mocha as the testing framework. 
Read more about mocha [here.](https://mochajs.org/) 

# Deploying our Smart Contract
The deploy.js file will deploy our smart contract to the Rinkeby Test Network. This network is similar to the main Ethereum Network but the only difference is that we don't need to pay for deploying our smart contracts. It works completely on the concept of virtual money.

# Steps to configure the project and to run our Smart Contract and deploy it on Rinkeby TestNet.
1) Clone this source repository on your desired local path on machine.
2) Install NodeJS in your computer from [here.](https://nodejs.org/en/) Use the recommended version.
3) Install Git in your computer from [here.](https://git-scm.com/downloads)
4) Open up your cmd. Navigate to the folder Lottery in your cmd. 
5) Run the command- 'npm init' in our Lottery folder. This will create a package.json file in your directory.
6) Install packages Truffle, Mocha, Ganache-CLI and Web3 by running the command 'npm install --save truffle-hdwallet-provider@0.0.3    mocha ganache-cli web3'. Truffle is a development environment, testing framework and asset pipeline for Ethereum. Mocha is a testing framework which will be required by our lottery.test.js file. Ganache provides a environment for truffle. Web3 is a collection of libraries which allows you to interact with a local or remote ethereum node.
7) To compile our smart contract, run command 'node compile.js'. 
8) To test our smart contract, run 'npm run test'.
9) Install MetaMask which is an extension for browsers like Chrome to easily track your transactions and accounts.
10) Finally, deploy our contract on the Rinkeby network by running command 'node deploy.js'
