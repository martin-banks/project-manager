import React from 'react'
import Layout from '../layouts/main.js'

export default class Screenshot extends React.Component {

  render () {
    return (
      <div>
        <Layout>
          <form action="/screenshot" method="post">
            <label htmlFor="url">Url</label>
            <input id="url" name="url" type="text" />
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