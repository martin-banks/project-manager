import React from 'react'
import Layout from '../layouts/main'
import { withRouter } from 'next/router'
import Markdown from 'react-markdown'

import UploadImage from '../components/uploadImage'
const keywords = require('../functions/keywords')

class addproject extends React.Component {
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
      keywords: [],
      display: null,
      thumbnail: null,
      saving: false,
      description_md: '',
    }
    this.description = {
      //  what: React.createRef(),
      //  why: React.createRef(),
      //  how: React.createRef(),
      brief: React.createRef(),
      solution: React.createRef(),
      evolution: React.createRef(),
      md: React.createRef(),
    }
  }

  saveImage ({ url, type }) {
    // TODO - include in form submission (custum function posting to server)
    this.setState({
      [type]: url,
    })
  }

  getKeyWords (e) {
    // Each textarea has it's own reference
    // For each keypress we pass the content from all textareas to extraction
    // This way we always have all keywords from all description fields
    const stringToCheck = Object.keys(this.description)
      .map(k => this.description[k].current.value)
      .join(' ')
    const extraction = keywords(stringToCheck)
    const s = this.state
    s.keywords = extraction
    this.setState({ s })
  }

  handleSubmit (e) {
    this.setState({ saving: true })
  }

  storeDescMd () {
    this.setState({
      description_md: this.description.md.current.value
    })
  }

  render () {
    console.log('props before render', this.props.locals)
    return <div>
      <div className="wrapper__header">
        <div className="content">
          <h1>Add a new project</h1> 
        </div>
      </div>
      <Layout
        pathname={ this.props.url.pathname }
        locals={ this.props.locals }
      >
        <form
          action="addproject"
          method="post"
          encType="multipart/form-data"
          onSubmit={ this.handleSubmit.bind(this) }
        >
          <UploadImage />
          <label htmlFor="name">Add a project name</label>
          <input id="name" name="name" type="text" placehodler="projectname" required />

          <hr />
          <h3>About the project</h3>
          <label>What type of project was it?</label>
          <div className="toggles">
            <input className="toggle" id="type_news" type="checkbox" name="category" value="News Corp DNA" />
            <label className="toggle" htmlFor="type_news">
              News Corp DNA
            </label>

            <input className="toggle" id="type_personal" type="checkbox" name="category" value="personal" />
            <label className="toggle" htmlFor="type_personal">
              Personal
            </label>

            <input className="toggle" id="type_challenge" type="checkbox" name="category" value="challenge" />
            <label className="toggle" htmlFor="type_challenge">
              Challenge / Sandbox
            </label>
          </div>

          <hr />
          
          <label htmlFor="description_md">Markdown description</label>
          {/* hightlight will not work with text area */}
          <textarea
            name="description_md"
            id="description_md"
            cols="30"
            rows="5"
            ref={ this.description.md }
            onChange={ this.storeDescMd.bind(this) }
          >
          </textarea>


          <Markdown>
            { this.state.description_md }
          </Markdown>

          <pre>Remove in favor of single markdown field</pre>
          <label htmlFor="brief">Project brief / problem</label>
          <textarea
            id="brief"
            name="brief"
            rows="5"
            ref={ this.description.brief }
            onChange={ this.getKeyWords.bind(this) }
            required
          />

          <label htmlFor="solution">Solution</label>
          <textarea
            id="solution"
            name="solution"
            rows="5"
            ref={ this.description.solution }
            onChange={ this.getKeyWords.bind(this) }
            required
          />
          {/* <label htmlFor="what">What is this project about?</label>
          <textarea
            id="what"
            name="what"
            rows="5"
            ref={ this.description.what }
            onChange={ this.getKeyWords.bind(this) }
            required
          />

          <label htmlFor="how">How did you complete it</label>
          <textarea
            id="how"
            name="how"
            rows="5"
            ref={ this.description.how }
            onChange={ this.getKeyWords.bind(this) }
            required
          />

          <label htmlFor="why">Why did you do it and take this approach</label>
          <textarea
            id="why"
            name="why"
            rows="5"
            ref={ this.description.why }
            onChange={ this.getKeyWords.bind(this) }
            required
          /> */}

          <label htmlFor="evolution">
            How could it be improved or developed further?</label>
          <textarea
            id="evolution"
            name="evolution"
            rows="5"
            ref={ this.description.evolution }
            onChange={ this.getKeyWords.bind(this) }
            required
          />

          <label htmlFor="keywords">
            Keywords <i>(These are automatically generated from the descriptions above)</i>
          </label>
          <input type="hidden" name="keywords" value={ this.state.keywords } />
          <p
            name="keywords"
            id="keywords"
          >{ this.state.keywords.join(', ') || <i>No keywords yet</i> }</p>

          <hr />
          <label htmlFor="tech">Tech used</label>
          <textarea name="tech" id="tech" rows="5"></textarea>

          <hr />
          <label htmlFor="client">Client</label>
          <input type="text" name="client" id="client" required />
          
          <hr />
          <label htmlFor="learn">What did you learn</label>
          <input type="text" name="learn" id="learn" required />

          <hr />
          <h3>Links</h3>
          <label htmlFor="publicUrl">Public URL</label>
          <input id="publicUrl" name="publicUrl" type="text" placehodler="Public URL" />

          <label htmlFor="privateUrl">Private URL</label>
          <input id="privateUrl" name="privateUrl" type="text" placehodler="Private URL" />

          <hr />
          <h3>Repos</h3>
          <label htmlFor="publicRepo">Public repo</label>
          <input id="publicRepo" name="publicRepo" type="text" placehodler="Public repo" />

          <label htmlFor="privateRepo">Private repo</label>
          <input id="privateRepo" name="privateRepo" type="text" placehodler="private repo" />

          <hr />

          <label htmlFor="liveDate">When did it go live?</label>
          <input type="date" name="liveDate" id="liveDate" required />

          <hr />
          <input id="submit" type="submit" value="Save project" />

        </form>
        
        

        <pre>
          { JSON.stringify(this.props.router, 'utf-8', 2) }
        </pre>

        {
          this.state.saving && 
          <div className="overlay">
            <p>Saving project...</p>
          </div>
        }
        
      </Layout>
        <style jsx>{`
          #keywords {
            margin-bottom: 24px;
            opacity: 0.5;
          }
          .toggles {
            margin-bottom: 24px;
          }
          .toggle {
            display: inline-block;
            margin: 2px;
            background: rgba(0,0,0, 0.3);
            border: solid 1px rgba(255,255,255, 0.2);
            padding: 16px
          }

          label.toggle {
            padding: 12px 20px;
            border-radius: 2px;
            font-size: 14px;
          }
          input.toggle {
            display: none;
          }
          input.toggle:checked + label.toggle {
            background: hsl(50, 60%, 45%);
            color: black;
          }
          h1 {
            margin: 0;
            color: white;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.6);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .overlay p {
            
          }
        `}</style>
    </div>


  }
}

export default withRouter(addproject)
