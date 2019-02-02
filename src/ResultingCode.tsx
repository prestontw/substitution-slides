import * as React from "react";
import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';
require('codemirror/mode/scheme/scheme');
require('codemirror/mode/clike/clike');
require('codemirror/mode/mllike/mllike')

interface Props {
  onMount: (editor: IInstance) => void;
}

class Editor extends React.Component<Props> {

  // might need to make text on change too since not persisting highlights
  render() {
    return (
      <CodeMirror
        value="edit here"
        options={{
          mode: 'text/x-ocaml',
        }}
        editorDidMount={this.props.onMount}
      />
    );
  }
}

export default Editor;

/*
render() {
  <CodeMirror editorDidMount={editor => { editor.markText(...) }}/>
}
*/