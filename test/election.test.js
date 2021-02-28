const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../ethereum/compile');

let accounts;
let elections;
let balance;

beforeEach(async ()=>{
  accounts = await web3.eth.getAccounts();
  elections = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({
    data: bytecode
  })
  .send({
    from: accounts[0],
    gasLimit:'3000000'
  });
});


describe('Election Test',() => {
  it('Add Candidate',async ()=>{
    await elections.methods.addCandidate("Ayush","BJP").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addCandidate("Atharva","CONGRESS").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addCandidate("Ameya","AAM").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
  });

  it('Add Voter',async ()=>{
    await elections.methods.addVoter("a123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("b123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("c123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
  });

  it('Vote',async ()=>{
    await elections.methods.addCandidate("Ayush","BJP").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addCandidate("Atharva","CONGRESS").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("a123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("c123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.vote("a123","CONGRESS").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.vote("c123","BJP").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
  });

  it('Get Candidate Count',async ()=>{
    await elections.methods.addCandidate("Ayush","BJP").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addCandidate("Atharva","CONGRESS").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    const numberOfCandidates = await elections.methods.getNumOfCandidates().call();
    assert.equal(2, numberOfCandidates);
  });

  it('Get Voters Count',async ()=>{
    await elections.methods.addVoter("b123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("c123","440035").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    const numberOfVoters = await elections.methods.getNumOfVoters().call();
    assert.equal(2, numberOfVoters);
  });

  it('Get Candidate',async ()=>{
    await elections.methods.addCandidate("Ayush","BJP").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addCandidate("Atharva","CONGRESS").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    const candidateGot = await elections.methods.returnCandidate(0).call();
    assert.equal("BJP", candidateGot);
    const candidateGot1 = await elections.methods.returnCandidate(1).call();
    assert.equal("CONGRESS", candidateGot1);
  });

  it('Get Voters',async ()=>{
    await elections.methods.addVoter("a123","password1").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    await elections.methods.addVoter("b123","password2").send({
      from: accounts[0],
      gasLimit:'1000000'
    });
    const voterGot = await elections.methods.returnVoter().call();
    assert.equal("b123", voterGot);
  });

  // it('Get Votes',async ()=>{
  //   await elections.methods.addCandidate("Ayush","BJP").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   await elections.methods.addCandidate("Atharva","CONGRESS").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   await elections.methods.addVoter("a123","440035").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   await elections.methods.addVoter("c123","440035").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   await elections.methods.vote("a123","CONGRESS").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   await elections.methods.vote("c123","BJP").send({
  //     from: accounts[0],
  //     gasLimit:'1000000'
  //   });
  //   const b = await elections.methods.calculateVotes().call();
  //   const a = await elections.methods.getCandidateVotes().call();
  //   assert.deepEqual(b, [1,1]);
  // });


});
