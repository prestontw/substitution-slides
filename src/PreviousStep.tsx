import * as React from "react";
import {IInstance} from 'react-codemirror2';
import Editor from './Editor';

export interface Props {
  code: string;
  onMount: (editor: IInstance) => void;
}

class PreviousStep extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  // might need to make text on change too since not persisting highlights
  render() {
    const value = this.props.code;

    return (
      <div className="PreviousStep">
      <Editor
        code={value}
        mode='text/x-ocaml'
        modePath={require('codemirror/mode/mllike/mllike')}
        lineNumbers={true}
        readOnly={true}
        onMount={this.props.onMount}
      /></div>
    );
  }
}

export default PreviousStep;