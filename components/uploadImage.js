import React from 'react'

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
  }

  handleImageUpload (e) {
    const reader = new FileReader()
    const file = e.target.files[0]
    const { size } = file
    const mb = 1000000

    if (size > this.state.mazSize * mb) {
      this.setState({ message: `Image is too large, please reduce to under ${this.state.maxSize}Mb` })
      return
    }
    reader.onloadend = async () => {
      const image = new Image()
      image.src = reader.result
      image.onload = e => {
        const { width, height } = e.path[0]
        if (width / height < 1.7 || width / height > 1.8) {
          this.setState({ warning: '⚠️ Optimal image ratio is 16:9' })
        } else {
          this.setState({ warning: null })
        }
        this.setState({ 
          previewUrl: reader.result,
          file: file,
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
        <label htmlFor="image">Upload a display image</label>
        <p><i>Images must be less than { this.state.maxSize }Mb</i></p>
        <input
          name="image"
          id="image"
          type="file"
          accept="image/jpeg, image/png"
          onChange={ this.handleImageUpload.bind(this) }
        />

        { this.state.warning ? <p className="warning">{ this.state.warning }</p> : '' }

        { 
          this.state.previewUrl 
            ? <img src={ this.state.previewUrl } /> 
            : <p><i>{ this.state.message }</i></p>
        }

        <style jsx>{`
          .wrapper {
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
            background: rgba(200, 150, 0, 0.2);
            padding: 12px;
            margin-bottom: 16px;
            border-radius: 4px;
          }
        `}</style>

      </div>
    )
  }

}
