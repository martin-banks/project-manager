import React from 'react'
import { Image } from 'cloudinary-react'

export default class ProjectEntry extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log('project info', this.props.project)
    return <a
      className="card"
      href={ `/p/${this.props.project._id}` }
      key={ `project-${this.props.project._id}` }
    >
      <div>
        <div className="wrapper__image">
          <Image
            className="cloudinaryImage"
            cloudName="martinbanks"
            publicId={ this.props.project.display }
            width="300"
            crop="scale"
          />
        </div>
        <div className="wrapper__text">
          <h3>{ this.props.project.name }</h3>
        </div>
      </div>
      <style jsx>{`
        .card {
          transition: all 300ms;
          flex: 1 1 auto;
          border-radius: 4px;
          background: rgba(0,0,0, 0);
          min-width: 200px;
          width: 300px;
          max-width: 400px;
          padding: 16px;
          margin-bottom: 8px;
        }
        .card:hover {
          background: rgba(0,0,0, 0.4);
        }
        .wrapper__image {
          width: 100%;
          margin-bottom: 16px;
        }
        .wrapper__text {
        }
      `}</style>
    </a>
  }
}
