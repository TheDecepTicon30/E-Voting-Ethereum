pragma solidity ^0.4.17;


contract election{

  address public manager;
  string[] candidateParties;

  event AddedCandidate(uint candidateIndex);
  event AddedVoter(uint voterindex);

  constructor() public{
    manager = msg.sender;
  }

  struct Voter{
    string voterId;
    string password;
    bool hasVoted;
    string vote;
    bool eligible;
  }

  struct Candidate{
    string name;
    string party;
    bool doesExists;
  }

uint numOfCandidates;
uint numOfVoters;
uint []parties;
string[] voterIds;

mapping(string => Candidate) candidates;
mapping(string => Voter) voters;

  function addCandidate(string memory name, string memory party) public{
      require(msg.sender==manager);
      uint candidateIndex = ++numOfCandidates;
      candidates[party] = Candidate(name,party,true);
      parties.push(candidateIndex);
      candidateParties.push(party);
      emit AddedCandidate(candidateIndex);
  }

  function returnCandidate(uint index) public view returns (string){
    return candidateParties[index];
  }

  function addVoter(string memory voterId, string memory password) public{
    require(msg.sender==manager);
    uint voterIndex = ++numOfVoters;
    voters[voterId] = Voter(voterId, password, false, "", true);
    voterIds.push(voterId);
    emit AddedVoter(voterIndex);
  }

  function returnVoter() public view returns(string){
    return voterIds[voterIds.length-1];
  }

  function vote(string voterId,string party) public{
    require(candidates[party].doesExists == true);
    require(voters[voterId].eligible == true);
    require(voters[voterId].hasVoted == false);
    voters[voterId].hasVoted = true;
    voters[voterId].vote =  party;

  }

  function getNumOfCandidates() public view returns(uint){
    return numOfCandidates;
  }

  function getNumOfVoters() public view returns(uint){
    require(msg.sender == manager);
    return numOfVoters;
  }

  function getCandidates() public view returns(uint[]){
    return (
      parties
      );
  }

uint []votes;
  function calculateVotes() public{
    votes=new uint[](parties.length);
    for(uint j=0;j<parties.length;j++){
      uint candidateVotes = 0;
      for(uint i = 0 ; i < voterIds.length ; i++){
        if(sha3(voters[voterIds[i]].vote) == sha3(candidateParties[j])){
          candidateVotes++;
        }
      }
      votes[j] = candidateVotes;
    }
  }

  function getCandidateVotes() public view returns(uint[]){
    return votes;
  }

}
