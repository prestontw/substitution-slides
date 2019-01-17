open Jest;

let quick_test = (name, p, replace, result) =>
  describe(name, () =>
    Expect.(
      Util.(
        test("toBe", () =>
          expect(replace_program_with(p, replace)) |> toBe(result)
        )
      )
    )
  );

quick_test(
  "quick start",
  {prelude: "", selection: "f(5)", prologue: ""},
  "f(5 - 1) + f(5 - 2)",
  "f(5 - 1) + f(5 - 2)",
);

quick_test(
  "eval param",
  {prelude: "f(", selection: "5 - 1", prologue: ") + f(5 - 2)"},
  "4",
  "f(4) + f(5 - 2)",
);