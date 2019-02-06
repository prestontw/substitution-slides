import * as React from "react";
import { IInstance } from 'react-codemirror2';
import Editor from './Editor';
// following line is so important!
import 'codemirror/lib/codemirror.css';
let dep = require('codemirror/mode/mllike/mllike')

interface Props {
  onChange: (value: string) => void;
  run: (cm: IInstance) => void;
}

// setOption extraKeys
class ResultingCode extends React.Component<Props> {

  render() {
    return (
      <div className="ResultingCode">
        <Editor
          code="edit here"
          mode='text/x-ocaml'
          modePath={dep}
          readOnly={false}
          lineNumbers={false}
          extraKeys={{
            "Ctrl-Enter": this.props.run
          }}
          onMount={() => {}}
          onChange={(_e, _d, value) => {this.props.onChange(value)}}
        /></div>
    );
  }
}

export default ResultingCode;