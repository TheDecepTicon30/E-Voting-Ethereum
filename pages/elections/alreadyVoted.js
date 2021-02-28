import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class Thankyou extends Component {
  render () {
    return (
      <Layout>
        <h1>Sorry, You have already voted. You can only vote once.</h1>
      </Layout>
    )
  }
}

export default Thankyou
