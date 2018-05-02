import React from 'react'

function normalizeLineEndings(str) {
  if (!str) return str
  return str.replace(/\r\n|\r/g, '\n')
}

class Editor extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.codeMirror &&
      nextProps.value !== undefined &&
      nextProps.value !== this.props.value &&
      normalizeLineEndings(this.codeMirror.getValue()) !==
        normalizeLineEndings(nextProps.value)
    ) {
      var prevScrollPosition = this.codeMirror.getScrollInfo()
      this.codeMirror.setValue(nextProps.value)
      this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top)
    }
  }
  componentDidMount() {
    // Lazily require to ensure requiring GraphiQL outside of a Browser context
    // does not produce an error.
    const CodeMirror = require('codemirror')
    require('codemirror/addon/fold/foldgutter')
    require('codemirror/addon/fold/brace-fold')
    require('codemirror/addon/dialog/dialog')
    require('codemirror/addon/search/search')
    require('codemirror/addon/search/searchcursor')
    require('codemirror/addon/search/jump-to-line')
    require('codemirror/keymap/sublime')
    require('codemirror-graphql/results/mode')

    this.codeMirror = CodeMirror(this._node, {
      lineWrapping: true,
      lineNumbers: true,
      preserveScrollPosition: true,
      value: this.props.value || '',
      readOnly: this.props.readOnly,
      theme: this.props.editorTheme || 'graphiql',
      mode: this.props.mode || 'graphql-results',
      keyMap: 'sublime',
      foldGutter: {
        minFoldSize: 4,
      },
      viewportMargin: Infinity,
      gutters: ['CodeMirror-foldgutter'],
      // info: Boolean(this.props.ResultsTooltip),
      extraKeys: {
        // Persistent search box in Query Editor
        'Cmd-F': 'findPersistent',
        'Ctrl-F': 'findPersistent',

        // Editor improvements
        'Ctrl-Left': 'goSubwordLeft',
        'Ctrl-Right': 'goSubwordRight',
        'Alt-Left': 'goGroupLeft',
        'Alt-Right': 'goGroupRight',
      },
    })
    this.codeMirror.on('change', (doc, change) => {
      if (this.props.onChange && change.origin !== 'setValue') {
        this.props.onChange(doc.getValue(), change)
      }
    })
    this.codeMirror.setSize(null, '90vh')
  }

  componentWillUnmount() {
    this.codeMirror = null
  }

  render() {
    return (
      <div
        className="result-window"
        ref={node => {
          this._node = node
        }}
      />
    )
  }
  /**
   * Public API for retrieving the CodeMirror instance from this
   * React component.
   */
  getCodeMirror() {
    return this.codeMirror
  }

  /**
   * Public API for retrieving the DOM client height for this component.
   */
  getClientHeight() {
    return this._node && this._node.clientHeight
  }
}

export default Editor
