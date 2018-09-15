import React from 'react'
import ProjectEntry from '../components/project-entry'

export default class ProjectList extends React.Component {
  render () {
    return <div className="wrapper__cards">
      { this.props.projects.map(p => <ProjectEntry 
        key={`project-${p._id}`} project={ p }
      />) }
    </div>
  }
}
