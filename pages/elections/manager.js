import React,{Component} from 'react';
import {Form, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class CandidateNew extends Component{
  state={
    cname:'',
    party:'',
    loading:false,
    loading1:false
  };

onClick = async()=>{
  this.setState({loading1:true});
  const accounts = await web3.eth.getAccounts()
  await factory.methods.calculateVotes().send({
    from: accounts[0]
  })
this.setState({loading1:false});
  Router.pushRoute('/elections/results')

}

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading:true});
    try{
    const accounts = await web3.eth.getAccounts();

    await factory.methods
    .addCandidate(this.state.cname,this.state.party)
    .send({
      from:accounts[0]
    });

    Router.pushRoute('/');

  }catch(err){
    //some error
  }
this.setState({loading:false});
  };

  render(){
    return (
      <Layout>
      <h3> Add Candidates </h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Candidate Name</label>
          <input
            placeholder='Candidate Name'
            value={this.state.cname}
            onChange={event=>this.setState({cname:event.target.value})}
           />
        </Form.Field>
        <Form.Field>
          <label>Party</label>
          <input
            placeholder='Party'
            value={this.state.party}
            onChange={event=>this.setState({party:event.target.value})}
          />
        </Form.Field>

        <Button loading={this.state.loading} primary>Add Party</Button>
      </Form>
      <br/><hr/><br/>

      <Button loading={this.state.loading1} onClick={this.onClick} primary> Get Results</Button>
      </Layout>
    );
  }
}

export default CandidateNew;
