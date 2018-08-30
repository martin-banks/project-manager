import React from 'react'
import Layout from '../layouts/main'
import TestEditor from '../components/testEditor'
const keywords = require('../functions/keywords')

class addproject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keywords: []
    }
  }

  getKeyWords (e) {
    const extraction = keywords(e.target.value)
    const s = this.state
    s.keywords = extraction
    this.setState({ s })
  }

  render () {
    return <div>
      <Layout>
        <h1>Add a new project</h1>
        <form action="addproject" method="post">

          <hr />
          <label htmlFor="name">Add a project name</label>
          <input id="name" name="name" type="text" placehodler="projectname" required />

          <hr />
          <label htmlFor="description">add a project description</label>
          <textarea
            id="description"
            name="description"
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
          >{ this.state.keywords.join(', ') }</p>

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
          <label htmlFor="client">Client</label>
          <input type="text" name="client" id="client" required />

          <hr />
          <h3>Links</h3>
          <label htmlFor="publicUrl">Add a public URL</label>
          <input id="publicUrl" type="text" placehodler="Public URL" />

          {/* <label htmlFor="privateUrl">Add a private URL</label> */}
          {/* <input id="privateUrl" type="text" placehodler="Private URL" /> */}

          <hr />
          <label htmlFor="publicRepo">Add a public repo</label>
          <input id="publicRepo" type="text" placehodler="Public repo" />

          {/* <label htmlFor="privateRepo">Add a private repo</label> */}
          {/* <input id="privateRepo" type="text" placehodler="private repo" /> */}

          <hr />

          <input type="date" name="liveDate" id="liveDate" required />
          <label htmlFor="liveDate">Live date</label>

          <hr />
          <div className="toggle">
            <label htmlFor="personal-project">
              <input id="personal-project" type="checkbox" />
              Personal project
            </label>
          </div>

          <hr />
          <div className="toggle">
            <label htmlFor="news-project">
              <input id="news-project" type="checkbox" />
              news project
            </label>
          </div>

          <hr />
          <div className="toggle">
            <label htmlFor="challenge-project">
              <input id="challenge-project" type="checkbox" />
              challenge project
            </label>
          </div>

          <hr />
          <label htmlFor="submit">Submit project</label>
          <input id="submit" type="submit" />

        </form>
      </Layout>

      <style jsx>{`
        #keywords {
          margin-bottom: 24px;
          opacity: 0.5;
        }
        hr {
          opacity: 0.3;
        }
        .toggle {
          display: inline-block;
          // padding: 8px 16px;
          background: rgba(255,255,255, 0.3);
        }
        .toggle input, .toggle label {
          display: inline-block;
          vertical-align: center;
          margin: 0;
        }
        .toggle label {
          padding: 8px 16px;
        }
        .toggle input {
          margin-right: 10px;
        }
      `}</style>
    </div>
  }
}

export default addproject
