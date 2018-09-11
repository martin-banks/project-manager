import React from 'react'
import Link from 'next/link'
import Layout from '../layouts/main'

const card = project => (
  <a
    href={ `/p/${project._id}` }
    key={ `project-${project._id}` }
  >
    <div className="card">
      <h3>{ project.name }</h3>
    </div>
    <style jsx>{`
      .card {
        transition: all 300ms;
        padding: 8px;
        margin-bottom: 4px;
        border: solid 1px rgba(255,255,255, 0.2);
        border-radius: 4px;
        background: rgba(0,0,0, 0);
      }
      .card:hover {
        background: rgba(0,0,0, 0.4);
      }
    `}</style>
  </a>
)

class projects extends React.Component {
  static async getInitialProps (context) {
    const projects = await context.res.locals.projects
    const { url } = context
    console.log({ projects })
    return {
      locals: context.res && context.res.locals,
      projects,
      url,
    }
  }


  render () {
    return <Layout
      pathname={ this.props.url.pathname }
      locals={ this.props.locals }
    >
      <h1>Projects</h1>
      <div className="wrapper__cards">
        { this.props.projects.map(card) }
      </div>
      {/* <pre>{ JSON.stringify(this.props.projects, 'utf-8', 2) }</pre> */}

      <style jsx >{``}</style>
    </Layout>
  }
}

export default projects
