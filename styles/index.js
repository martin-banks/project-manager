export default (<style jsx global>{`
body {
  margin: 0;
  padding: 0;
}
* {
  font-family: "Arial";
}

h1, h2, h3, h4, h5, h6,
p {
  margin: 0;
  margin-bottom: 24px;
}
h1 {
  margin-bottom: 40px;
}
h2 {
  margin-bottom: 36px;
}
h3 {
  margin-bottom: 8px;
}
h4 {
  margin-bottom: 8px;
}
h5 {
  margin-bottom: 8px;
}
h6 {
  margin-bottom: 8px;
}


ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
  padding: 0;
  margin: 5px 0;
}
li.bullet {
  margin-left: 20px;
  list-style: disc;
}

a {
  text-decoration: none;
  color: #ccc;
}
a:hover {
}

img {
  max-width: 100%;
}

input, label {
  display: block;
}
input {
  font-size: 16px;
}
input[type=text],
input[type=date],
textarea {
  box-sizing: border-box;
  background: rgba(0,0,0, 0.2);
  border: solid 1px rgba(255,255,255, 0.2);
  width: 100%;
  padding: 20px;
  border-radius: 2px;
  color: white;
  margin-bottom: 24px;
}
label {
  margin-bottom: 8px;
  opacity: 0.6;
}

hr {
  opacity: 0.1;
  margin: 0;
  margin-bottom: 24px;
}

pre {
  background: rgba(0,0,0, 0.3);
  padding: 20px;
  overflow: auto;
  border: solid 1px rgba(255,255,255, 0.2);
  border-radius: 4px;
  font-family: monospace;
}

.background__gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: linear-gradient(45deg, #111, #333);
  background-repeat: no-repeat;
}
.content {
  padding: 50px;
  padding-top: 100px;
  color: #ccc;
  max-width: 1000px;
  margin: 0 auto;
}



`}</style>)