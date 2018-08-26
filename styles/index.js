export default `* {
  font-family: "Arial";
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
  color: #ccc;
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
}

.background__gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: linear-gradient(45deg, #111, #333);
  background-repeat: no-repeat
}
.content {
  padding: 50px;
  color: #ccc
}

`