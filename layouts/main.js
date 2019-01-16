import React from 'react'
// import styles from '../styles'
import GlobalStyles from '../styles/global'
import Nav from '../components/nav'
import Flashes from '../components/flashes'
import BackgroundStripe from '../styled-components/background-stripes'


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
      <BackgroundStripe/>
      <Nav
        pathname={ this.props.pathname }
        user={ this.props.locals.user }
      />

      <div className="background__gradient"></div>
      { 
        this.state.showFlashes && Object.keys(flashes)
          .map((f, i) => <Flashes
            type={ f }
            message={ flashes[f] }
            key={ `flash-${i}` } 
          />)
      }

      <div className="content">
        { this.props.children }
      </div>

      {/* <pre>
        locals: { JSON.stringify(this.props.locals, 'utf-8', 2) }
      </pre> */}

      <footer></footer>

      {/* { styles } */}
      <GlobalStyles />
    </div>
  }
}

export default MainLayout
