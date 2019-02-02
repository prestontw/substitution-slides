import * as React from 'react';
import './App.css';
import PreviousStep from './PreviousStep';
import ResultingCode from './ResultingCode';
import { IInstance } from 'react-codemirror2';

interface ComponentProgram {
  pre: string;
  highlight: string;
  result: string;
  post: string,
}

interface Selection {
  from: CodeMirror.Position;
  to: CodeMirror.Position;
}
interface State {
  steps: ComponentProgram[];
  reference?: IInstance;
  replacement?: IInstance;
}

interface Props {

}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { steps: [] };
  }

  replaceText() {
    // get selection from reference, get pre and post,
    // add new thing to steps,
    let selection = this.getSelection(this.state.reference);
    if (selection != undefined) {
      let pre = this.state.reference!.getRange({line: 0, ch: 0}, selection.from);
      let highlight = this.state.reference!.getRange(selection.from, selection.to);
      let result = (this.state.replacement != undefined) ? this.state.replacement.getValue() : "WHOOPS, could not read your result";
      let end = {ch: 0, line: 0};
      let post = this.state.reference!.getRange(selection.to, end);

      this.state.steps.push({ pre, highlight, result, post });
      this.forceUpdate();
      this.state.replacement!.setValue("");
    }
    else {
      return;
    }
  }

  getSelection(editor?: IInstance): Selection | undefined {
    if (editor != undefined) {
      return { from: editor.getCursor("start"), to: editor.getCursor("end") };
    }
    else {
      return undefined;
    }
  }

  programToString(p: ComponentProgram): string {
    return p.pre + p.result + p.post;
  }
  previousCode(): string {
    let len = this.state.steps.length;
    console.log(len);
    return (len > 0) ? this.programToString(this.state.steps[len - 1]) : "";
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => { console.log("hello") }}>Select Text</button>
          <button onClick={() => { this.replaceText() }}>Replace text</button>
        </header>
        <PreviousStep code={this.previousCode()} onMount={editor => { this.setState({ ... this.state, reference: editor }) }} />
        <ResultingCode onMount={editor => {
          this.setState({ ...this.state, replacement: editor });
        }} />
      </div>
    );
  }
}

export default App;
