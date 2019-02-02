import * as React from 'react';
import './App.css';
import PreviousStep from './PreviousStep';
import ResultingCode from './ResultingCode';
import { IInstance } from 'react-codemirror2';

interface State {
  steps: string[];
  selection?: { from: CodeMirror.Position, to: CodeMirror.Position };
  reference?: IInstance;
  replacement?: IInstance;
}
interface Props {

}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { steps: [], selection: undefined };
  }

  replaceText() {

  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => { }}>Select Text</button>
          <button onClick={this.replaceText}>Replace text</button>
        </header>
        <PreviousStep code="hello(amanda)" onMount={editor => { this.setState({... this.state, reference: editor })}} />
        <ResultingCode onMount={editor => {
          this.setState({ ...this.state, replacement: editor });
        }} />
      </div>
    );
  }
}

export default App;
