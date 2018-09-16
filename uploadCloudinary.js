const cloudinary = require('cloudinary')
const Datauri = require('datauri')
const uuid = require('uuid')

require('dotenv').config({ path: '.cloudinary.env' })
const c = process.env.CLOUD

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

module.exports = function (req, res, next) {
  console.log('----\nreq body', req.body, '----\n')
  const base64 = new Datauri()
  base64.format(`.${req.file.mimetype.split('/')[1]}`, req.file.buffer)

  cloudinary.uploader.upload(
    base64.content,
    (result, err) => {
      console.log(err || result)
      req.body.display = result.public_id
      res.cloudinary = {
        result,
        err,
      }
      next()
    },
    {
      public_id: `${uuid.v4()}__${req.body.name || 'missing'}`,
      tags: ['additional', 'things'],
      caption: 'after title',
      alt: 'after desc',
      folder: 'projects',

    }
  )

}

