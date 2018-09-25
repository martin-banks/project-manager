const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify').promisify

require('dotenv').config({ path: '.env' })


const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

// transport.sendMail({
//   from: 'Martin Banks <anotherbanksy@gmail.com>',
//   to: 'name@email.com',
//   html: '<h1>Hello world</h1>',
//   text: 'Hello world text',
// })

const generateHTML = ({ filename, options }) => {
  console.log({ filename })
  const html = pug.renderFile(`${__dirname}/../emails/${filename}.pug`, options)
  console.log({ html })
  return html
}

exports.send = async options => {
  console.log('\n\n\n\n')
  console.log(options)
  console.log('\n\n\n\n')

  const { filename = 'foo' } = options
  console.log(filename)
  // const html = generateHTML({ filename, options })
  const mailOptions = {
    from: 'Martin Banks <anotherbanksy@gmail.com>',
    to: options.user.email,
    subject: options.subject,
    // html,
    html: `
      <h1>Reset link</h1>
      <a href="${options.resetUrl}">${options.resetUrl}</a>
    `,
    text: 'Reset text',
  }
  return transport.sendMail(mailOptions)
}
