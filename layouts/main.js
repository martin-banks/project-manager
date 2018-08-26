import React from 'react'
import Nav from '../components/nav'
import styles from '../styles'


class MainLayout extends React.Component {
  render () {
    return <div>
      <Nav />
      <div className="background__gradient"></div>
      <div className="content">
        { this.props.children }
      </div>

      <style jsx global>{ styles }</style>
    </div>
  }
}

export default MainLayout
