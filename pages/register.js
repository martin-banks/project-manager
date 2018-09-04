import React from 'react'
import Layout from '../layouts/main'

export default class Register extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Sign in page</h1>

        <form action="/register" method="POST">
          <label for="name">Name</label>
          <input type="text" name="name" required />

          <label for="email">Email</label>
          <input type="email" name="email" required />

          <label for="password">Password</label>
          <input type="password" name="password" required />

          <label for="confirm-password">Password</label>
          <input type="password" name="confirm-password" required />

          <input type="submit" />>
        </form>
      </Layout>
    )
  }
}
