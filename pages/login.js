import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'
import Header from '../components/header'

class Register extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals,
      url: context.url,
    }
    return output
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (<>
      <Header>
        <h1>Log in page</h1>
      </Header>
      <Layout
        locals={ this.props.locals }
        pathname={ this.props.url.pathname }
      >
        <form action="/login" method="POST">
          <label htmlFor="email">Username</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <input type="submit" value="Log in"/>
        </form>

        <hr />

        <form action="/account/forgot" method="POST">
          <h3>I forgot my password</h3>
          <label htmlFor="email">Enter your email and we'll send you a link to reset your password</label>
          <input type="email" name="email" required />
          <input type="submit" value="Get reset link" />
        </form>
      </Layout>


    </>)
  }
}

export default withRouter(Register)
