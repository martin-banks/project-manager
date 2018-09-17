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
    const { email } = this.props.locals
    return <div>
      <div className="wrapper__header">
        <div className="content">
          <h1>Register</h1>
        </div>
      </div>
      <Layout
        pathname={ this.props.url.pathname }
        locals={ this.props.locals }
      >
        <form action="/register" method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />

          <label htmlFor="email">Email</label>

          { email
            ? <input type="email" name="email" required value={ email }/>
            : <input type="email" name="email" required />
          }

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" name="confirm-password" required />

          <input type="submit" />
        </form>
      </Layout>
      <style jsx>{`
        h1 {
          margin: 0;
        }
      `}</style>
    </div>
    
  }
}
