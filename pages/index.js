import Link from 'next/link'
import MainLayout from '../layouts/main'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'


class Index extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals
    }
    return output
  }

  render () {
    return <MainLayout>
      <pre>
        { JSON.stringify(Object.keys(this.props), 'utf-8', 2) }
        { JSON.stringify(this.props.locals, 'utf-8', 2) }
      </pre>

      <style jsx> {``}</style>
    </MainLayout>
  }
}

export default withRouter(Index)
