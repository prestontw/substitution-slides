import * as Util from './Util';

it('uses multi-line strings', () => {
  expect(Util.formatString("hi\\nthere")).toEqual(`hi
there`);
})

it('gets number of spaces for string correct 0', () => {
  expect(Util.numSpacePrefixString("hello there")).toBe(0)
})
it('gets number of spaces for string correct 2', () => {
  expect(Util.numSpacePrefixString("  hello there")).toBe(2)
})
it('finds min space for else', () => {
  expect(Util.minNumSpacePrefix(`    0
  else
    fib(n - 1) + fib(n - 2)`.split("\n"))).toBe(2);
})
it('strips helpful correctly', () => {
  expect(Util.stripProgram(`  if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`if n < 1
  1
else
  fact(n - 1)`)
})
it('strips normal correctly', () => {
  expect(Util.stripProgram(`if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`if n < 1
  1
else
  fact(n - 1)`)
})

// unfortunate, but not a lot I can do without indentation info
it('keeps same indentation for two line program', () => {
  expect(Util.stripProgram(`months_to_buy_xbox(receive_allowance { amount = 119; allowance = 23 },
    receive_allowance { amount = 86; allowance = 14 }, 0 + 1)`)).toEqual(
    `months_to_buy_xbox(receive_allowance { amount = 119; allowance = 23 },
    receive_allowance { amount = 86; allowance = 14 }, 0 + 1)`
    )
})

it('indents helpful correctly (no space)', () => {
  expect(Util.reindentProgram("fact 5", `  if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`if n < 1
  1
else
  fact(n - 1)`)
})
it('indents normal correctly (no space)', () => {
  expect(Util.reindentProgram("fact 5", `if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`if n < 1
  1
else
  fact(n - 1)`)
})
it('indents helpful correctly (starting space)', () => {
  expect(Util.reindentProgram("  fact 5", `  if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`  if n < 1
    1
  else
    fact(n - 1)`)
})
it('indents normal correctly (starting space)', () => {
  expect(Util.reindentProgram("  fact 5", `if n < 1
    1
  else
    fact(n - 1)`)).toEqual(`  if n < 1
    1
  else
    fact(n - 1)`)
})
/**
 * assuming things have been indented well before now, so
 * months... 
 *     something
 * either shouldn't happen or should be correct
 */
it("doesn't remove second line spacing in two line program", () => {
  expect(Util.reindentProgram("", `months_to_buy(receive_allowance {},
  receive_allowance {}, 0 + 1)`)).toEqual(`months_to_buy(receive_allowance {},
  receive_allowance {}, 0 + 1)`)
})

it('gets some correct ranges', () => {
  expect(Util.getRange([''], {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}})).toEqual("");

  expect(Util.getRange(['let fib n =','  3'],
  {from: {line: 0, ch: 0}, to: {line: 1, ch: 2}})).
    toEqual("let fib n =\n  ")
})