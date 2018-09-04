import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'
import Markdown from 'react-markdown'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import fetch from 'isomorphic-fetch'


// ! DEPRICATED
// class Par extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       edit: false,
//       value: null,
//     }
//   }

//   componentDidMount () {
//     const s = this.state
//     s.value = this.props.desc
//     this.setState({ s })
//   }

//   // handleClick () {
//   //   const s = this.state
//   //   s.edit = !this.state.edit
//   //   this.setState(s)
//   // }

//   handleChange (e) {
//     this.props.handleChange(e)
//   }


//   render () {
//     return (
//       <div>
//         <button onClick={ this.props.onClick } >Edit</button>
//         { this.props.edit
//             ? <input value={ this.state.value } onChange={ this.handleChange.bind(this) } /> 
//             : <p>{ this.state.value }</p>
//         }
//       </div>
//     )
//   }
// }


class Project extends React.Component {
  // static async getInitialProps ({ url }) {
  //   return { url }
  // }

  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      details: {},
      displayWidth: 0,
    }
  }

  // handleToggleEdit () {
  //   const s = this.state
  //   s.edit = !this.state.edit
  //   console.log(this.state.edit)
  //   this.setState(s)
  // }

  // handleChange (e) {
  //   console.log('change!!!')
  //   const s = this.state
  //   s.desc = e.target.value
  //   this.setState({ s })
  // }

  // componentDidMount () {
  //   const s = this.state
  //   s.desc = this.props.router.query.details.description
  //   this.setState({ s })
  // }

  componentDidMount() {
    this.setState({
      displayWidth: Math.min(window.innerWidth - 100, 1000)
    })
  }
  render () {
    console.log('project props', this.props.router.query)
    const {
      display,
      name,
      tech,
      publicUrl,
      privateUrl,
      publicRepo,
      privateRepo,
      what,
      why,
      how,
      learn,
      evolution,
      liveDate,
    } = this.props.router.query.details
    return <Layout pathname={ this.props.url.pathname || '' }>
      {/* <Markdown source={ this.props.router.query.details.description } /> */}

      {/* <p>{ this.props.router.query.details.description || '--' }</p> */}
      {/* <Par
        desc={ this.props.router.query.details.description }
        edit={ this.state.edit }
        onClick={ this.handleToggleEdit.bind(this) }
        onChange={ this.handleChange.bind(this) }
      /> */}


      {/* 
        // TODO consider separate layout 
        // TODO loop over all content items 
        // TODO submit changes back to server for DB update 
      */}
      {/* <button onClick={ this.handleToggleEdit.bind(this) } >Edit</button>
      { this.state.edit
          ? <input value={ this.state.desc } onChange={ this.handleChange.bind(this) } /> 
          : <p>{ this.state.desc }</p>
      } */}

      {/*
       // TODO Store content in state before component mount then itterate to render
      */}

      <div>
        <Image
          cloudName="martinbanks"
          publicId={ display }
          width={ this.state.displayWidth }
          crop="scale"
        />
        
        { name && <h1>{ name }</h1>}

        <h3>What</h3>
        <Markdown>{ what || '--' }</Markdown>

        <h3>Why</h3>
        <Markdown>{ why || '--' }</Markdown>

        <h3>How</h3>
        <Markdown>{ how || '--' }</Markdown>

        <h3>Learn</h3>
        <Markdown>{ learn || '--' }</Markdown>

        <h3>Taking it further</h3>
        <Markdown>{ evolution || '--' }</Markdown>

        <h3>Published</h3>
        <Markdown>{ liveDate || '--' }</Markdown>

        <h3>Tech</h3>
        <ul>
          { tech && tech.map(t => (<li className="bullet">{ t }</li>))}
        </ul>

        { publicUrl && <a href={ publicUrl }><h3>Preview - public</h3></a> }

        { privateUrl && <a href={ privateUrl }><h3>Preview - private</h3></a> }

        { publicRepo && <a href={ publicRepo }><h3>Repo - public</h3></a> }

        { privateRepo && <a href={ privateRepo }><h3>Repo - private</h3></a> }


      </div>

      <pre>{ JSON.stringify(this.props.router.query.details, 'utf-8', 2) }</pre>
      <pre>{ JSON.stringify(this.state, 'utf-8', 2) }</pre>

      <style jsx>{`
        hr {
          opacity: 0.2;
          margin-top: 24px;
        }
        h3 {
          margin-bottom: 8px;
        }
        p {
          margin-bottom: 24px;
        }
      `}</style>
    </Layout>
  }
}

// Project.getInitialProps = async function (context) {
//   // console.log('fetching show data')
//   // const { id } = context.query
//   // const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
//   // const show = await res.json()
//   // console.log(`Fetched show: ${show.name}`)
//   // console.log('show information', show)
  
//   return { id: '123' }
// }

export default withRouter(Project)
