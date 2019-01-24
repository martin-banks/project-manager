import React from 'react'
// import styles from '../styles'
import GlobalStyles from '../styles/global'
import Nav from '../components/nav'
import Flashes from '../components/flashes'
import BackgroundStripe from '../styled-components/background-stripes'
import styled from 'styled-components'

const Content = styled.div`
  display: block;
  width: 100%;
  max-width: 1200px;
  padding: 0 3rem;
  margin: 0 auto
`


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
      <BackgroundStripe />
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

      <Content>
        { this.props.children }
      </Content>

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
