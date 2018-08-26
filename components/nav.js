import React from 'react'
import Link from 'next/link'

class Nav extends React.Component {
  render () {
    return <ul>
      <li>
        <a href="/" >
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="/projects" >
          <span>Projects</span>
        </a>
      </li>
      <li>
        <Link href="/addproject" prefetch>
          <a>Add Project</a>
        </Link>
      </li>
    </ul>
  }
}

export default Nav
