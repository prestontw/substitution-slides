
type state = {
  steps: list(Util.program),
  selected: string,
};

type action =
  | Selected
  | ReplaceWith
  | Export;

let component = ReasonReact.reducerComponent("Example");

let make = (_children) => {
  ...component,
  initialState: () => {steps: [], selected: "" },
  reducer: (action, state) => {
    switch (action) {
      | Selected => ReasonReact.Update({...state, selected: "selected"})
      | ReplaceWith => ReasonReact.Update({...state, selected: "selected"})
      | Export => ReasonReact.Update({...state, selected: "selected"})
    }
  },
  render: _self => {
    <CodeMirror value="hello" />
  }
}