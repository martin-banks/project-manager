import React from 'react'
import Header from './header'

export default class ProfileHeader extends React.Component {
  render () {
    const { name } = this.props.profile
    const firstname = name.split(' ')[0]
    const lastname = name.split(' ')[1]

    return <Header>
      <div className="avatar">
        <p>{ firstname[0] }{ lastname && lastname[1] }</p>
      </div>
      <h1>{ name }</h1>
      <style jsx>{`
        h1 {
          text-align: center;
        }
        .avatar {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          margin-bottom: 24px;
          border-radius: 100px;
          border: solid 1px white;
          background: linear-gradient(-45deg, lightblue, pink);
        }
        .avatar p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-transform: uppercase;
          margin: 0;
          padding: 0;
          font-size: 20px;
          color: rgba(0,0,0, 0.6);
          font-weight: 900;
        }

      `}</style>

    </Header>





  }

}
