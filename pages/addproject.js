import React from 'react'
import Layout from '../layouts/main'

class addproject extends React.Component {
  render () {
    return <Layout>
      <h1>Add a new project</h1>
      <form action="addproject" method="post">

        <label for="name">Add a project name</label>
        <input name="name" type="text" placehodler="projectname" />

        <label for="description">add a project description</label>
        <textarea name="description" id="" cols="30" rows="5" />

        <label for="keywords">Keywords</label>
        <ul class="keywords">
          <li>
            <label for="keywords">Keyword</label>
            <input type="checkbox" id="" value="" name="tech" />
          </li>
        </ul>
        
        <label for="tech">Tech used</label>
        <ul class="tech">
          <li>
            <label for="javascript">JS</label>
            <input type="checkbox" id="" value="" name="javscript" />
          </li>
        </ul>


        <label for="publicUrl">Add a public URL</label>
        <input name="publicUrl" type="text" placehodler="Public URL" />

        <label for="privateUrl">Add a private URL</label>
        <input name="privateUrl" type="text" placehodler="Private URL" />

        <label for="publicRepo">Add a public repo</label>
        <input name="publicRepo" type="text" placehodler="Public repo" />

        <label for="privateRepo">Add a private repo</label>
        <input name="privateRepo" type="text" placehodler="private repo" />

        <label for="livedate">Live date</label>
        <input type="date"/>

        <label for="personal-project">Personal project</label>
        <input name="personal-project" type="checkbox" />

        <label for="news-project">news project</label>
        <input name="news-project" type="checkbox" />

        <label for="challenge-project">challenge project</label>
        <input name="challenge-project" type="checkbox" />


        <label for="submit">Submit project</label>
        <input name="submit" type="submit" />
      </form>
    </Layout>
  }
}

export default addproject
