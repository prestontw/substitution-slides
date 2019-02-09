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

export interface Selection {
  from: CodeMirror.Position;
  to: CodeMirror.Position;
}
interface State {
  steps: ComponentProgram[];
  reference?: IInstance;
  replacement?: string;
  replacementEditor?: IInstance;
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

  getPre(editor: IInstance | undefined, selection: Selection | undefined): string | undefined {
    if (editor != undefined && selection != undefined)
      return editor.getRange({ line: 0, ch: 0 }, selection.from);
    else
      return undefined;
  }
  getNewProgram(reference?: IInstance, replace?: string): ComponentProgram | undefined {
    let selection = this.getSelection(reference);
    if (selection != undefined && replace != undefined) {
      let pre = reference!.getRange({ line: 0, ch: 0 }, selection.from);

      let highlight = reference!.getRange(selection.from, selection.to);

      let result = replace;

      let indentedResult = Util.reindentProgram(Util.getLastLine(pre), result);

      let post = reference!.getRange(selection.to, this.endOfDocument(reference!));

      return { pre, highlight, result: indentedResult!, post };
    }
    else {
      return undefined;
    }
  }

  replaceText() {
    // get selection from reference, get pre and post,
    // add new thing to steps,
    let newProgram = this.getNewProgram(this.state.reference!, this.state.replacement!)
    console.log(newProgram);
    if (newProgram != undefined) {
      this.setState({
        ...this.state,
        steps: this.state.steps.concat([newProgram]),
        replacement: "",
      });
      // this.state.replacementEditor!.setValue("");
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

  programToString(p?: ComponentProgram): string | undefined {
    if (p != undefined)
      return p.pre + p.result + p.post;
    else
      return undefined;
  }
  previousCode(): string {
    let len = this.state.steps.length;
    console.log(len);
    return (len > 0) ? this.programToString(this.state.steps[len - 1])! : "";
  }
  previewReplace() {
    this.setState({ ... this.state, showPreview: !this.state.showPreview })
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
  getLast<A>(arr: A[]): A | undefined {
    let len = arr.length;
    if (len > 0) {
      return arr[len - 1];
    }
    else {
      return undefined;
    }
  }

  highlightCharStart(prefix: string | undefined): number {
    return (prefix != undefined) ? prefix.length : 0;
  }
  highlightCharEnd(highlightedLines: string[], prefixLength: number): number {
    let hlast = this.getLast(highlightedLines);
    return ((highlightedLines.length == 1) ? prefixLength : 0) + (hlast != undefined ? hlast.length : 0);
  }
  highlightStartAndEnd(prefix: { lines: string[], stub: string } | undefined, highlight: string | undefined): Selection | undefined {
    if (prefix == undefined || highlight == undefined) {
      return undefined
    }
    let pArr = prefix.lines;
    let pLast = prefix.stub;
    let hArr = highlight.split("\n");
    let start = { line: pArr.length - 1, ch: this.highlightCharStart(pLast) };
    // if on same line need to add them together
    let end = { line: start.line + hArr.length - 1, ch: this.highlightCharEnd(hArr, start.ch) }
    return { from: start, to: end };
  }
  highlightPositions(reference: IInstance | undefined, replacement: string | undefined): Selection | undefined {

    let preString = this.getPre(reference, this.getSelection(reference));
    if (preString == undefined) return undefined;
    let preLines = preString.split("\n");
    let preStub = this.prefixStub(preLines)!; // can do this since preString is not undefined

    let positions = this.highlightStartAndEnd({ lines: preLines, stub: preStub },
      Util.reindentProgram(preStub, replacement));
    return positions;
  }

  prefixStub(prefixLines: string[] | undefined): string | undefined {
    if (prefixLines == undefined) {
      return undefined;
    }
    else {
      let pLast = this.getLast(prefixLines);
      return pLast;
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
    let setReference = (editor: IInstance) => { this.setState({ ... this.state, reference: editor }) };
    let setReplacementEditor = (editor: IInstance) => { this.setState({ ...this.state, replacementEditor: editor }) };
    let setReplacement = (value: string) => { this.setState({ ...this.state, replacement: value }) };
    let code = this.state.replacement != undefined ? this.state.replacement : "edit here";
    // really, should do highlight positions after getting new program...
    let positions = this.highlightPositions(this.state.reference, this.state.replacement);
    let previewCode = this.programToString(this.getNewProgram(this.state.reference,
      this.state.replacement));

    return (
      <div className="App">
        <header className="App-header">
          <button className="remove" onClick={() => { this.removeLastStep() }}>Remove last</button>
          <button className="preview" onClick={() => { this.previewReplace() }}>Toggle preview</button>
          <button className="replace" onClick={() => this.replaceText()}>Replace text</button>
          <button className="export" onClick={() => { this.exportTrace(this.state.steps) }}>Export trace</button>
        </header>
        <div className="App-body">
          <PreviousStep code={this.previousCode()} onMount={setReference} />
          <ResultingCode
            code={code}
            onMount={setReplacementEditor}
            onBeforeChange={setReplacement}
            run={_cm => this.replaceText()} />
          {(this.state.showPreview) ?
            <div><p>Preview!</p>
              <Preview
                positions={positions}
                code={previewCode} />
            </div> :
            undefined}
        </div>
      </div>
    );
  }
}

export default App;
