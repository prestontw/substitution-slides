import * as React from "react";
import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2';
// following line is so important!
import 'codemirror/lib/codemirror.css';

interface Props {
  code?: string;
  onMount: (editor: IInstance) => void;
  extraKeys?: CodeMirror.KeyMap;
  modePath: any;
  mode: string;
  readOnly?: boolean;
  lineNumbers?: boolean;
  onChange?: (editor: IInstance, data: CodeMirror.EditorChange, value: string) => void;
}

// setOption extraKeys
class Editor extends React.Component<Props> {
  // might need to make text on change too since not persisting highlights
  render() {
    return (
      <CodeMirror
        value={this.props.code}
        options={{
          mode: this.props.mode,
          extraKeys: this.props.extraKeys,
          lineNumbers: this.props.lineNumbers,
          readOnly: this.props.readOnly,
        }}
        editorDidMount={this.props.onMount}
        onChange={this.props.onChange}
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