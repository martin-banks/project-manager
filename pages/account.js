import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'

class Account extends React.Component {
  static async getInitialProps (context) {
    return {
      locals: context.res.locals,
      url: context.url,
    }
  }

  render () {
    return (
      <Layout
        locals={ this.props.locals }
        url={ this.props.url }
      >
        <h1>Welcome back { this.props.locals.user.name }</h1>
      </Layout>
    )
  }
}

export default withRouter(Account)
