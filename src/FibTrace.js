export let trace = [
  // 0
  {
    pre: ``,
    highlight: ``,
    post: ``,
    result: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
fib 5`,
  },
  // 1
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
`,
    highlight: `fib 5`,
    post: ``,
    // this is entered as if,    1,  else,    fib
    result: `if 5 < 2 then
  1
else
  fib (5 - 1) + fib (5 - 2)`,
  },
  // 2
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
if `,
    highlight: `5 < 2`,
    post: ` then
  1
else
  fib (5 - 1) + fib (5 - 2)`,
    result: `false`,
  },
  // 3
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
`,
    highlight: `if false then
  1
else
  fib (5 - 1) + fib (5 - 2)`,
    post: ``,
    result: `fib (5 - 1) + fib (5 - 2)`,
  },
  // 4
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
fib `,
    highlight: `(5 - 1)`,
    post: ` + fib (5 - 2)`,
    result: `4`,
  },
  // 5
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
fib 4 + fib `,
    highlight: `(5 - 2)`,
    post: ``,
    result: `3`,
  },
  // 6
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
`,
    highlight: `fib 4`,
    post: ` + fib 3`,
    result: `(if 4 < 2 then
  1
else
  fib (4 - 1) + fib (4 - 2))`,
  },
  // 7
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(if `,
    highlight: `4 < 2`,
    post: ` then
  1
else
  fib (4 - 1) + fib (4 - 2)) + fib 3`,
    result: `false`,
  },
  // 8
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(`,
    highlight: `if false then
  1
else
  fib (4 - 1) + fib (4 - 2)`,
    post: `) + fib 3`,
    result: `fib (4 - 1) + fib (4 - 2)`,
  },
  // 9
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(fib `,
    highlight: `(4 - 1)`,
    post: ` + fib (4 - 2)) + fib 3`,
    result: `3`,
  },
  // 10
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(fib 3 + fib `,
    highlight: `(4 - 2)`,
    post: `) + fib 3`,
    result: `2`,
  },
  // 11
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(`,
    highlight: `fib 3`,
    post: ` + fib 2) + fib 3`,
    result: `(if 3 < 2 then
  1
else
  fib (3 - 1) + fib (3 - 2))`,
  },
  // 12
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
((if `,
    highlight: `3 < 2`,
    post: ` then
  1
else
  fib (3 - 1) + fib (3 - 2)) + fib 2) + fib 3`,
    result: `false`,
  },
  // 13
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
((`,
    highlight: `if false then
  1
else
  fib (3 - 1) + fib (3 - 2)`,
    post: `) + fib 2) + fib 3`,
    result: `fib (3 - 1) + fib (3 - 2)`,
  },
  // 14
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
((fib `,
    highlight: `(3 - 1)`,
    post: ` + fib (3 - 2)) + fib 2) + fib 3`,
    result: `2`,
  },
  // 15
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
((fib 2 + fib `,
    highlight: `(3 - 2)`,
    post: `) + fib 2) + fib 3`,
    result: `1`,
  },
  // 16
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
((`,
    highlight: `fib 2`,
    post: ` + fib 1) + fib 2) + fib 3`,
    result: `(if 2 < 2 then
  1
else
  fib (2 - 1) + fib (2 - 2))`,
  },
  // 17
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(((if `,
    highlight: `2 < 2`,
    post: ` then
  1
else
  fib (2 - 1) + fib (2 - 2)) + fib 1) + fib 2) + fib 3`,
    result: `false`,
  },
  // 18
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(((`,
    highlight: `if false then
  1
else
  fib (2 - 1) + fib (2 - 2)`,
    post: `) + fib 1) + fib 2) + fib 3`,
    result: `fib (2 - 1) + fib (2 - 2)`,
  },
  // 19
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(((fib `,
    highlight: `(2 - 1)`,
    post: ` + fib (2 - 2)) + fib 1) + fib 2) + fib 3`,
    result: `1`,
  },
  // 20
  {
    pre: `let rec fib n =
  if n < 2 then
    1
  else
    fib (n - 1) + fib (n - 2)
    
(((fib 1 + fib `,
    highlight: `(2 - 2)`,
    post: `) + fib 1) + fib 2) + fib 3`,
    result: `0`,
  }];

export default trace;