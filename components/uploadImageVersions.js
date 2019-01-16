import React from 'react'

// will need function prop to send image file data back to parent
export default class UploadImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewUrl: null,
      file: null,
      allow: true,
      message: 'No file to preview',
      thumbnail: null,
      warning: null,
      maxSize: 5,
    }
    this.thumbnail = React.createRef()
    this.display = React.createRef()
  }

  makeThumbnail (url) {
    const crops = [
      {
        type: 'display',
        maxWidth: 1000,
      },
      {
        type: 'thumbnail',
        maxWidth: 300,
      },
    ]
    crops.forEach(crop => {
      const { type, maxWidth } = crop
      const image = new Image()
      image.src = url
      image.onload = () => {
        const canvas = this[type].current
        const ctx = canvas.getContext('2d')
        const maxHeight = image.height / image.width * maxWidth
        canvas.width = maxWidth
        canvas.height = maxHeight
        ctx.clearRect(0, 0, maxWidth, maxHeight)
        ctx.drawImage(image, 0, 0, maxWidth, maxHeight)
        const url = canvas.toDataURL('image/jpeg', 0.6)
        this.setState({ thumbnail: url })
        this.props.onUpload({ url, type })
      }
    })
  }

  handleImageUpload (e) {
    const reader = new FileReader()
    const file = e.target.files[0]
    const { size } = file
    const mb = 1000000

    if (size > this.state.mazSize * mb) {
      this.setState({ message: `Image is too large, please reduce to under ${this.state.mazSize}Mb` })
      return
    }
    reader.onloadend = async () => {
      const image = new Image()
      image.src = reader.result
      image.onload = e => {
        const { width, height } = e.path[0]
        if (width / height < 1.7 || width / height > 1.8) {
          this.setState({ warning: '⚠️ Images should be at a 16:9 ratio to prevent dynamic cropping' })
        } else {
          this.setState({ warning: null })
        }
        this.setState({ 
          previewUrl: reader.result,
          file: file,
        })
        this.props.onUpload({
          url: reader.result,
          type: 'imageDisplay',
        })
        this.makeThumbnail(reader.result)
        return
      }
    }
    reader.readAsDataURL(file)
  }

  render () {
    return (
      <div className="wrapper">
        <form>
          <label htmlFor="file">Upload a display image</label>
          <p><i>Images must be less than { this.state.maxSize }Mb</i></p>
          <input
            name="file"
            id="file"
            type="file"
            accept="image/jpeg, image/png"
            onChange={ this.handleImageUpload.bind(this) }
          />
        </form>

        { this.state.warning ? <p className="warning">{ this.state.warning }</p> : '' }

        {/* { 
          this.state.previewUrl 
            ? <img src={ this.state.previewUrl } /> 
            : <p><i>{ this.state.message }</i></p>
        } */}

        <canvas ref={ this.display } width="0" height="0"></canvas>
        <canvas ref={ this.thumbnail } width="0" height="0"></canvas>

        <style jsx>{`
          {/* .wrapper {
            margin-bottom: 24px
          }
          img {
            max-width: 400px;
          }
          i {
            color: #666;
          }
          input {
            border: none;
            padding: 16px 0;
          }
          p.warning {
            // color: #333;
            background: rgba(200, 150, 0, 0.2);
            padding: 12px;
            margin-bottom: 16px;
            border-radius: 4px;
          } */}
        `}</style>
      </div>
    )
  }

}
