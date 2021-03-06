import React from 'react'
import Link from 'next/link'

const Logo = () => (
  <svg
    className="nav__logo"
    width="20"
    height="20"
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
    // console.log('nav render', this.props)
    return <nav>
      <ul>
        <li className={ this.props.pathname === '/index' ? 'active' : '' }>
          <a href="/"><Logo /></a>
        </li>
        <li className={ this.props.pathname === '/projects' ? 'active' : '' }>
          <a href="/projects/1">Projects</a>
        </li>

        <div className="spacer"></div>

        { this.props.user &&
          <li className={ this.props.pathname === '/addproject' ? 'active' : '' }>
            <a href="/addproject">Add Project</a>
          </li>
        }

        {/* { this.props.user &&
          <li className="user">
            <a href="/profile">My Profile</a>
          </li>
        } */}
        { this.props.user &&
          <li className={ this.props.pathname === '/account' ? 'user active' : 'user' }>
            <a href="/account">{ this.props.user.name.split(' ')[0] }</a>
          </li>
        }
        { this.props.user &&
          <li className="user">
            <a href="/logout">Log out</a>
          </li> 
        }

        {/* { !this.props.user && 
          <li className={ this.props.pathname === '/register' ? 'user active' : 'user' }>
            <a href="/register">Register</a>
          </li>
        } */}
        { !this.props.user && 
          <li className={ this.props.pathname === '/login' ? 'user active' : 'user' }>
            <a href="/login">Log in</a>
          </li> 
        }
      </ul>

      <style jsx>{`
      {/* nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0;
        margin:0;
      }
      ul {
        position: relative;
        display: flex;
        top: 0;
        padding: 0;
        margin: 0;
      }
      li {
        position: relative;
        flex: 0 0 auto;
        top: 0;
        transition: all 200ms;
        display: inline-block;
        margin: 0;
        vertical-align: top;
        opacity: 0.6;
        border-top: solid 2px rgba(0,0,0,0);
      }
      div.spacer {
        flex: 1 1 auto;
        max-width: 100%;
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
      li.user {

      }
      li:hover {
        background: rgba(200, 200, 200, 0.1);
        opacity: 1;
      } */}
      `}</style>
    </nav>
  }
}

export default Nav
