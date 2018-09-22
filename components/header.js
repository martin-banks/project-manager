import React from 'react'

export default class Header extends React.Component {
  render () {
    return <div className="wrapper__header">
      <div className="content">
        { this.props.children }
      </div>
    </div>
  }
}
