import * as React from "react";
import { Controlled as CodeMirror, IInstance } from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';

interface State {
  value: string;
}
interface Props {
  code: string;
  onMount: (editor: IInstance) => void;
  onChange: (value: string) => void;
  run: (cm: IInstance) => void;
}

// setOption extraKeys
class ResultingCode extends React.Component<Props, State> {

  render() {
    return (
      <div className="ResultingCode">
        <CodeMirror
          value={this.state == undefined? "edit here" : this.state.value}
          options={{
            lineNumbers: false,
            mode: 'text/x-ocaml',
            readOnly: false,
            extraKeys: {
              "Ctrl-Enter": this.props.run
            }
          }}
          onBeforeChange={(_editor, _data, value) => {
            this.setState({value})
          }}
          editorDidMount={this.props.onMount}
          onChange={(_e, _d, value) => { this.props.onChange(value) }}
        /></div>
    );
  }
}

export default ResultingCode;