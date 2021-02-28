const path = require('path') // accessing the inbox.sol file from hdd
const fs = require('fs') // read contents of file
const solc = require('solc')

const electionPath = path.resolve(__dirname, 'contracts', 'election.sol')
const source = fs.readFileSync(electionPath, 'utf8')

solc.compile(source, 1) // source is the file to compile,1 is number of files to be compiled

console.log(solc.compile(source, 1)) // to see what is compiled

// byte code => Actual byte code that will be executed on the blockchain
// interface => the ABI required

module.exports = solc.compile(source, 1).contracts[':election'] // to make it accessible to files in the package
