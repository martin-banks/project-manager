import React from 'react'
import Layout from '../layouts/main.js'

export default class Screenshot extends React.Component {

  render () {
    return (
      <div>
        <Layout>
          <form action="/screenshot" method="POST">
            <label htmlFor="upload">Image</label>
            <input id="upload" name="upload" type="file" />
            <input type="submit" />
          </form>
        </Layout>
        <style jsx>{`
          input {
            box-sizing: border-box;
            width: 100%;
          }
        `}</style>
      </div>

    )
  }
}