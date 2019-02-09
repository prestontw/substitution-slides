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

export function getLastLine(s: string): string {
  let list = s.split("\n");
  return list[list.length - 1];
}

export function reindentProgram(prefix: string, program: string | undefined): string | undefined {
  if (program != undefined) {
    // strip program, then add prefixed spaces of prefix to stripped
    let numToAdd = numSpacePrefixString(prefix);
    let strippedString = stripProgram(program);
    if (numToAdd == 0) {
      return strippedString
    }
    else {
      let stripped = strippedString.split("\n");
      if (stripped.length == 1) {
        return strippedString;
      }
      else {
        let pre = " ".repeat(numToAdd);
        return stripped.map(s => pre + s).join("\n")
      }
    }
  }
  else return undefined
}

export function stripProgram(p: string): string {
  let lines = p.split("\n");
  // check if first line has any indentation
  if (lines[0].length > 0 && lines[0].charAt(0) == " ") {
    let numSpaces = minNumSpacePrefix(lines);
    return removePrefixes(lines, " ".repeat(numSpaces)).join("\n")
  }
  else {
    if (lines.length == 1) {
      return lines[0];
    }
    else if (lines.length == 2) {
      return p;
    }
    else {
      let laterLines = lines.splice(1);
      let numSpaces = minNumSpacePrefix(laterLines);
      return lines[0] + "\n" + removePrefixes(laterLines, " ".repeat(numSpaces)).join("\n")
    }
  }
}

export function numSpacePrefixString(s: string): number {
  let index = 0;
  while (s.charAt(index) == " ")
    index += 1;
  return index;
}

export function minNumSpacePrefix(ss: string[]): number {
  if (ss.length > 0)
    return ss.map(numSpacePrefixString).reduce((a, b) => (a < b) ? a : b);
  else
    return 0;
}

function removePrefixes(ss: string[], prefix: string): string[] {
  let re = new RegExp("^" + prefix);
  return ss.map(s => removePrefix(s, re))
}
function removePrefix(s: string, prefix: RegExp): string {
  return s.replace(prefix, '');
}