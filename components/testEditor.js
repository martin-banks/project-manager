import React from 'react'
import ReactDom from 'react-dom'
import { Editor, EditorState, RichUtils } from 'draft-js'

class TestEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
    this.onChange = editorState => this.setState({ editorState })
    this.handleKeyCommands = this.handleKeyCommands.bind(this)
  }

  handleKeyCommands (command, editorState) {
    const newState = RichUtils.handleKeyCommands(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  onBoldClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  onItalicClick () {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  
  render () {
    return (
      <div>
        <button onClick={ this.onBoldClick.bind(this) }>B</button>
        <button onClick={ this.onItalicClick.bind(this) }>I</button>
        <Editor
          editorState={ this.state.editorState }
          handleKeyCommands={ this.handleKeyCommands }
          onChange={ this.onChange }
        />
      </div>
    )
  }
}

export default TestEditor
 