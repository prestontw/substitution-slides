/* yeah, cm for now
   https://github.com/reasonml/reason-tools/blob/master/src/extension/common/vendor/codeMirror.re
   */
type editor;

[@bs.module "react-codemirror2"]
external codeMirror: ReasonReact.reactClass = "UnControlled";
[@bs.send] external execCommand: (editor, string) => unit = "";

let make =
    (
      ~autoFocus: option(bool)=?,
      ~style: option(Js.t({..}))=?,
      ~value: option(string)=?,
      ~editorDidMount: option(editor => unit)=?,
      ~onChange: option(string => unit)=?,
      ~options: option(Js.t({..}))=?,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=codeMirror,
    ~props={
      "autoFocus":
        switch (autoFocus) {
        | Some(true) => true
        | Some(false)
        | None => false
        },
      "style": Js.Undefined.fromOption(style),
      "value": Js.Undefined.fromOption(value),
      "onBeforeChange": (_editor, _data, value) =>
        switch (onChange) {
        | Some(onChange) => onChange(value)
        | None => ()
        },
      "editorDidMount": Js.Undefined.fromOption(editorDidMount),
      "options": Js.Undefined.fromOption(options),
    },
    children,
  );