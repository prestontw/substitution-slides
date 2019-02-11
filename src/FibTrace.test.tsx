import trace from "./FibTrace";
import { Selection } from './App';
import { getNewProgram } from './Util';

// tests for what is highlighted and resulting program, right?
// resulting program first, and then highlights since highlights dependent on having correct prg's

it('has sensible trace steps', () => {
  // make sure that prefix + result + post of i is prefix + highlight + post of i + 1
  for (let i = 0; i < trace.length - 1; i++) {
    let current = trace[i];
    let next = trace[i + 1];
    let endString = current.pre + current.result + current.post;
    let startString = next.pre + next.highlight + next.post;

    expect(endString).toEqual(startString);
  }
})

// shape for resulting program should be reference, highlight (as positions), value, and component program it produces
it('produces FibTrace programs', () => {
  let replacements: { selection: Selection, replace: string }[] = [
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 6, ch: 0 }, to: { line: 6, ch: 5 } },
      replace: `if 5 < 2 then
    1
  else
    fib (5 - 1) + fib (5 - 2)`
    },
    {
      selection: { from: { line: 6, ch: 3 }, to: { line: 6, ch: 8 } },
      replace: "false"
    },
    {
      selection: { from: { line: 6, ch: 0 }, to: { line: 9, ch: 27 } },
      replace: `fib (5 - 1) + fib (5 - 2)`
    },
    {
      selection: { from: { line: 6, ch: 4 }, to: { line: 6, ch: 4 + 7 } },
      replace: "4"
    },
    {
      selection: { from: { line: 6, ch: 12 }, to: { line: 6, ch: 12 + 7 } },
      replace: "3"
    },
    {
      selection: { from: { line: 6, ch: 0 }, to: { line: 6, ch: 5 } },
      replace: `(if 4 < 2 then
    1
  else
    fib (4 - 1) + fib (4 - 2))`
    },
    {
      selection: { from: { line: 6, ch: 4 }, to: { line: 6, ch: 9 } },
      replace: "false"
    },
    {
      selection: { from: { line: 6, ch: 1 }, to: { line: 9, ch: 27 } },
      replace: `fib (4 - 1) + fib (4 - 2)`
    },
    {
      selection: { from: { line: 6, ch: 5 }, to: { line: 6, ch: 12 } },
      replace: "3"
    },
    {
      selection: { from: { line: 6, ch: 13 }, to: { line: 6, ch: 20 } },
      replace: "2"
    },
    {
      selection: { from: { line: 6, ch: 1 }, to: { line: 6, ch: 6 } },
      replace: `(if 3 < 2 then
    1
  else
    fib (3 - 1) + fib (3 - 2))`
    },
    {
      selection: { from: { line: 6, ch: 5 }, to: { line: 6, ch: 10 } },
      replace: "false"
    },
    {
      selection: { from: { line: 6, ch: 2 }, to: { line: 9, ch: 27 } },
      replace: `fib (3 - 1) + fib (3 - 2)`
    },
    {
      selection: { from: { line: 6, ch: 6 }, to: { line: 6, ch: 13 } },
      replace: "2"
    },
    {
      selection: { from: { line: 6, ch: 14 }, to: { line: 6, ch: 21 } },
      replace: "1"
    },
    {
      selection: { from: { line: 6, ch: 2 }, to: { line: 6, ch: 7 } },
      replace: `(if 2 < 2 then
    1
  else
    fib (2 - 1) + fib (2 - 2))`
    },
    {
      selection: { from: { line: 6, ch: 6 }, to: { line: 6, ch: 11 } },
      replace: "false"
    },
    {
      selection: { from: { line: 6, ch: 3 }, to: { line: 9, ch: 27 } },
      replace: trace[18].result
    },
    {
      selection: { from: { line: 6, ch: 7 }, to: { line: 6, ch: 14 } },
      replace: "1"
    },
    {
      selection: { from: { line: 6, ch: 15 }, to: { line: 6, ch: 22 } },
      replace: "0"
    },
  ];
  expect(replacements.length).toBe(trace.length);
  for (let i = 0; i < replacements.length; i++) {
    let current = replacements[i];
    let reference = trace[i];
    expect(getNewProgram(reference.pre + reference.highlight + reference.post,
      current.selection, current.replace)).toEqual(trace[i])
  }
})

// shape for resulting highlight should be reference, highlight (as positions), value, and next highlight