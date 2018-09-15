import Link from 'next/link'
import Layout from '../layouts/main'
import { withRouter } from 'next/router'

import ProjectList from '../components/project-list'


class Profile extends React.Component {
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
      <h1>Projects by { this.props.locals.profile.name.split(' ')[0] }</h1>
      <ProjectList projects={ this.props.locals.profile.projects } />
      <style jsx> {``}</style>
    </Layout>
  }
}

export default withRouter(Profile)
