import React from 'react'
import Layout from '../layouts/main'

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
    return (
      <Layout
        pathname={ this.props.url.pathname }
        locals={ this.props.locals }
      >
        <h1>Register</h1>

        <form action="/register" method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <label htmlFor="confirm-password">Password</label>
          <input type="password" name="confirm-password" required />

          <input type="submit" />
        </form>
      </Layout>
    )
  }
}
