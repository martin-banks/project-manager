import React from 'react'


// will need function prop to send image file data back to parent
export default class UploadImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewUrl: null,
      file: null,
    }
  }


  handleSubmit (e) {
    e.preventDefault()
    console.log('skipping submit')
    return

  }
  handleImageUpload (e) {
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      const s = this.state
      // TODO - size validation
      this.setState({ 
        previewUrl: reader.result,
        file: file,
       })
      this.props.onUpload(reader.result)
    }
    reader.readAsDataURL(file)
  }

  render () {
    return (
      <div>
        
        <form onSubmit={ this.handleSubmit.bind(this) } >
          <label htmlFor="file">File upload</label>
          <input
            name="file"
            id="file"
            type="file"
            onChange={ this.handleImageUpload.bind(this) }
          />
          <input type="submit" />
        </form>

        { this.state.previewUrl ? <img src={ this.state.previewUrl } /> : 'No preview'}
      </div>
    )
  }

}
