export default (<style jsx global>{`
[data-theme="dark"] * {
  color: #ccc;
}
[data-theme="dark"] .background__gradient {
  background-image: linear-gradient(45deg, #111, #333);
}
[data-theme="dark"] .nav__logo {
  fill: #ccc;
}


[data-theme="light"] * {
  color: #333;
}
[data-theme="light"] .background__gradient {
  background-image: linear-gradient(45deg, #fff, #ccc);
}
[data-theme="light"] .nav__logo {
  fill: #333;
}




body {
  margin: 0;
  padding: 0;
}
* {
  font-family: "Arial", sans-serif;
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
}
a:hover {
}
a button {
  background: rgba(0,0,0, 0.2);
  border: solid 1px rgba(255,255,255, 0.2);
  border-radius: 4px;
  margin: 0;
  margin-bottom: 24px;
  padding: 12px 32px;
  color: white;
  font-size: 14px;
  cursor: pointer;
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
input[type=email],
input[type=password],
input[type=submit],
input[type=date],
textarea {
  box-sizing: border-box;
  background: rgba(0,0,0, 0.2);
  border: solid 1px rgba(255,255,255, 0.2);
  width: 100%;
  padding: 20px;
  border-radius: 2px;
  margin-bottom: 24px;
}
input[type=submit] {
  transition: all 200ms;
  cursor: pointer;
  width: 100%;
  background: rgba(255,255,255, 0.2);
  font-size: 18px;
  padding: 12px;
  margin-bottom: 50px;
}
input[type=submit]:hover {
  background: gold;
  color: black
}
input:focus {
  outline: solid 2px gold;
}
input[type=submit]:focus {
  outline: solid 2px orange;
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
  color: white;
  padding: 20px;
  overflow: auto;
  border: solid 1px rgba(255,255,255, 0.2);
  border-radius: 4px;
  font-family: monospace;
}

.wrapper__cards {
  display: flex;
  flex-wrap: wrap;
}
img.cloudinaryImage {
  width: 100%;
}
img.cloudinaryImage__thumbnail {
  border: solid 1px lime;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(20px);
}
.background__gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-repeat: no-repeat;
}
.content {
  padding: 50px;
  max-width: 1400px;
  margin: 0 auto;
}



`}</style>)