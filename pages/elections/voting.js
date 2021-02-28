import React,{Component} from 'react';
import factory from '../../ethereum/factory';
import {Button,Card,Form} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {Router} from '../../routes';
import LoginBox from '../index';
import web3 from '../../ethereum/web3';

class Voting extends Component{


  static async getInitialProps(){
    const parties = [];
    const data = await factory.methods.getCandidates().call();
    const length = data.length;
    for(var i = 0; i<length; i++){
      var party = await factory.methods.returnCandidate(i).call();
      parties.push(party);
    }
    console.log(parties);
    return {parties};
  }

state ={
  id:'',
  loading:false
};

  onSubmit = async() =>{
    this.setState({loading:true})
    try{
      var voterid = await factory.methods.returnVoter().call();
      const accounts = await web3.eth.getAccounts();
      await factory.methods.vote(voterid , this.state.id).send({
        from : accounts[0]
      });}
      catch(err){}
      this.setState({loading:false})
      Router.pushRoute('./thankyou');
  };

handleRegionClick(vid){
  this.setState({id:vid});
};
renderElections(){
  const items = this.props.parties.map(string=>{
    return {
      header: string,
      description: (
        <Button primary loading={this.state.loading}
        onClick={this.handleRegionClick.bind(this,string)}>Vote</Button>
      ),
      fluid: true
    };
  });
  return (
    <Form onSubmit={this.onSubmit}>
    <Card.Group items={items} />
    </Form>
  );
}


  render(){
    return(
    <Layout>
      <div>
      {this.renderElections()}
      </div>
    </Layout>
  );
  }
}

export default Voting;
