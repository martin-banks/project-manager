import React from 'react'
import { withRouter } from 'next/router'
import MainLayout from '../layouts/main'
import fetch from 'isomorphic-fetch'

class Project extends React.Component {
  render () {
    return <MainLayout>
      <p>project page</p>
      <p>{ this.props.router.query.id }</p>
      <h1>{ this.props.show.name }</h1>
      <p>{ this.props.show.summary.replace(/<[/]?p>/g, '') }</p>
      <img src={ this.props.show.image.medium } alt={ this.props.show.name } />

      <pre>{ JSON.stringify(this.props, 'utf-8', 2) }</pre>
    </MainLayout>
  }
}

Project.getInitialProps = async function (context) {
  console.log('fetching show data')
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  console.log(`Fetched show: ${show.name}`)
  // console.log('show information', show)
  
  return { show }
}

export default withRouter(Project)
