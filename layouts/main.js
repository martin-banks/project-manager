import React from 'react'
import Nav from '../components/nav'
import styles from '../styles'

const layoutStyle = {
  margin: 0,
  padding: 20,
  margin: 20,
  border: 'solid 1px purple'
  // background: 'linear-gradient(45deg, #111, #555)',

}

class MainLayout extends React.Component {
  render () {
    return <div style={ layoutStyle }>
      <Nav />
      { this.props.children }
      -
      <style jsx global>{ `
* {
  font-family: "Arial";
}
body {
  background: linear-gradient(45deg, #111, #333);
  color: #ccc
}

ul {
  padding: 0;
}

li {
  list-style: none;
  margin: 5px 0;
}

a {
  text-decoration: none;
  color: gold;
}

a:hover {
  opacity: 0.6;
}

input, label {
  display: block;
}
input, textarea {
  background: rgba(255,255,255, 0);
  border: solid 1px rgba(255,255,255, 0.6);
  padding: 20px;
  border-radius: 2px;
  color: white;
  margin-bottom: 24px;
}
label {
}` }</style>
    </div>
  }
}

export default MainLayout
