import React from 'react'
import MainLayout from '../layouts/main'
import Link from 'next/link'

// const ProjectLink = props => (
//   <li>
//     <Link
//       as={ `p/${props.id}` }
//       href={ `/project?title=${props.title}` } >
//       <a>{ props.title }</a>
//     </Link>
//   </li>
// )

class projects extends React.Component {
  static async getInitialProps (context) {
    const { projects } = context.res.locals
    console.log({ projects })
    return { projects }
  }
  render () {
    return <MainLayout>
      <h1>Projects</h1>
      <pre>{ JSON.stringify(this.props.projects, 'utf-8', 2) }</pre>
    </MainLayout>
  }
}

export default projects
