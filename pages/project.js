import React from 'react'
import { withRouter } from 'next/router'
import MainLayout from '../layouts/main'
import Markdown from 'react-markdown'
// import fetch from 'isomorphic-fetch'

class Par extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
    }
  }

  handleClick () {
    const s = this.state
    s.edit = !this.state.edit
    this.setState(s)
  }

  render (props) {
    return (
      <div>
        <button onClick={ this.handleClick.bind(this) } >Edit</button>
        { this.state.edit ? <input value={ this.props.desc } /> : <p>{ this.props.desc }</p>}
      </div>
    )
  }
}

class Project extends React.Component {
  static getInitialProps (context) {
    const { logo } = context.res.locals
    console.log({ logo })
    return logo
  }
  render () {
    return <MainLayout>
      <h1>{ this.props.router.query.details.name }</h1>
      <Markdown source={ this.props.router.query.details.description } />

      {/* <p>{ this.props.router.query.details.description || '--' }</p> */}
      <Par desc={ this.props.router.query.details.description }/>

      <pre>{ JSON.stringify(this.props.router.query.details, 'utf-8', 2) }</pre>

      <style jsx global>{`

      `}</style>
    </MainLayout>
  }
}

// Project.getInitialProps = async function (context) {
//   // console.log('fetching show data')
//   // const { id } = context.query
//   // const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
//   // const show = await res.json()
//   // console.log(`Fetched show: ${show.name}`)
//   // console.log('show information', show)
  
//   return { id: '123' }
// }

export default withRouter(Project)
