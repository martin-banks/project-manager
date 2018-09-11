import React from 'react'

export default class Flashes extends React.Component {
  render () {
    const { type, message } = this.props
    return <div>
      <div className={ `flash flash__${type}` } >
        <h4>{ type }</h4>
        <p>{ message }</p>
      </div>

      <style jsx>{`
        .flash {
          position: relative;
          margin-bottom: 50px;
          padding: 20px;
          color: white;
        } 
        .flash__info {
          background: rgba(0, 100, 255, 0.5);
        } 
        .flash__success {
          background: rgba(0, 200, 200, 0.5);
        }
        .flash__warning {
          background: rgba(255, 255, 0, 0.5);
        }
        .flash__error {
          background: rgba(200, 0, 0, 0.5);
        }
        h4 {
          text-transform: uppercase;
          margin: 0;
          margin-bottom: 4px;
        }
        p {
          margin: 0;
        }
      `}</style>
    </div>
  }
}