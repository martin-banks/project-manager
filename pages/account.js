import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'

class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }
  static async getInitialProps (context) {
    return {
      locals: context.res.locals,
      url: context.url,
    }
  }

  componentDidMount () {
    this.setState({
      name: this.props.locals.user.name,
      email: this.props.locals.user.email,
    })
  }

  handleChange (e) {
    const { value, name } = e.target
    console.log({ name, value })
    this.setState({ [name]: value })
  }

  render () {
    return (
      <Layout
        locals={ this.props.locals }
        url={ this.props.url }
      >
        <h1>Welcome back { this.props.locals.user.name }</h1>
        <form action="account" method="POST">
          <label htmlFor="name">Update you username</label>
          <input
            type="text"
            name="name"
            value={ this.state.name }
            onChange={ this.handleChange.bind(this) }
          />
          <label htmlFor="email">Update you email</label>
          <input
            type="email"
            name="email"
            value={ this.state.email }
            onChange={ this.handleChange.bind(this) }
          />

          <input type="submit" />
        </form>
      </Layout>
    )
  }
}

export default withRouter(Account)
