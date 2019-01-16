import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import PropTypes from 'prop-types'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
        <body>
          <Main>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
              <title>{this.props.title || ''}</title>
              <meta name="description" content={this.props.description } />
              <meta name="keywords" content={this.props.keywords || ''} />
              <meta name="robots" content="INDEX,FOLLOW" />
              <meta name="HandheldFriendly" content="true" />
              <link rel="canonical" href={this.props.canonical || ''} />

              {/* How to add analytics scripts */}
              {/* <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-XXXXX');`}} /> */}

            </Head>
            { this.props.customValue }
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