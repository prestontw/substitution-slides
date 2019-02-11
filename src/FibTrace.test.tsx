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
    },/*
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },
    {
      selection: { from: { line: 0, ch: 0 }, to: { line: 0, ch: 0 } },
      replace: trace[0].result
    },*/
  ];
  // expect(replacements.length).toBe(trace.length);
  for (let i = 0; i < replacements.length; i++) {
    let current = replacements[i];
    let reference = trace[i];
    expect(getNewProgram(reference.pre + reference.highlight + reference.post,
      current.selection, current.replace)).toEqual(trace[i])
  }
})

// shape for resulting highlight should be reference, highlight (as positions), value, and next highlight