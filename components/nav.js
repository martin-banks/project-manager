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
  constructor (props) {
    super(props)
  }
  render () {
    console.log('nav render', this.props)
    return <nav>
      <ul>
        <li className={ this.props.pathname === '/index' ? 'active' : '' }>
          <a href="/" ><Logo /></a>
        </li>
        <li className={ this.props.pathname === '/projects' ? 'active' : '' }>
          <a href="/projects" >Projects</a>
        </li>
        <li className={ this.props.pathname === '/addproject' ? 'active' : '' }>
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
        position: relative;
        display: block;
        top: 0;
        padding: 0;
        margin: 0;
      }
      li {
        position: relative;
        top: 0;
        transition: all 200ms;
        display: inline-block;
        margin: 0;
        vertical-align: top;
        opacity: 0.6;
        border-top: solid 2px rgba(0,0,0,0);
      }
      a {
        display: block;
        position: relative;
        vertical-align: top;
        padding: 16px 30px;
      }
      li.active {
        opacity: 0.8;
        background:  rgba(0,0,0, 0.4);
        border-top: solid 2px hsl(50, 60%, 45%);
      }
      li:hover {
        background: rgba(200, 200, 200, 0.1);
        opacity: 1;
      }
      `}</style>
    </nav>
  }
}

export default Nav
