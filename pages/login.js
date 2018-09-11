import React from 'react'
import Layout from '../layouts/main'
import { withRouter } from 'next/router'

class Register extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals,
      url: context.url,
    }
    return output
  }

  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <Layout
        locals={ this.props.locals }
        pathname={ this.props.url.pathname }
      >
        <h1>Log in page</h1>

        <form action="/login" method="POST">
          <label htmlFor="email">Username</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <input type="submit" />
        </form>
      </Layout>
    )
  }
}

export default withRouter(Register)
