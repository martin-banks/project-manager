import { createGlobalStyle } from 'styled-components'

// @import url('https://fonts.googleapis.com/css?family=Oswald:200,400,700');
// extralia-light: 200
// light: 300
// regular: 400
// medium: 500
// semi-bold: 600
// bold: 700

// @import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');


export default createGlobalStyle`
  
  /* @import url('https://fonts.googleapis.com/css?family=Oswald:200,400,700'); */
  @import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i");


  html {
    font-size: 8px;
    color: #333;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    padding: 0;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: "Helvetica Neue", sans-serif;
  }

  nav {
    top: 0;
    left: 0;
    width: 100%;
    margin:0;
    margin-bottom: 5rem;
    ul {
      display: flex;
    }
    li {
      position: relative;
      flex: 0 0 auto;
      top: 0;
      display: inline-block;
      margin: 0;
      padding: 3rem 1rem;
      vertical-align: top;
      opacity: 0.6;
      border-top: solid 2px rgba(0,0,0,0);
      &.active {
        opacity: 0.8;
        /* background:  rgba(0,0,0, 0.4); */
        border-bottom: solid 2px #333;
      }
      &.user {}
      &:hover {
        background: rgba(200, 200, 200, 0.2);
        opacity: 1;
      }
    }
    div.spacer {
      flex: 1 1 auto;
    }
  }


  h1, h2, h3, h4, h5, h6 {
    font-family:
      "Barlow Condensed",
      "Oswald",
      "Helvertica Neue",
      sans-serif;
    font-weight: 300;
    margin: 0
  }

  h1 {
    font-size: 8rem;
    font-weight: 300;
    margin-bottom: 5rem;
  }
  h2 {
    font-size: 6rem;
    margin-bottom: 4rem;
  }
  h3 {
    font-size: 5rem;
    margin-bottom: 2rem;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  h4 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  h5 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  h6 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p, a, ul, ol, li {
    font-size: 2rem;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
  }

  ul, ol {}

  li {
    list-style: none;
  }

  a {
    transition: all 250ms;
    text-decoration: none;
    /* border-bottom: solid 2px rgba(200, 170, 0, 0.6); */
    border-bottom: none;
    /* background: rgba(200, 170, 0, 0); */
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    &:hover {
      background: rgba(200, 170, 0, 1);
    }
  }


  nav a {
    border: none;
  }
  button {
    /* background: rgba(0,0,0, 0.2); */
    border: solid 1px rgba(0,0,0, 0.1);
    border-radius: 0.5rem;
    margin: 0;
    margin-bottom: 3rem;
    padding: 2rem 3rem;
    /* color: white; */
    font-size: 2rem;
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  input, label {
    display: block;
  }
  input, textarea {
    font-size: 2rem;
  }
  input[type=text],
  input[type=email],
  input[type=password],
  input[type=submit],
  input[type=date],
  textarea {
    box-sizing: border-box;
    /* background: rgba(0,0,0, 0.4); */
    border: none;
    border-bottom: solid 1px rgba(255,255,255, 0.5);
    width: 100%;
    padding: 2rem;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
  }

  input:focus,
  textarea:focus,
  button:focus {
    /* outline: solid 2px orange; */
  }

  input[type=submit] {
    /* transition: all 200ms; */
    cursor: pointer;
    width: 100%;
    background: rgba(255,255,255, 0.2);
    font-size: 12rem;
    padding: 2rem;
    margin-bottom: 5rem;
  }
  input[type=submit]:hover {
    background: gold;
    color: black
  }

  /* input[type=submit]:focus {
    outline: solid 2px orange;
  } */
  label {
    margin-bottom: 1rem;
    opacity: 0.8;
  }


  hr {
    opacity: 0.1;
    margin: 0;
    margin-bottom: 3rem;
  }


  pre {
    background: rgba(0,0,0, 0.3);
    color: white;
    padding: 3rem;
    overflow: auto;
    border: solid 1px rgba(255,255,255, 0.2);
    border-radius: 0.5rem;
    font-family: monospace;
  }

  footer {
    padding: 5rem 0;
    margin-top: 12rem;
    border-top: solid 1px rgba(255,255,255, 0.2)
  }

  img {}


`


