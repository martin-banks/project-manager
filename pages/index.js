import Link from 'next/link'
import MainLayout from '../layouts/main'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

// const Index = () => (
//   <div>
//     <Nav />
//     <h1>Hello world</h1>
//     <Link href="/about">
//       <a>This is my about link</a>
//     </Link>
//   </div>
// )

const ShowLink = ({ show }) => (
  <li>

    <Link href={ `/p/${show.id}` }>
      <a>{ show.name }</a>
    </Link>
  </li>
)

class Index extends React.Component {
  static async getInitialProps (context) {
    console.log({ context })
    const response = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const shows = await response.json()
    console.log('number of shows: ', shows.length)
    const output = {
      shows, 
      locals: context.res && context.res.locals
    }
    return output
  }

  render () {
    return <MainLayout>
      <h1>Hello world</h1>
      <ul>
        { this.props.shows.map(s => (
          <ShowLink show={ s.show } key={ s.show.id } />
        )) }
      </ul>
      <pre>
        { JSON.stringify(Object.keys(this.props), 'utf-8', 2) }
        { JSON.stringify(this.props.locals, 'utf-8', 2) }
      </pre>
      
    </MainLayout>
  }
}


export default withRouter(Index)