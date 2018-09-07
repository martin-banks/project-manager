import React from 'react'
import Layout from '../layouts/main'

export default class Register extends React.Component {
  render () {
    return (
      <Layout>
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
