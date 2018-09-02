import React from 'react'
import Layout from '../layouts/main'
import UploadImage from '../components/uploadImage'
const keywords = require('../functions/keywords')

class addproject extends React.Component {
  static async getInitialProps ({ url }) {
    return { url }
  }

  constructor (props) {
    super(props)
    this.state = {
      keywords: [],
      display: null,
      thumbnail: null,
    }
    this.description = {
     what: React.createRef(),
     why: React.createRef(),
     how: React.createRef(),
     evolution: React.createRef(),
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

  render () {
    console.log('porps before render', this.props.url.pathname)
    return <div>
      <Layout pathname={ this.props.url.pathname || '' }>
        <h1>Add a new project</h1> 

        <hr />
        <form action="addproject" method="post" encType="multipart/form-data">
          <UploadImage />
          <label htmlFor="name">Add a project name</label>
          <input id="name" name="name" type="text" placehodler="projectname" required />

          <hr />
          <h3>About the project</h3>
          <p>What type of project was it?</p>
          <div className="toggles">
            <input className="toggle" id="type_news" type="checkbox" />
            <label className="toggle" htmlFor="type_news">
              News Corp DNA
            </label>

            <input className="toggle" id="type_personal" type="checkbox" />
            <label className="toggle" htmlFor="type_personal">
              Personal
            </label>

            <input className="toggle" id="type_challenge" type="checkbox" />
            <label className="toggle" htmlFor="type_challenge">
              Challenge / Sandbox
            </label>
          </div>

          <hr />
          <label htmlFor="what">What is this project about?</label>
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
          />

          <hr />
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

          <label htmlFor="keywords">Keywords <i>(These are automatically generated from the descriptions above)</i></label>
          <input type="text" name="keywords" value={ this.state.keywords } />
          <p
            name="keywords"
            id="keywords"
          >{ this.state.keywords.join(', ') || <i>No keywords yet</i> }</p>

          
          <hr />
          <label htmlFor="tech">Tech used</label>
          <textarea name="tech" id="tech" rows="5"></textarea>

          {/* <ul className="tech"> */}
            {/* <li> */}
              {/* <label htmlFor="javascript">JS</label> */}
              {/* <input type="checkbox" value="" id="javascript" /> */}
            {/* </li> */}
          {/* </ul> */}


          <hr />
          <label htmlFor="client">Who was it for?</label>
          <input type="text" name="client" id="client" required />
          
          <hr />
          <label htmlFor="learn">What did you learn</label>
          <input type="text" name="learn" id="learn" required />

          <hr />
          <h3>Links</h3>
          <label htmlFor="publicUrl">Public URL</label>
          <input id="publicUrl" type="text" placehodler="Public URL" />

          <label htmlFor="privateUrl">Private URL</label>
          <input id="privateUrl" type="text" placehodler="Private URL" />

          <hr />
          <h3>Repos</h3>
          <label htmlFor="publicRepo">Public repo</label>
          <input id="publicRepo" type="text" placehodler="Public repo" />

          <label htmlFor="privateRepo">Private repo</label>
          <input id="privateRepo" type="text" placehodler="private repo" />

          <hr />

          <label htmlFor="liveDate">When did it go live?</label>
          <input type="date" name="liveDate" id="liveDate" required />

          <hr />
          <input id="submit" type="submit" value="Save project" />

        </form>
      </Layout>

      <style jsx>{`

        input[type=submit] {
          transition: all 200ms;
          cursor: pointer;
          width: 100%;
          background: #ccc;
          color: #333;
          font-size: 18px;
          padding: 12px;
          margin-bottom: 50px;
        }
        
        input[type=submit]:hover {
          background: gold;
        }
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
      `}</style>
    </div>
  }
}

export default addproject
