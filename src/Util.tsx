import { ComponentProgram } from './App';

export function formatPrograms(steps: ComponentProgram[]): string {
  return "[" + steps.map(step => `{pre: \`${step.pre}\`,
highlight: \`${step.highlight}\`,
post: \`${step.post}\`,
result: \`${step.result}\`,}`).join(",\n") + "]";
}

export function formatString(s: string): string {
  return s.replace("\\n", "\n");
}

export function indentProgram(): string {
  return ""
}

// have one that removes indentation of first line from every replace, then adds indentation of highlighted line to every one

// have another one does difference between first and second and second and third, etc., then uses the indentation of the highlight line
// as the basis for those things again:
/*
  something
    else
  here
    too
  yields 0, +1, - 1 (or 0), depnds on schema, then use basis
*/

// take left-most line besides the first and remove spacing in front of it; remove same spacing from all other lines but first

// actually not too sure if should have this auto-indent without
// showing users how this will look...