import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'
import ProjectEntry from '../components/project-entry'
import ProfileHeader from '../components/profile-header'
import UploadImage from '../components/uploadImage'


class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
    return <div>
      <ProfileHeader
        profile={ this.props.locals.profile }
      />
      <Layout
        locals={ this.props.locals }
        pathname={ this.props.url.pathname }
      >
        <h1>Welcome back { this.props.locals.user.name.split(' ')[0] }</h1>

        <h2>Account details</h2>
        <form action="account" method="POST" encType="multipart/form-data">
          {/* <UploadImage
            label="Upload a new avatar image"
          /> */}
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
          <input type="submit" value="Update profile"/>
        </form>

        <hr />

        <h2>Your projects</h2>
        <div className="wrapper__cards">
          { this.props.locals.projects
            .map(p => <ProjectEntry key={`project-${p._id}`} project={ p }/>) }
        </div>

      </Layout>
      </div>
  }
}

export default withRouter(Account)
