import * as React from "react";
import { IInstance } from 'react-codemirror2';
import Editor from './Editor';
// following line is so important!
import 'codemirror/lib/codemirror.css';
let dep = require('codemirror/mode/mllike/mllike')

interface Props {
  onMount: (editor: IInstance) => void;
  code: string;
  // maybe want to have highlights for position?
}

// setOption extraKeys
class CodePreview extends React.Component<Props> {

  render() {
    return (
      <div className="ResultingCode">
        <Editor
          code={this.props.code}
          mode='text/x-ocaml'
          modePath={dep}
          readOnly={true}
          lineNumbers={true}
          onMount={this.props.onMount}
        /></div>
    );
  }
}

export default CodePreview;