import React, {Component} from 'react';
import Head from 'next/head';
import Layout from '../components/LoginComp';
import {Form, Button} from 'semantic-ui-react';
import {Router} from '../routes';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import firebase from 'firebase/app'
import 'firebase/firestore'
require('firebase/database');

class LoginBox extends Component {

  constructor(props) {
    super(props);
    this.gotData = this.gotData.bind(this);
  }
  state={
    id:'',
    password:'',
    loading:false,
    isManager:[],
    VoterID:[],
    Password:[]
  };
  async gotData(data){
    var scores = data.val();
    var keys = Object.keys(scores);
    for(var i = 0; i<keys.length; i++){
      this.setState({
        isManager: this.state.isManager.concat([scores[keys[i]]["Flag"]]),
        VoterID: this.state.VoterID.concat([scores[keys[i]]["VoterID"]]),
        Password: this.state.Password.concat([scores[keys[i]]["Password"]])
      })
    }
    var flag = 0;
    for(var i = 0; i<this.state.isManager.length; i++){
        if(this.state.id == this.state.VoterID[i] && this.state.password == this.state.Password[i] && this.state.isManager[i] == 0){
          flag=0;
            this.setState({loading:true});
            const accounts = await web3.eth.getAccounts();
            await factory.methods.addVoter(this.state.id,this.state.password).send({
              from : accounts[0]
            });
            this.setState({loading:false});
            Router.pushRoute('/elections/voting');
            break;
        }else if(this.state.id == this.state.VoterID[i] && this.state.password == this.state.Password[i] && this.state.isManager[i] == 1){
          flag=0;
            Router.pushRoute('/elections/manager');
            break;
        }else if(flag == 0){
          flag=1;
        }
      }
      if(flag == 1){
        Router.pushRoute('/elections/sorry')
      }
  }

  errData(err){
    console.log(err);
  }

  onSubmit = async(event) =>{
      var config = {
     apiKey: "AIzaSyA75_tMAU8sazpYJ6bSo-uW2jQ2dWLfi80",
     authDomain: "dapp-voting-9c7fd.firebaseapp.com",
     databaseURL: "https://dapp-voting-9c7fd.firebaseio.com",
     projectId: "dapp-voting-9c7fd",
     storageBucket: "dapp-voting-9c7fd.appspot.com",
     messagingSenderId: "753660212432"
   };
   if (!firebase.apps.length) {
     firebase.initializeApp(config);
     var database = firebase.database();
   }
   var ref = database.ref('table');
   ref.on('value', this.gotData, this.errData);
  }
  render() {
    return (<div>
      <Head>
      <link href="/static/logincss.css" rel="stylesheet" /></Head>
      <br/>
      <center><h1>Welcome</h1></center>
      <Layout>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>VoterId</label>
            <input
                placeholder='VoterId'
                value={this.state.id}
                onChange={event=>this.setState({id:event .target.value})}
                />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={event=>this.setState({password:event.target.value})}
                />
          </Form.Field>

          <Button loading={this.state.loading} primary>Login</Button>
        </Form>
      </Layout>
      </div>
    );
  }

}

export default LoginBox;
