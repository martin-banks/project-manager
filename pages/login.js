import React from 'react'
import Layout from '../layouts/main'

export default class Register extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Log in page</h1>

        <form action="/login" method="POST">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <input type="submit" />
        </form>
      </Layout>
    )
  }
}
