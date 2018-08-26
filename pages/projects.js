import React from 'react'
import Link from 'next/link'
import MainLayout from '../layouts/main'


class projects extends React.Component {
  static async getInitialProps (context) {
    const { projects } = context.res.locals
    console.log({ projects })
    return { projects }
  }
  render () {
    return <MainLayout>
      <h1>Projects</h1>
      <pre>{ JSON.stringify(this.props.projects, 'utf-8', 2) }</pre>

      <style jsx>{``}</style>
    </MainLayout>
  }
}

export default projects
