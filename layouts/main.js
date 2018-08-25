import React from 'react'
import Nav from '../components/nav'

const layoutStyle = {
  margin: 0,
  padding: 20,
  margin: 20,
  border: 'solid 1px purple'
  // background: 'linear-gradient(45deg, #111, #555)',

}

class MainLayout extends React.Component {
  render () {
    return <div style={ layoutStyle }>
      <Nav />
      { this.props.children }
    </div>
  }
}

export default MainLayout
