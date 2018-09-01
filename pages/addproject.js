import React from 'react'
import Layout from '../layouts/main'
import UploadImage from '../components/uploadImage'
const keywords = require('../functions/keywords')

class addproject extends React.Component {
  static async getInitialProps ({ url }) {
    console.log('gip', { url })
    return { url }
  }
  constructor (props) {
    super(props)
    this.state = {
      keywords: [],
      displayImage: null,
    }
  }

  saveDisplayImage (base64) {
    // TODO - size validation
    // TODO - create size variants
    // TODO - include in form submission (custum function posting to server)
    console.log({ base64 })
    this.setState({
      displayImage: base64,
    })
  }

  getKeyWords (e) {
    const extraction = keywords(e.target.value)
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
        <UploadImage
          onUpload={ this.saveDisplayImage.bind(this) }
        />

        <hr />
        <form action="addproject" method="post">
          <label htmlFor="name">Add a project name</label>
          <input id="name" name="name" type="text" placehodler="projectname" required />




          <hr />
          <h3>About the project</h3>
          <p>What type of project was it?</p>
          <div className="toggles">
            <input className="toggle" id="news-project" type="checkbox" />
            <label className="toggle" htmlFor="news-project">
              News Corp DNA
            </label>

            <input className="toggle" id="personal-project" type="checkbox" />
            <label className="toggle" htmlFor="personal-project">
              Personal
            </label>

            <input className="toggle" id="challenge-project" type="checkbox" />
            <label className="toggle" htmlFor="challenge-project">
              Challenge / Sandbox
            </label>
          </div>

          <hr />
          <label htmlFor="what">What is this project about?</label>
          <textarea
            id="what"
            name="what"
            cols="30"
            rows="5"
            onChange={ this.getKeyWords.bind(this) }
            required
          />
          
          <hr />
          <label htmlFor="how">How did you complete it</label>
          <textarea
            id="how"
            name="how"
            cols="30"
            rows="5"
            onChange={ this.getKeyWords.bind(this) }
            required
          />

          <hr />
          <label htmlFor="why">Why did you do it and take this approach</label>
          <textarea
            id="why"
            name="why"
            cols="30"
            rows="5"
            onChange={ this.getKeyWords.bind(this) }
            required
          />


          

          <hr />
          <label htmlFor="keywords">Keywords</label>
          <p
            name="keywords"
            id="keywords"
          >{ this.state.keywords.join(', ') || <i>No keywords yet</i> }</p>

          {/* <h3 htmlFor="keywords">Keywords</h3> */}
          {/* <ul class="keywords"> */}
            {/* <li> */}
              {/* <label htmlFor="keyword">Keyword</label> */}
              {/* <input type="checkbox" id="" value="" id="keyword" /> */}
            {/* </li> */}
          {/* </ul> */}
          
          {/* <h3 htmlFor="tech">Tech used</h3> */}
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
          <input id="submit" type="submit" value="Submit new project" />

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
        hr {
          opacity: 0.1;
          margin: 0;
          margin-bottom: 32px;
        }
        label {
          margin-bottom: 12px
        }

        .toggles {
          margin-bottom: 24px;
        }
        .toggle {
          display: inline-block;
          margin: 2px;
          background: rgba(255,255,255, 0.3);
          padding: 16px
        }
        // .toggle input,
        // .toggle label {
        //   display: inline-block;
        //   vertical-align: center;
        //   margin: 0;
        // }
        label.toggle {
          padding: 8px 16px;
          border-radius: 2px
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
