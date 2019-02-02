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