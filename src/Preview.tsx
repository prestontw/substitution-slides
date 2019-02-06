import * as React from "react";
// import { IInstance } from 'react-codemirror2';
import Editor from './Editor';
import {Selection} from './App';
import {IInstance} from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';
let dep = require('codemirror/mode/mllike/mllike')

interface Props {
  code?: string;
  positions?: Selection;
}

// setOption extraKeys
class CodePreview extends React.Component<Props> {

  markText(editor: IInstance, positions?: Selection) {
    if (positions != undefined) {
      editor.markText(positions.from, positions.to, { className: "highlighted" })
    }
  }
  render() {
    return (
      <div className="ResultingCode">
        <Editor
          code={this.props.code}
          mode='text/x-ocaml'
          modePath={dep}
          readOnly={true}
          lineNumbers={true}
          onMount={editor => this.markText(editor, this.props.positions)}
          onChange={(editor, _d, _v) => this.markText(editor, this.props.positions)}
        /></div>
    );
  }
}

export default CodePreview;