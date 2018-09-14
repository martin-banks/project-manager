import React from 'react'
import styles from '../styles'
import Nav from '../components/nav'
import Flashes from '../components/flashes'


class MainLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFlashes: true
    }
  }

  componentDidMount () {
    // Starting input for controll prompts ...
    // window.addEventListener('keyup', e => {
    //   const { mataKey, shiftKey } = e
    //   if (meteKey && shiftKey && key === 'p') {
    //     this.setState({ showInput: true })
    //   }
    // })
    setTimeout(() => {
      this.setState({ showFlashes: false })
    }, 3 * 1000)
  }
  render () {
    const { flashes } = this.props.locals
    return <div data-theme={ this.props.locals.user.theme || 'dark' }>
      <Nav
        pathname={ this.props.pathname }
        user={ this.props.locals.user }
      />

      { 
        this.state.showFlashes && Object.keys(flashes)
          .map((f, i) => <Flashes
            type={ f }
            message={ flashes[f] }
            key={ `flash-${i}` } 
          />)
      }

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
