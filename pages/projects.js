import React from 'react'
import Link from 'next/link'

import Layout from '../layouts/main'
import ProjectEntry from '../components/project-entry'
import Pagination from '../components/pagination'

// const card = project => (
//   <a
//     href={ `/p/${project._id}` }
//     key={ `project-${project._id}` }
//   >
//     <div className="card">
//       <h3>{ project.name }</h3>
//     </div>
//     <style jsx>{`
//       .card {
//         transition: all 300ms;
//         padding: 8px;
//         margin-bottom: 4px;
//         border: solid 1px rgba(255,255,255, 0.2);
//         border-radius: 4px;
//         background: rgba(0,0,0, 0);
//       }
//       .card:hover {
//         background: rgba(0,0,0, 0.4);
//       }
//     `}</style>
//   </a>
// )

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
    return <div>
      <div className="wrapper__header">
        <div className="content">
          <h1>All projects</h1>
        </div>
      </div>
      <Layout
      pathname={ this.props.url.pathname }
      locals={ this.props.locals }
    >
      <div className="wrapper__cards">
        { this.props.projects.map(p => <ProjectEntry 
          key={`project-${p._id}`} project={ p }
        />) }
      </div>
      
      <Pagination
        pagination={ this.props.locals.pagination }
      />
    </Layout>
    <style jsx>{`
      h1 {
        color: white;
        margin: 0;
        display: block;
        {/* text-align: center; */}
      }
    `}</style>
  </div>
  }
}

export default projects
