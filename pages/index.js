import Link from 'next/link'
import Layout from '../layouts/main'
import { withRouter } from 'next/router'
// import fetch from 'isomorphic-unfetch'


class Index extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals,
      url: context.url,
    }
    return output
  }

  render () {
    return <Layout
      pathname={ this.props.url.pathname }
      locals={ this.props.locals }
    >
      <style jsx> {``}</style>
    </Layout>
  }
}

export default withRouter(Index)
