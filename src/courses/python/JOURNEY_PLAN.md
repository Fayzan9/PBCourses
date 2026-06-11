# Python Programming Essentials — Course Journey Plan

## Overview
A 6-chapter interactive course teaching Python from first principles through
object-oriented design. Each chapter follows the same pedagogical arc:
**Hook → Concept Build-Up → Visualization/Interactivity → Sandbox → Next Hook.**

---

## Chapter 1 — Python Foundations: Code & Memory Mechanics
> *"How does Python actually think about your data?"*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Welcome Hook | Curiosity | Python's "magic" — one line prints, scrapes, trains models |
| 02 | Introduction to Python *(exists)* | Explainer | REPL, print(), first program |
| 03 | Data Types & Variables *(exists)* | Interactive | Dynamic typing, memory model visualizer |
| 04 | Numbers & Arithmetic | Explainer | int, float, // , %, **, operator precedence |
| 05 | Strings & Indexing | Explainer | Quotes, escape chars, indexing, slicing |
| 06 | String Methods Playground | Interactive | `.upper()`, `.split()`, f-strings, format |
| 07 | Booleans & Comparisons | Explainer | True/False, `==` vs `is`, truthiness |
| 08 | Type Conversion & Casting | Visualizer | int("3"), str(42), implicit vs explicit |
| 09 | How Python Stores Objects | Deep-dive | id(), reference model, mutability preview |
| 10 | Coding Sandbox | Sandbox | Free-form code pad — types & strings |
| 11 | Chapter Summary | Recap | Memory model diagram |
| 12 | Next Hook | Teaser | "What if your code could make decisions?" |

**Theme color:** amber-500 *(already set)*

---

## Chapter 2 — Control Flow: Making Decisions & Repeating Work
> *"How do you teach a program to choose and repeat?"*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Curiosity Hook | Hook | Spam filter analogy — if/else every second |
| 02 | If / Elif / Else | Explainer | Condition tree, indentation rules |
| 03 | Comparison Operators | Interactive | `<`, `>`, `==`, `!=`, `<=`, `>=` explorer |
| 04 | Logical Operators | Interactive | `and`, `or`, `not` — truth tables |
| 05 | Nested Conditionals | Explainer | Depth vs readability, guard clauses |
| 06 | For Loops & range() | Explainer | Iteration over sequences, range variants |
| 07 | While Loops | Explainer | Condition-driven loops, infinite loop danger |
| 08 | Loop Controls | Explainer | `break`, `continue`, `pass` |
| 09 | Loop Patterns | Visualizer | Counter, accumulator, search — animated |
| 10 | FizzBuzz Live Builder | Interactive | Build classic FizzBuzz step by step |
| 11 | Control Flow Sandbox | Sandbox | Write if/loop programs, see output |
| 12 | Chapter Summary | Recap | Decision tree + loop flowchart |
| 13 | Next Hook | Teaser | "Stop copying code — wrap it in a function" |

**Theme color:** sky-500

---

## Chapter 3 — Functions: Reusable Thinking
> *"How do you package a thought so you can use it a thousand times?"*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Curiosity Hook | Hook | Recipe analogy — write once, cook forever |
| 02 | Defining Functions | Explainer | `def`, naming, calling, return |
| 03 | Parameters & Arguments | Explainer | Positional, keyword, order matters |
| 04 | Return Values | Deep-dive | None vs value, multiple returns via tuple |
| 05 | Default & Keyword Args | Explainer | `def greet(name="World")` |
| 06 | *args & **kwargs | Explainer | Flexible signatures, unpacking |
| 07 | Variable Scope | Visualizer | Local / global / enclosing — frame diagram |
| 08 | Closures | Deep-dive | Returning functions, captured variables |
| 09 | Lambda & map/filter | Explainer | One-liners, functional style |
| 10 | Pure vs Side-Effect Funcs | Concept | Why pure functions are predictable |
| 11 | Function Composition | Interactive | Chain functions, see data flow |
| 12 | Function Sandbox | Sandbox | Build, call, and nest functions |
| 13 | Chapter Summary | Recap | Scope chain + call stack visualization |
| 14 | Next Hook | Teaser | "Now, how do you store *collections* of things?" |

**Theme color:** emerald-500

---

## Chapter 4 — Data Structures: Organizing Information
> *"Python gives you four superpowered containers — know when to use each."*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Curiosity Hook | Hook | Shopping cart vs phonebook vs set of tags |
| 02 | Lists — The Ordered Shelf | Explainer | `[]`, indexing, append, pop, slice |
| 03 | List Methods Deep Dive | Interactive | sort, reverse, index, count — live demo |
| 04 | Tuples — Frozen Records | Explainer | `()`, immutability, when to prefer tuple |
| 05 | Dictionaries — The Lookup Table | Explainer | `{}`, key-value pairs, get(), update() |
| 06 | Dict Methods & Iteration | Interactive | `.items()`, `.keys()`, `.values()` explorer |
| 07 | Sets — The Uniqueness Filter | Explainer | `set()`, union, intersection, difference |
| 08 | Nested Structures | Visualizer | List of dicts, dict of lists — tree view |
| 09 | List Comprehensions | Explainer | `[x*2 for x in nums if x > 0]` |
| 10 | Dict Comprehensions | Explainer | `{k: v for k, v in pairs}` |
| 11 | Choosing the Right Structure | Decision | Flowchart — list vs dict vs set vs tuple |
| 12 | Data Structures Sandbox | Sandbox | Build a mini address book / inventory |
| 13 | Chapter Summary | Recap | Four containers side-by-side comparison |
| 14 | Next Hook | Teaser | "What if your data had *behaviour* attached?" |

