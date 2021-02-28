import React, { Component } from 'react'
import { Statistic, Form, Card } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import Layout from '../../components/Layout'

class Results extends Component {
  static async getInitialProps () {
    const parties = []
    const data = await factory.methods.getCandidateVotes().call()
    const length = data.length
    for (var i = 0; i < length; i++) {
      var party = await factory.methods.returnCandidate(i).call()
      parties.push(party)
    }
    console.log(parties)
    return { data, parties }
  }
  render () {
    const parties1 = this.props.parties.map(string => {
      return {
        header: string,
        fluid: true
      }
    })
    const items = this.props.data.map(uint => {
      return {
        header: uint,
        fluid: true
      }
    })
    var divStyle1 = {
      float: 'left',
      margin: '12px',
      marginLeft: '250px'
    }
    var divStyle2 = {
      float: 'center',
      marginRight: '300px'
    }

    return (
      <Layout>
        <h1>Vote Counts</h1>

        <Form>
          <div align='center'>
            <div style={divStyle1}>
              <Card.Group items={parties1} />
            </div>
            <div style={divStyle2}>
              <Card.Group items={items} />
            </div>
          </div>
        </Form>
      </Layout>
    )
  }
}

export default Results
