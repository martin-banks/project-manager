const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const users = fs
  .readFileSync(path.join(__dirname, 'user-whitelist.txt'), 'utf-8')
  .split('\n')
  .map(email => ({
    email,
    hash: md5(email),
    link: `localhost:3000/register/${md5(email)}`
  }))

console.log({users})