**Theme color:** violet-500

---

## Chapter 5 — Object-Oriented Programming: The Blueprint Pattern
> *"Model the real world as objects with identity, data, and behaviour."*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Curiosity Hook | Hook | Blueprint vs building — class vs instance |
| 02 | Classes & Objects | Explainer | `class`, instantiation, `self` |
| 03 | The Constructor | Explainer | `__init__`, instance attributes |
| 04 | Instance Methods | Explainer | Behaviour attached to state |
| 05 | Class vs Instance Variables | Visualizer | Shared state vs per-object state diagram |
| 06 | Magic / Dunder Methods | Explainer | `__str__`, `__repr__`, `__len__`, `__eq__` |
| 07 | Inheritance | Explainer | `class Dog(Animal)`, `super()` |
| 08 | Method Overriding | Interactive | See how child overrides parent method |
| 09 | Polymorphism | Deep-dive | Same interface, different behaviour |
| 10 | Encapsulation | Explainer | `_private`, `__mangled`, properties |
| 11 | Dataclasses (Bonus) | Explainer | `@dataclass` — boilerplate-free classes |
| 12 | OOP Design Exercise | Interactive | Design a `BankAccount` class live |
| 13 | OOP Sandbox | Sandbox | Build your own class hierarchy |
| 14 | Chapter Summary | Recap | Four OOP pillars diagram |
| 15 | Next Hook | Teaser | "What happens when code goes wrong?" |

**Theme color:** rose-500

---

## Chapter 6 — Error Handling, Modules & File I/O: Real-World Robustness
> *"Production code doesn't crash — it handles the unexpected gracefully."*

| # | Scene Title | Type | Key Concept |
|---|---|---|---|
| 01 | Curiosity Hook | Hook | App crash vs graceful error message |
| 02 | Errors & Exceptions | Explainer | SyntaxError vs RuntimeError, traceback anatomy |
| 03 | try / except | Explainer | Catching exceptions, bare vs specific |
| 04 | Multiple Exceptions | Explainer | Catching different types differently |
| 05 | else & finally | Explainer | Clean-up logic, guaranteed execution |
| 06 | Raising Exceptions | Explainer | `raise`, when to throw your own errors |
| 07 | Custom Exception Classes | Deep-dive | Subclassing Exception |
| 08 | Reading Files | Explainer | `open()`, read modes, readlines() |
| 09 | Writing Files | Explainer | Write / append modes, encoding |
| 10 | Context Managers | Deep-dive | `with open(...) as f:` — why it matters |
| 11 | Importing Modules | Explainer | `import`, `from ... import`, stdlib tour |
| 12 | Creating Your Own Module | Explainer | `__name__ == "__main__"`, reusable modules |
| 13 | Error Handling Sandbox | Sandbox | Build a CSV reader with full error handling |
| 14 | Grand Summary | Recap | Full Python mental model — end-to-end |
| 15 | What's Next | Teaser | Paths: Data Science, Web, Automation, AI |

**Theme color:** cyan-600

---

## Course Totals

| Chapter | Title | Scenes | Theme |
|---|---|---|---|
| 1 | Python Foundations | 12 | amber-500 |
| 2 | Control Flow | 13 | sky-500 |
| 3 | Functions | 14 | emerald-500 |
| 4 | Data Structures | 14 | violet-500 |
| 5 | Object-Oriented Programming | 15 | rose-500 |
| 6 | Error Handling, Modules & Files | 15 | cyan-600 |
| **Total** | | **83 scenes** | |

---

## Scene Type Legend

| Type | Description |
|---|---|
| **Hook** | Curiosity-first opening — real-world question, no code yet |
| **Explainer** | Concept + syntax reveal with annotated code blocks |
| **Interactive** | User clicks/toggles to explore a concept |
| **Visualizer** | Animated diagram (memory model, call stack, flowchart) |
| **Deep-dive** | Nuanced concept with worked example |
| **Sandbox** | Free-form code editor with simulated output |
| **Recap** | Chapter summary diagram + key takeaways |
| **Teaser** | Hook into the next chapter |

---

## Implementation Notes

- **Existing scenes to keep:** `IntroScene.tsx` (Ch1 Scene02), `VariablesScene.tsx` (Ch1 Scene03)
- **Chapter index pattern:** mirror AI course — each chapter folder has `index.ts` exporting a `Chapter` object
- **Themes:** update `pythonThemes` array in `index.ts` to add 5 more theme entries (one per new chapter)
- **State provider:** not needed unless cross-scene state is required; start without one
- **Sandbox scenes:** use a mock "run" button pattern like `IntroScene.tsx` — no server-side execution needed
