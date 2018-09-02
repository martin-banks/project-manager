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
          publicId={ this.props.router.query.details.display }
          width={ this.state.displayWidth }
          crop="scale"
        />
        
        { this.props.router.query.details.name && <h1>{ this.props.router.query.details.name }</h1>}

        <Markdown>{ this.props.router.query.details.what }</Markdown>
        <Markdown>{ this.props.router.query.details.why }</Markdown>
        <Markdown>{ this.props.router.query.details.how }</Markdown>
        <Markdown>{ this.props.router.query.details.liveDate }</Markdown>
      </div>

      <pre>{ JSON.stringify(this.props.router.query.details, 'utf-8', 2) }</pre>
      <pre>{ JSON.stringify(this.state, 'utf-8', 2) }</pre>

      <style jsx global>{`
        hr {
          opacity: 0.2;
          margin-top: 24px;
        }
        h3 {
          margin-bottom: 8px;
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
