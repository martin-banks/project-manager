import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../layouts/main'
import Markdown from 'react-markdown'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'
// import fetch from 'isomorphic-fetch'


class Project extends React.Component {
  static async getInitialProps (context) {
    const output = {
      locals: context.res && context.res.locals,
      url: context.url,
    }
    return output
  }

  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      details: {},
      displayWidth: 1200,
    }
  }

  componentDidMount() {
    this.setState({
      displayWidth: Math.min(window.innerWidth - 100, 1400)
    })
  }
  render () {
    console.log('project props', this.props.router.query)
    const {
      description_md,
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
      author,
      author_name,
      client,
    } = this.props.router.query.details

    
    let publishedDate = null
    if (liveDate) {
      const d = new Date(liveDate)
      const day = d.getDate()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      publishedDate = `${day} - ${month} - ${year}`
    }
    

    return <Layout
      pathname={ this.props.url.pathname }
      locals={ this.props.locals }
    >
      {/*
       // TODO Store content in state before component mount then itterate to render
      */}

      <div>
        <div className="wrapper__image">
          {/* <Image
            className="cloudinaryImage__thumbnail"
            cloudName="martinbanks"
            publicId={ display }
            width="50"
            crop="scale"
          /> */}
          <Image
            className="cloudinaryImage"
            cloudName="martinbanks"
            publicId={ display }
            width={ this.state.displayWidth }
            crop="scale"
          />
        </div>

        <div className="wrapper__text">
          { name && <h1>{ name }</h1>}
          <Markdown>{ description_md }</Markdown>

          { author && 
            <a href={ `/profile/${author}` }
            >
              <button>
                More projects by { author_name || 'this author' }
              </button>
            </a>
          }

          {
            client && <>
              <h3>Client</h3>
              <Markdown>{ client }</Markdown>
            </>
          }

          {
            what && <>
              <h3>What</h3>
              <Markdown>{ what }</Markdown>
            </>
          }
          
          {
            why && <>
              <h3>Why</h3>
              <Markdown>{ why }</Markdown>
            </>
          }

          {
            how && <>
              <h3>How</h3>
              <Markdown>{ how }</Markdown>
            </>
          }

          {
            learn && <>
              <h3>Learn</h3>
              <Markdown>{ learn }</Markdown>
            </>
          }

          {
            evolution && <>
              <h3>Taking it further</h3>
              <Markdown>{ evolution }</Markdown>
            </>
          }

          {
            publishedDate && <>
              <h3>Published</h3>
              <Markdown>{ publishedDate }</Markdown>
            </>
          }
          
          {
            tech && <>
              <h3>Tech</h3>
              <ul>
                {
                  tech.map(t => (<li
                    key={ `tech-${t}` }
                    className="bullet"
                  >{ t }</li>))
                }
              </ul>
            </>
          }

          {
            (publicUrl || privateUrl) && <h3>Preview link</h3>
          }

          {
            publicUrl && <a href={ publicUrl }>
              <button>Preview - public</button>
            </a>
          }

          {
            privateUrl && <a href={ privateUrl }>
              <button>Preview - private</button>
            </a>
          }

          {
            (publicUrl || privateUrl) && <h3>Repo / files link</h3>
          }

          {
            publicRepo && <a href={ publicRepo }>
              <button>Repo - public</button>
            </a>
          }

          {
            privateRepo && <a href={ privateRepo }>
              <button>Repo - private</button>
            </a>
          }
        </div>
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
        ul {
          margin-bottom: 24px;
        }
        .wrapper__image {
          position: relative;
          margin-bottom: 32px;
        }
        .wrapper__text {
          max-width: 1000px;
          margin: 0 auto;
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
