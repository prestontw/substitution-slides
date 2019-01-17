(* type for program *)
type program = { prelude : string; selection : string; prologue: string}

let replace_program_with program text = program.prelude ^ text ^ program.prologue