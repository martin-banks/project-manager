import Link from 'next/link'
import Layout from '../layouts/main'
import { withRouter } from 'next/router'

import ProjectList from '../components/project-list'
import ProfileHeader from '../components/profile-header'


class Profile extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals,
      url: context.url,
    }
    return output
  }

  render () {
    // const { name } = this.props.locals.profile
    // const firstname = name.split(' ')[0]
    // const lastname = name.split(' ')[1]
    return <div>
      <ProfileHeader
        profile={ this.props.locals.profile }
      />
        {/* <div className="wrapper__display--profile">
          <div className="user">
            <div className="avatar">
              <p>{ firstname[0] }{ lastname && lastname[1] }</p>
            </div>
            <h1>{ name }</h1>
          </div>
        </div> */}
        <Layout
          pathname={ this.props.url.pathname }
          locals={ this.props.locals }
        >
          <ProjectList projects={ this.props.locals.profile.projects } />
        </Layout>

        <style jsx> {`
          
        `}</style>
      </div>
  }
}

export default withRouter(Profile)
