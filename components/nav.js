import React from 'react'
import Link from 'next/link'

class Nav extends React.Component {
  render () {
    return <ul>
      <li>
        <Link href="/projects">Projects</Link>
      </li>
      <li>
        <Link href="/addproject">Add Project</Link>
      </li>
    </ul>
  }
}

export default Nav
