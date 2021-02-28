import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

export default props => {
  return (
    <Container align='center'>
      <Head>
        <link
          rel='stylesheet'
          align='center'
          href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css'
        />
        <script src='https://www.gstatic.com/firebasejs/5.5.5/firebase.js' />
        <script src='https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js' />
      </Head>

      {props.children}
    </Container>
  )
}
