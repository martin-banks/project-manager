import React from 'react'
import { Image } from 'cloudinary-react'

export default class ProjectEntry extends React.Component {
  constructor (props) {
    super(props)
  }

  displayDate (d) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]
    const newDate = new Date(d)
    const year = newDate.getFullYear()
    const month = months[newDate.getMonth()]
    const days = newDate.getDate()
    return `${days} / ${month} / ${year}`

  }

  render () {
    console.log('project info', this.props.project)
    return <a
      className="card"
      href={ `/p/${this.props.project._id}` }
      key={ `project-${this.props.project._id}` }
    >
      {/* <div> */}
        {/* <div className="wrapper__image"> */}
          <div className="wrapper__text">
            <p>{ this.displayDate(this.props.project.liveDate) }</p>
            <h3>{ this.props.project.name }</h3>
          </div>
          <Image
            className="cloudinaryImage"
            cloudName="martinbanks"
            publicId={ this.props.project.display }
            width={ 600 }
            crop="scale"
          />
        {/* </div> */}
      {/* </div> */}
      <style jsx>{`
        .card {
          {/* outline: solid 1px purple; */}
          transition: all 300ms;
          flex: 1 1 auto;
          border-radius: 4px;
          background: rgba(0,0,0, 0);
          {/* min-width: 200px; */}
          width: 100%;
          max-width: 1000px;
          padding: 16px;
          margin: 0 auto;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        .card:hover {
          background: rgba(50,0,50, 0.2);
        }
        .cloudinaryImage {
          flex: 1 1 auto;
        }
        .wrapper__image {
          width: 100%;
          margin-bottom: 16px;
        }
        .wrapper__text {
          flex: 1 1 auto;
        }
      `}</style>
    </a>
  }
}
