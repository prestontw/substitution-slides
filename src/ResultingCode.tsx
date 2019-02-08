import * as React from "react";
import { Controlled as CodeMirror, IInstance } from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';

interface Props {
  code: string;
  onMount: (editor: IInstance) => void;
  onBeforeChange: (value: string) => void;
  run: (cm: IInstance) => void;
}

// setOption extraKeys
class ResultingCode extends React.Component<Props> {

  render() {
    return (
      <div className="ResultingCode">
        <CodeMirror
          value={this.props.code}
          options={{
            lineNumbers: false,
            mode: 'text/x-ocaml',
            readOnly: false,
            extraKeys: {
              "Ctrl-Enter": this.props.run
            }
          }}
          onBeforeChange={(_editor, _data, value) => {
            this.props.onBeforeChange(value);
          }}
          editorDidMount={this.props.onMount}
        /></div>
    );
  }
}

export default ResultingCode;