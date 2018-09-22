import React from 'react'
import Layout from '../layouts/main'
import Header from '../components/header'

export default class Register extends React.Component {
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
    return <div>
      <Header>
        <h1>Password reset</h1>
      </Header>

      <Layout
        pathname={ this.props.url.pathname }
        locals={ this.props.locals }
      >
        <form method="POST">

          <label htmlFor="password">Enter a new password </label>
          <input type="password" name="password" required />

          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" name="confirm-password" required />

          <input type="submit" />
        </form>
      </Layout>
    </div>
    
  }
}
