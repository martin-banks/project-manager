const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
console.log({ args })

// const users = fs
//   .readFileSync(path.join(__dirname, 'user-whitelist.txt'), 'utf-8')
//   .split('\n')
const users = require('./new_users.json')
  .map(user => {
    const { email, permissions } = user
    // const token = md5(`${email}__${role}`)
    const token = md5(email)
    return {
      email,
      hash: token,
      permissions,
      link: `/register/${token}`
    }
  })

console.log(JSON.stringify(users, null, 2))

