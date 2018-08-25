import React from 'react'
import Link from 'next/link'

class Nav extends React.Component {
  render () {
    return <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </li>
      <li>
        <Link href="/addproject">
          <a>Add Project</a>
        </Link>
      </li>
    </ul>
  }
}

export default Nav
