import React from 'react'
import Nav from '../components/nav'
import styles from '../styles'


class MainLayout extends React.Component {
  render () {
    return <div>
      <Nav pathname={ this.props.pathname } />
      <div className="background__gradient"></div>

      <pre>
        locals: { JSON.stringify(this.props.locals, 'utf-8', 2) }
      </pre>

      <div className="content">
        { this.props.children }
      </div>

      { styles }
    </div>
  }
}

export default MainLayout
