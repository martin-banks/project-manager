import React from 'react'
import Layout from '../layouts/main'

class addproject extends React.Component {
  render () {
    return <Layout>
      <h1>Add a new project</h1>
      <form action="addproject" method="post">

        <label for="name">Add a project name</label>
        <input name="name" type="text" placehodler="projectname" />

        <label for="submit">Submit project</label>
        <input name="submit" type="submit" />
      </form>
    </Layout>
  }
}

export default addproject
