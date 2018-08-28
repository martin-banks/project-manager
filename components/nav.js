import React from 'react'
import Link from 'next/link'

const Logo = () => (
  <svg
    width="20"
    height="20"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <g>
      <polygon points="30.57 81.43 0 100 0 18.57 30.57 0 30.57 81.43"/>
      <polygon points="65.28 81.43 34.72 100 34.72 18.57 65.28 0 65.28 81.43"/>
      <polygon points="100 81.43 69.43 100 69.43 18.57 100 0 100 81.43"/>
    </g>
  </svg>
)


class Nav extends React.Component {
  render () {
    return <nav>
      <ul>
        <li>
          <a href="/" ><Logo /></a>
        </li>
        <li>
          <a href="/projects" >Projects</a>
        </li>
        <li>
          <Link href="/addproject" prefetch>
            <a>Add Project</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
      nav {
        position: relative;
        padding: 0;
        margin:0;
      }
      ul {
        // border: solid 1px pink;
        position: relative;
        display: block;
        top: 0;
        padding: 0;
        margin: 0;
      }
      li {
        // border: solid 1px lime;
        position: relative;
        top: 0;
        transition: all 200ms;
        display: inline-block;
        margin: 0;
        vertical-align: top;
        padding: 30px 0;
      }
      a {
        // border: solid 1px gold;
        dispay: block;
        position: relative;
        padding: 30px;
        vertical-align: top;
      }
      li:hover {
        background: rgba(200, 200, 200, 0.1)
      }
      `}</style>
    </nav>
  }
}

export default Nav
