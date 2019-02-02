import * as React from "react";
import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';
require('codemirror/mode/scheme/scheme');
require('codemirror/mode/clike/clike');
require('codemirror/mode/mllike/mllike')

export interface Props {
  code: string;
  positions?: {
    from: CodeMirror.Position,
    to: CodeMirror.Position
  };
}

class Editor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private markText = (editor: IInstance) => {
    if (this.props.positions != undefined) {
      editor.markText(this.props.positions.from, this.props.positions.to, { className: "highlighted" })
    }

  }
  // might need to make text on change too since not persisting highlights
  render() {
    const value = this.props.code;

    return (
      <CodeMirror
        value={value}
        options={{
          mode: 'text/x-ocaml',
          lineNumbers: true,
          readOnly: true,
        }}
        onChange={this.markText}
        editorDidMount={this.markText}
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