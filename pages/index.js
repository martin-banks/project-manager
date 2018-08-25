import Link from 'next/link'
import MainLayout from '../layouts/main'
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

class Index extends React.Component {
  render () {
    return <MainLayout>
      <h1>Hello world</h1>
      <ul>
        { this.props.shows.map(s => <li>
            <Link href={ `/p/${s.show.id}` }>
            <a>{ s.show.name }</a>
          </Link></li>
        ) }
      </ul>
      <pre>
        { JSON.stringify(this.props.shows, 'utf-8', 2) }
      </pre>
    </MainLayout>
  }
}

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const shows = await res.json()
  console.log('number of shows: ', shows.length)
  return { shows }
}

export default Index