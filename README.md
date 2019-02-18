This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

See it in action [here](https://substitution-slides.herokuapp.com/).

# Purpose
The purpose of this application is twofold:
- Doing [substitution](https://htdp.org/2018-01-06/Book/part_one.html#%28counter._%28exercise._fun10c%29%29) by hand is a tiring and tedious task.
This is a tool that students can use to partially automate this task.
- I had to generate traces like these manually for a prototype debugging system. This greatly speeds up my work and
makes a previously hard issue (matching indentation) a non-issue.

# How to use
Start off by entering a program into the second text box and click "Replace text".
The top editor is the current state of the program—highlight
the next expression to evaluate, and put what it evalutes to
in the second text box again.
This tool will replace the highlighted expression with its result
in the next top editor, doing its best to indent for you—continue
replacing expressions with results until the program is done evaluating.

At this point, you can export the program execution trace in a JSON-like format.
You can also see a preview of what the replaced program will look like
with the preview button.
If you make a mistake, you can remove the last step and roll back to a previous correct step.
