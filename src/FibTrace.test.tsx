import trace from "./FibTrace";

// tests for what is highlighted and resulting program, right?
// resulting program first, and then highlights since highlights dependent on having correct prg's

it('has sensible trace steps', () => {
  // make sure that prefix + result + post of i is prefix + highlight + post of i + 1
  for (let i = 0; i < trace.length - 1; i ++) {
    let current = trace[i];
    let next = trace[i + 1];
    let endString = current.pre + current.result + current.post;
    let startString = next.pre + next.highlight + next.post;

    expect(endString).toEqual(startString);
  }
})

// shape for resulting program should be reference, highlight (as positions), value, and component program it produces

// shape for resulting highlight should be reference, highlight (as positions), value, and next highlight