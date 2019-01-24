import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import PropTypes from 'prop-types'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // static getInitialProps ({ renderPage }) {
  //   const { html, head, errorHtml, chunks } = renderPage()
  //   const styles = flush()
  //   return { html, head, errorHtml, chunks, styles }
  // }
  static getInitialProps ({ renderPage }) {
<<<<<<< HEAD
    const { html, head, errorHtml, chunks } = renderPage()
    // const styles = flush()
    // return { html, head, errorHtml, chunks, styles }
    return renderPage()
=======
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
>>>>>>> 179d71636d41e9c942386102a7c0d5de1160b9f6
  }

  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
<<<<<<< HEAD
          <title>{this.props.title || ''}</title>
=======
>>>>>>> 179d71636d41e9c942386102a7c0d5de1160b9f6
          <meta name="description" content={this.props.description } />
          <meta name="keywords" content={this.props.keywords || ''} />
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta name="HandheldFriendly" content="true" />
          <link rel="canonical" href={this.props.canonical || ''} />

<<<<<<< HEAD
=======
          <title>{this.props.title || ''}</title>
          { this.props.styleTags }
>>>>>>> 179d71636d41e9c942386102a7c0d5de1160b9f6
          {/* How to add analytics scripts */}
          {/* <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXX');`}} /> */}

        </Head>
        <body>
          <Main>
<<<<<<< HEAD
            {/* { this.props.customValue } */}
=======
            { this.props.customValue }
>>>>>>> 179d71636d41e9c942386102a7c0d5de1160b9f6
          </Main>
          <NextScript />
       </body>
      </html>
    )
  }
}

MyDocument.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string
}