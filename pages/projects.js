import React from 'react'
import MainLayout from '../layouts/main'
import Link from 'next/link'

const ProjectLink = props => (
  <li>
    <Link
      as={ `p/${props.id}` }
      href={ `/project?title=${props.title}` } >
      <a>{ props.title }</a>
    </Link>

  </li>
)

class projects extends React.Component {
  render () {
    return <MainLayout>
      <ProjectLink id="hello-world" title="Hello world" />
      <ProjectLink id="another-one" title="Another one" />
      <ProjectLink id="my-cool-project" title="My cool project" />
    </MainLayout>
  }
}

export default projects
