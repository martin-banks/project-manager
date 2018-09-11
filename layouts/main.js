import React from 'react'
import Nav from '../components/nav'
import styles from '../styles'


class MainLayout extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // Starting input for controll prompts ...
    // window.addEventListener('keyup', e => {
    //   const { mataKey, shiftKey } = e
    //   if (meteKey && shiftKey && key === 'p') {
    //     this.setState({ showInput: true })
    //   }
    // })
  }
  render () {
    return <div>
      <Nav
        pathname={ this.props.pathname }
        user={ this.props.locals.user }
      />
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
