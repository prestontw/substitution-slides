import * as React from 'react';
import './App.css';
import PreviousStep from './PreviousStep';
import ResultingCode from './ResultingCode';
import Preview from './Preview';
import { IInstance } from 'react-codemirror2';
import * as Util from './Util';

export interface ComponentProgram {
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
  showPreview: boolean;
}

interface Props {

}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { steps: [], showPreview: false };
  }

  endOfDocument(editor: IInstance): CodeMirror.Position {
    let len = editor.lastLine();
    let ch = editor.getLine(len).length;
    return { line: len, ch };
  }

  getNewProgram(reference: IInstance, replace: IInstance): ComponentProgram | undefined {
    let selection = this.getSelection(reference);
    if (selection != undefined) {
      let pre = reference.getRange({ line: 0, ch: 0 }, selection.from);

      let highlight = reference.getRange(selection.from, selection.to);

      let result = replace.getValue();

      let indentedResult = Util.reindentProgram(Util.getLastLine(pre), result);

      let post = reference.getRange(selection.to, this.endOfDocument(reference));

      return { pre, highlight, result: indentedResult, post };
    }
    else {
      return undefined;
    }
  }

  replaceText() {
    // get selection from reference, get pre and post,
    // add new thing to steps,
    let newProgram = this.getNewProgram(this.state.reference!, this.state.replacement!)
    if (newProgram != undefined) {
      this.setState({
        ...this.state,
        steps: this.state.steps.concat([newProgram]),
        showPreview: false
      });
      this.state.replacement!.setValue("");
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
  previewReplace() {
    this.setState({ ... this.state, showPreview: true })
  }
  removeLastStep() {
    let len = this.state.steps.length;
    if (len > 0) {
      this.setState({ ...this.state, steps: this.state.steps.splice(0, len - 1) })
    }
    else {
      // don't remove anything from empty array
    }
  }

  exportTrace(t: ComponentProgram[]) {
    let content = Util.formatPrograms(t);
    let hidden = document.createElement('a');
    hidden.href = 'data:text;charset=utf-8,' + encodeURI(content);
    hidden.target = "_blank";
    hidden.download = 'trace.txt';
    hidden.click();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className="remove" onClick={() => { this.removeLastStep() }}>Remove last</button>
          <button className="preview" onClick={() => { this.previewReplace() }}>Preview</button>
          <button className="replace" onClick={() => { this.replaceText() }}>Replace text</button>
          <button className="export" onClick={() => { this.exportTrace(this.state.steps) }}>Export trace</button>
        </header>
        <div className="App-body">
          <PreviousStep code={this.previousCode()} onMount={editor => { this.setState({ ... this.state, reference: editor }) }} />
          <ResultingCode onMount={editor => {
            this.setState({ ...this.state, replacement: editor });
          }}
            run={_cm => this.replaceText()} />
          {(this.state.showPreview) ?
            <div><p>Preview!</p>
              <Preview code={this.programToString(this.getNewProgram(this.state.reference!,
                this.state.replacement!)!)} />
            </div> :
            undefined}
        </div>
      </div>
    );
  }
}

export default App;
