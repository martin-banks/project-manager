import React from 'react'
import Layout from '../layouts/main'

export default class Register extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Sign in page</h1>

        <form action="/signin" method="POST">
          <label for="username">Username</label>
          <input type="text" name="username" required />

          <label for="password">Password</label>
          <input type="password" name="password" required />
        </form>
      </Layout>
    )
  }
}
