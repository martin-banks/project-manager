import React from 'react'
import { Image } from 'cloudinary-react'

export default class ProjectEntry extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageWidth: 400,
    }
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

  componentDidMount () {
    this.setState({ imageWidth: window.innerWidth * 0.8 })
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
          <div className="cloudinaryImage">
            <Image
              cloudName="martinbanks"
              publicId={ this.props.project.display }
              width={ this.state.imageWidth }
              crop="scale"
            />
          </div>
        {/* </div> */}
      {/* </div> */}
      <style jsx>{`
        .card {
          transition: background 200ms, outline 200ms;
          flex: 1 1 auto;
          border-radius: 0px;
          background: rgba(0,0,0, 0);
          width: 100%;
          padding: 4rem;
          margin: 0 auto;
          margin-bottom: 6rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          background: #fff;
        }
        .card:hover {
          background: rgba(235,232,255, 1);
          outline: 1px solid rgba(50,0,50, 0.2);
        }
        .cloudinaryImage {
          outline: 1px solid pink;
          background: rgba(100,100,100, 1);
          flex: 1 1 auto;
          min-width: 350px;
          max-width: 60vw;
        }
        .wrapper__text {
          flex: 1 1 auto;
          max-width: 50%;
          outline: solid 1px lime;
        }
      `}</style>
    </a>
  }
}
