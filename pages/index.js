import Link from 'next/link'

const Index = () => (
  <div>
    <h1>Hello world</h1>
    <Link href="/about">
      <a>This is my about link</a>
    </Link>
  </div>
)

export default Index