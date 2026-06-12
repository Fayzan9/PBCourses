# Python Pro — Complete Professional Curriculum

## Course Philosophy

This is a **lecture-based**, professionally delivered course designed to be taught alongside YouTube video content. Visuals are minimal and purposeful — static diagrams, clean typography, code blocks. Animations are used only to illustrate a concept that cannot be shown any other way (e.g. stack frame push/pop, memory reference traversal). No gamification, no quizzes embedded in scenes — this is a course you *watch and learn from*, not an interactive app.

**Design principles:**
- Minimal visual style — dark background, clean monospace code, subtle line diagrams
- No decorative animations or interactive elements
- Each scene supports the lecture, not replaces it
- Diagrams reveal incrementally with the narration, not all at once

---

## Goal

> A student who completes this course should be able to go from absolutely zero programming knowledge to being an advanced Python developer who understands not only syntax, but how Python works internally, why features exist, when to use them, and how professional software is built.

---

## Course Overview

| Metric | Value |
|---|---|
| Total Phases | 12 |
| Total Modules | 35 |
| Total Lessons | ~240–280 |
| Estimated Duration | 80–120 hours |
| Style | Lecture-based, YouTube-delivered |
| Visual Design | Minimal — code, diagrams, typography |

---

## Learning Path

```
Computer Fundamentals
        ↓
Python Fundamentals
        ↓
Python Internals
        ↓
Software Engineering
        ↓
Advanced Python
```

---

# PHASE 1 — Computer Fundamentals

> Most Python courses skip this entirely. This phase ensures students understand *what a computer does* before they write a line of code — which is why they later understand variables, references, recursion, memory, and performance intuitively rather than mechanically.

---

## Module 1 — How Computers Actually Work

### Lesson 1.1 — What Is Programming?

- What is a program
- What is software vs. hardware
- Why programming exists
- What Python is and where it fits

### Lesson 1.2 — Computer Architecture Basics

- CPU — what it does
- RAM — what it holds
- Storage — what persists
- Input and output devices

**Diagram:**
```
┌──────────┐
│   CPU    │ ← executes instructions
└────┬─────┘
     │
┌────▼─────┐
│   RAM    │ ← holds active data
└────┬─────┘
     │
┌────▼─────┐
│ Storage  │ ← persists data
└──────────┘
```

### Lesson 1.3 — Binary Fundamentals

- Bits and bytes
- Binary number system — how it works
- Why computers use binary
- Text encoding — ASCII → Unicode → UTF-8

### Lesson 1.4 — How Programs Execute

- The journey from source code to CPU

**Diagram:**
```
Source Code (.py)
       ↓
  Interpreter
       ↓
    Bytecode
       ↓
  Python VM
       ↓
      CPU
```

- What "interpreted" means vs. compiled
- Why Python is slow compared to C — and why that rarely matters

### Lesson 1.5 — Memory Fundamentals

- What a memory address is
- How reading from memory works
- How writing to memory works
- Visual memory map with addresses and values

---

## Module 2 — Variables and Data

### Lesson 2.1 — What Is a Variable?

Not syntax first — concept first.

- A variable is a name that points to an object
- The object lives in memory
- The variable is a reference, not a box

**Diagram:**
```
x = 10

 x ──→ [object: int, value: 10, id: 0x7f3a]
```

### Lesson 2.2 — Python's Object Model

- Everything in Python is an object
- Every object has: identity, type, value
- `id()`, `type()`, `isinstance()`
- Why this matters — sets the foundation for mutability, references, garbage collection

### Lesson 2.3 — Numbers

- Integers — arbitrary precision in Python
- Floats — IEEE 754, why `0.1 + 0.2 ≠ 0.3`
- Complex numbers — when they appear in practice

### Lesson 2.4 — Strings

- What a string is in memory
- Unicode — why Python 3 strings are Unicode by default
- Encoding vs. decoding — bytes ↔ str
- String immutability

### Lesson 2.5 — Booleans

- `True` and `False` as subclass of `int`
- Truthy and falsy values — full list
- Why `bool` inherits from `int` (historical reason)

### Lesson 2.6 — None

- `None` as a singleton
- When to use `None` — sentinel values, optional returns
- `None` vs. 0 vs. `False` vs. empty string

---

## Module 3 — Operators and Expressions

### Lesson 3.1 — Arithmetic Operators

- `+`, `-`, `*`, `/`, `//`, `%`, `**`
- Integer division vs float division
- Modulo — real-world uses (even/odd, circular indexing)
- Power operator — short form

### Lesson 3.2 — Comparison Operators

- `==`, `!=`, `<`, `>`, `<=`, `>=`
- Chaining comparisons — `1 < x < 10`

### Lesson 3.3 — Logical Operators

- `and`, `or`, `not`
- Short-circuit evaluation — how Python stops early
- Practical implications for performance and safety

### Lesson 3.4 — Membership Operators

- `in`, `not in`
- Performance difference: `in` on list vs. set vs. dict

### Lesson 3.5 — Identity Operators

- `is`, `is not`
- Identity vs. equality — the critical distinction
- Why `x is None` is preferred over `x == None`
- The small integer cache — when `is` gives surprising results

### Lesson 3.6 — Expression Evaluation

- Operator precedence table
- Parentheses for clarity
- Short-circuit evaluation in depth

---

# PHASE 2 — Program Flow

---

## Module 4 — Decision Making

### Lesson 4.1 — if / elif / else

- Syntax and structure
- How Python evaluates the condition
- Truthiness in conditions

### Lesson 4.2 — Nested Conditions

- When nesting is appropriate
- When nesting is a smell

### Lesson 4.3 — Guard Clauses

- Early returns to reduce nesting
- Cleaner code through inversion

### Lesson 4.4 — Pattern Matching (Python 3.10+)

- `match` / `case` syntax
- Structural pattern matching
- Value patterns, sequence patterns, mapping patterns
- When to use pattern matching vs. if/elif

**Practical exercises:**
- Input validator
- Simple calculator with match
- Login simulation

---

## Module 5 — Loops and Iteration

### Lesson 5.1 — for Loops

- Iterating over sequences
- What "iterable" means at this stage
- String iteration, list iteration

### Lesson 5.2 — while Loops

- Condition-based iteration
- When to use while vs. for

### Lesson 5.3 — Loop Control

- `break` — exit early
- `continue` — skip to next iteration
- `pass` — placeholder / no-op

### Lesson 5.4 — range()

- `range(stop)`, `range(start, stop)`, `range(start, stop, step)`
- Why range is lazy — it doesn't create a list
- Memory efficiency

### Lesson 5.5 — enumerate()

- Indexed iteration without manual counter
- Why `enumerate` is idiomatic Python

### Lesson 5.6 — zip()

- Iterating multiple sequences in parallel
- What happens with unequal lengths
- `zip_longest` from itertools

### Lesson 5.7 — The Iteration Protocol

- What makes something iterable
- Preview of `__iter__` and `__next__` (covered fully in Module 23)

### Lesson 5.8 — Loop Patterns

- Searching a sequence
- Counting occurrences
- Accumulating a result
- Nested loops — matrix traversal, combinations

---

# PHASE 3 — Functions and Program Design

---

## Module 6 — Functions

### Lesson 6.1 — Why Functions Exist

- Avoiding repetition
- Creating abstraction
- Enabling testing
- Composability

### Lesson 6.2 — Defining Functions

- `def` syntax
- Naming conventions
- Function body and indentation

### Lesson 6.3 — Parameters and Arguments

- Positional parameters
- Default values
- Keyword arguments
- Positional-only and keyword-only parameters (`/` and `*`)

### Lesson 6.4 — Return Values

- `return` statement
- Implicit return of `None`
- Returning multiple values (tuple packing)

### Lesson 6.5 — Scope

- Local scope
- Global scope
- `global` keyword — when it's appropriate (rarely)
- Why mutating globals is dangerous

### Lesson 6.6 — Namespaces

- What a namespace is
- Module namespace vs. function namespace
- How Python resolves names

### Lesson 6.7 — The LEGB Rule

- Local → Enclosing → Global → Built-in
- Resolution order with examples
- Common bugs caused by scope confusion

### Lesson 6.8 — Docstrings and Type Hints

- Writing useful docstrings
- Google style vs. NumPy style
- Type hints — `def add(x: int, y: int) -> int`
- Why type hints are documentation, not enforcement (unless using mypy)

---

## Module 7 — Deep Dive: Functions Internals

### Lesson 7.1 — The Call Stack

- What happens when a function is called
- Stack frames — what they contain
- Stack growth and unwinding

**Diagram:**
```
main()
  └── greet("Alice")
        └── format_name("Alice")

Stack:
┌─────────────────────┐  ← top (current frame)
│ format_name frame   │
├─────────────────────┤
│ greet frame         │
├─────────────────────┤
│ main frame          │
└─────────────────────┘
```

### Lesson 7.2 — Recursion

- What recursion is
- Base case — why it's mandatory
- Recursive case
- Tracing recursive calls manually

### Lesson 7.3 — Recursive Thinking

- How to decompose a problem recursively
- Tree of calls visualization
- Fibonacci — naive vs. memoized

### Lesson 7.4 — Closures

- What a closure is
- Enclosing scope captured by inner function
- Practical use — factory functions, callbacks

### Lesson 7.5 — First-Class Functions

- Functions as objects
- Assigning to variables
- Passing as arguments
- Returning from functions

### Lesson 7.6 — Lambda Functions

- Syntax
- When to use — `sorted`, `map`, `filter`
- When NOT to use — anything beyond a simple expression

### Lesson 7.7 — Higher-Order Functions

- `map()`, `filter()`, `sorted()`, `functools.reduce()`
- When these are idiomatic vs. when a comprehension is clearer

### Lesson 7.8 — Functional Programming Concepts

- Pure functions
- Immutability
- Side effects and why to minimize them
- Referential transparency

---

# PHASE 4 — Python Collections

---

## Module 8 — Lists

### Lesson 8.1 — Internal Structure

- Lists as dynamic arrays
- How Python over-allocates memory
- Why appending is O(1) amortized

### Lesson 8.2 — Indexing and Slicing

- Zero-based indexing
- Negative indexing
- Slicing syntax `[start:stop:step]`
- Slice objects

### Lesson 8.3 — Mutation

- Lists are mutable — what that means
- In-place vs. creating new lists
- The danger of shared references

### Lesson 8.4 — List Methods

- `append`, `extend`, `insert`, `remove`, `pop`, `clear`
- `sort` vs. `sorted` — in-place vs. new list
- `reverse`, `copy`, `count`, `index`

### Lesson 8.5 — Performance Analysis

| Operation | Complexity | Reason |
|---|---|---|
| `append(x)` | O(1) amortized | Dynamic array resize |
| `insert(0, x)` | O(n) | All elements shift |
| `remove(x)` | O(n) | Linear search + shift |
| `x in list` | O(n) | Linear scan |
| `list[i]` | O(1) | Direct index |

---

## Module 9 — Tuples

### Lesson 9.1 — Immutable Sequences

- Tuples vs. lists — when to choose which
- Performance advantage of tuples
- Tuples as records (heterogeneous) vs. lists as collections (homogeneous)

### Lesson 9.2 — Packing and Unpacking

- Automatic packing in multiple return
- Unpacking assignment
- Extended unpacking with `*`

### Lesson 9.3 — Named Tuples

- `collections.namedtuple`
- Readable attribute access without class overhead
- `typing.NamedTuple` — typed version

---

## Module 10 — Dictionaries

### Lesson 10.1 — Hash Tables

- What a hash table is — the core idea
- Why lookups are O(1) average

**Diagram:**
```
key "name"
     ↓
  hash()
     ↓
  index 4
     ↓
┌─────────────────────────────┐
│  0  │  1  │  2  │  3  │  4  │ ← slots
│     │     │     │     │"Ali"│
└─────────────────────────────┘
```

### Lesson 10.2 — Hashing

- `hash()` function
- What makes an object hashable
- Why mutable objects cannot be dict keys

### Lesson 10.3 — Keys and Values

- Key constraints — must be hashable
- Value constraints — any object
- Key ordering — insertion order preserved (Python 3.7+)

### Lesson 10.4 — Dictionary Methods

- `get`, `setdefault`, `update`, `pop`, `popitem`
- `keys()`, `values()`, `items()` — view objects
- `defaultdict` — for avoiding KeyError

### Lesson 10.5 — Hash Collisions

- What a collision is
- How Python resolves them (open addressing)
- Why this matters for performance at scale

### Lesson 10.6 — Performance Analysis

| Operation | Complexity |
|---|---|
| `d[key]` | O(1) average |
| `d[key] = val` | O(1) average |
| `key in d` | O(1) average |
| Iteration | O(n) |

---

## Module 11 — Sets

### Lesson 11.1 — Uniqueness and Hash-Based Storage

- Sets as dicts without values
- O(1) membership testing
- When to use a set over a list

### Lesson 11.2 — Set Operations

- `union` (`|`), `intersection` (`&`), `difference` (`-`), `symmetric_difference` (`^`)
- Practical use — deduplication, finding common elements, filtering

### Lesson 11.3 — frozenset

- Immutable sets
- When you need a hashable set (e.g. as a dict key)

---

## Module 12 — Advanced Collection Techniques

### Lesson 12.1 — List Comprehensions

- Syntax: `[expr for item in iterable if condition]`
- Mental model — maps and filters combined
- When comprehensions are readable vs. when a loop is clearer

### Lesson 12.2 — Dict and Set Comprehensions

- `{k: v for k, v in items}`
- `{expr for item in iterable}`

### Lesson 12.3 — Nested Comprehensions

- Matrix flattening
- When nesting hurts readability

### Lesson 12.4 — Generator Expressions

- `(expr for item in iterable)` — lazy evaluation
- Memory difference vs. list comprehension
- When to use — large or infinite sequences

### Lesson 12.5 — Practical Data Transformations

- Filtering records
- Inverting a dict
- Grouping data with `defaultdict`
- Flattening nested structures

---

# PHASE 5 — Memory and References

> This phase separates developers who understand Python from those who just use Python. Bugs that seem mysterious — unexpected mutation, aliasing, shallow vs. deep copy — become obvious after this phase.

---

## Module 13 — References and Mutability

### Lesson 13.1 — Objects vs. Variables

- Variables are names, not containers
- Multiple names can point to the same object
- Assignment creates a reference, not a copy

### Lesson 13.2 — Identity vs. Equality

- `is` checks identity (same object in memory)
- `==` checks equality (same value)
- When they differ and why it matters

### Lesson 13.3 — Mutable vs. Immutable Objects

| Mutable | Immutable |
|---|---|
| list | int |
| dict | float |
| set | str |
| custom class (default) | tuple |
| | bool |
| | frozenset |

- What mutation means at the memory level
- Why strings and tuples being immutable is a design decision, not a limitation

### Lesson 13.4 — Aliasing

- Two names pointing to the same mutable object
- The aliasing bug — modifying one appears to modify both

```python
a = [1, 2, 3]
b = a          # b is an alias, not a copy
b.append(4)
print(a)       # [1, 2, 3, 4] — a was also modified
```

### Lesson 13.5 — Shallow Copy vs. Deep Copy

- `copy.copy()` — copies the container, not the contents
- `copy.deepcopy()` — recursively copies everything
- When each is appropriate
- Performance cost of deep copy

### Lesson 13.6 — Garbage Collection Introduction

- What happens when no references remain
- Python uses reference counting as primary GC
- Preview of Module 14

---

## Module 14 — Python Memory Model

### Lesson 14.1 — Object Lifecycle

- Object creation → reference counting → deallocation
- The `del` statement — removes a name, not necessarily the object

### Lesson 14.2 — Reference Counting

- Every object has a reference count
- `sys.getrefcount()` — viewing the count
- When the count hits zero — immediate deallocation

### Lesson 14.3 — Cyclic Garbage Collection

- Reference counting cannot handle cycles
- Python's cyclic GC — the `gc` module
- Generational collection — gen0, gen1, gen2

### Lesson 14.4 — Memory Optimization

- `__slots__` — eliminating `__dict__` overhead
- Using generators instead of lists
- Avoiding unnecessary copies

### Lesson 14.5 — Interning

- String interning — identical strings sharing one object
- Small integer cache — integers from -5 to 256 are cached
- When this causes `is` to return unexpected `True`

---

# PHASE 6 — Object-Oriented Programming

---

## Module 15 — OOP Foundations

### Lesson 15.1 — Why OOP Exists

- Grouping data and behavior
- Modeling real-world entities
- When OOP is the right tool — and when it isn't

### Lesson 15.2 — Classes and Objects

- Class as a blueprint
- Object as an instance
- Creating instances with `ClassName()`

### Lesson 15.3 — Attributes

- Instance attributes — per-object data
- Class attributes — shared across all instances
- The danger of mutable class attributes

### Lesson 15.4 — Methods

- Instance methods — `def method(self, ...)`
- Why `self` exists — it's not magic, it's explicit

### Lesson 15.5 — `__init__`

- The constructor method
- Initializing instance state
- Not a constructor in the C++ sense — `__new__` actually creates the object

### Lesson 15.6 — Instance vs. Class Variables

- Scope rules for attribute lookup
- When class variables are accidentally mutated

---

## Module 16 — Advanced OOP

### Lesson 16.1 — Inheritance

- Single inheritance
- `super()` — calling the parent method correctly
- When inheritance is appropriate

### Lesson 16.2 — Composition over Inheritance

- Why inheritance is often overused
- Has-a vs. is-a relationships
- Practical refactor from inheritance to composition

### Lesson 16.3 — Polymorphism

- Duck typing — Python's approach
- Method overriding
- `isinstance()` and `type()` checks — when to use them

### Lesson 16.4 — Encapsulation

- Convention: `_private` and `__mangled`
- Python has no true private — it's a convention
- Properties — `@property`, `@setter`

### Lesson 16.5 — Abstract Classes

- `abc.ABC` and `@abstractmethod`
- Enforcing interface contracts
- When to use vs. duck typing

### Lesson 16.6 — Method Resolution Order

- MRO in multiple inheritance
- The C3 linearization algorithm (conceptual)
- `ClassName.__mro__` to inspect it

### Lesson 16.7 — Magic Methods (Dunder Methods)

- `__init__`, `__new__`, `__del__`
- `__str__`, `__repr__` — string representations
- `__len__`, `__getitem__`, `__setitem__` — making objects behave like sequences
- `__eq__`, `__lt__`, `__hash__` — comparison and hashing
- `__add__`, `__mul__` — operator overloading
- `__call__` — making objects callable
- `__enter__`, `__exit__` — context manager protocol

### Lesson 16.8 — Dataclasses

- `@dataclass` decorator
- Auto-generated `__init__`, `__repr__`, `__eq__`
- `field()` for defaults and metadata
- `frozen=True` for immutable dataclasses

---

# PHASE 7 — Files and Error Handling

---

## Module 17 — File Operations

### Lesson 17.1 — Reading Files

- `open()` and the file object
- `read()`, `readline()`, `readlines()`
- Iterating line by line — memory efficient

### Lesson 17.2 — Writing Files

- `write()`, `writelines()`
- Modes: `r`, `w`, `a`, `x`, `b`, `+`
- Always close files — or use `with`

### Lesson 17.3 — Context Manager for Files

- `with open(...) as f:` — guaranteed cleanup
- What happens on exception inside the block

### Lesson 17.4 — CSV Files

- `csv.reader`, `csv.writer`
- `csv.DictReader`, `csv.DictWriter`
- Handling quoting, delimiters, encoding

### Lesson 17.5 — JSON Files

- `json.load()`, `json.dump()`
- `json.loads()`, `json.dumps()` — string variants
- Pretty-printing with `indent`
- Custom serialization for non-JSON types

### Lesson 17.6 — Pathlib

- `pathlib.Path` — modern file system API
- Path construction, parent, stem, suffix
- `exists()`, `mkdir()`, `glob()`, `rglob()`
- Why pathlib is preferred over `os.path`

---

## Module 18 — Exceptions

### Lesson 18.1 — Exception Hierarchy

```
BaseException
├── SystemExit
├── KeyboardInterrupt
└── Exception
    ├── ArithmeticError
    │   └── ZeroDivisionError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── ValueError
    ├── TypeError
    ├── AttributeError
    ├── FileNotFoundError
    └── ...
```

### Lesson 18.2 — try / except / else / finally

- `try` — the risky code
- `except ExceptionType` — specific handling
- `except (Type1, Type2)` — multiple types
- `else` — runs only if no exception occurred
- `finally` — always runs, even on exception

### Lesson 18.3 — raise

- `raise ExceptionType("message")`
- Re-raising: `raise` with no argument inside except
- `raise X from Y` — exception chaining

### Lesson 18.4 — Custom Exceptions

- Subclassing `Exception`
- Adding useful attributes
- Exception hierarchy for a real application

### Lesson 18.5 — Debugging Mindset

- Reading tracebacks — reading bottom-up
- Using `pdb` basics
- `breakpoint()` in Python 3.7+
- Common exception types and their usual causes

---

# PHASE 8 — Professional Python

---

## Module 19 — Modules and Packages

### Lesson 19.1 — The Import System

- What happens when you `import`
- Module search path — `sys.path`
- `.pyc` bytecode cache

### Lesson 19.2 — Creating Modules

- Any `.py` file is a module
- `__name__ == "__main__"` guard
- Relative vs. absolute imports

### Lesson 19.3 — Creating Packages

- Directory with `__init__.py`
- What `__init__.py` controls
- Namespace packages (no `__init__.py`) — when they're used

### Lesson 19.4 — Import Styles

- `import module`
- `from module import name`
- `from module import *` — why to avoid it
- `import module as alias`

### Lesson 19.5 — Python Path and Distribution

- `PYTHONPATH` environment variable
- How installed packages are found
- Site-packages directory

---

## Module 20 — Virtual Environments and Dependency Management

### Lesson 20.1 — Why Virtual Environments Exist

- Global vs. isolated environments
- Dependency conflicts between projects
- Reproducibility

### Lesson 20.2 — venv

- `python -m venv .venv`
- Activating and deactivating
- What's inside a virtualenv

### Lesson 20.3 — pip

- `pip install`, `pip uninstall`, `pip list`
- `pip show` — package metadata
- `pip freeze` — snapshot of installed packages

### Lesson 20.4 — requirements.txt

- Pinning versions for reproducibility
- `pip install -r requirements.txt`
- Limitations of flat requirements files

### Lesson 20.5 — pyproject.toml

- Modern Python project configuration
- `[project]` metadata
- Build backends — setuptools, flit, hatch
- Development dependencies

---

## Module 21 — Testing

### Lesson 21.1 — Why Testing Matters

- Catching regressions
- Documentation through examples
- Confidence when refactoring

### Lesson 21.2 — Unit Testing with pytest

- Writing test functions — `test_` prefix
- `assert` statements
- Running pytest
- Test discovery

### Lesson 21.3 — Test Fixtures

- `@pytest.fixture`
- Setup and teardown
- Fixture scope — function, class, module, session

### Lesson 21.4 — Mocking

- `unittest.mock.Mock`
- `@patch` decorator
- When to mock — external dependencies, side effects
- When not to mock — internal logic

### Lesson 21.5 — Test Design

- Arrange / Act / Assert pattern
- Testing edge cases
- Testing error paths — `pytest.raises`
- Coverage — what it tells you and what it doesn't

### Lesson 21.6 — TDD Basics

- Red → Green → Refactor cycle
- When TDD is valuable
- When it slows you down

---

## Module 22 — Logging

### Lesson 22.1 — Why Logging Over Print

- print is for development, logging is for production
- Log levels — DEBUG, INFO, WARNING, ERROR, CRITICAL
- Structured output, filterable

### Lesson 22.2 — The logging Module

- `logging.getLogger(__name__)`
- Basic configuration
- Formatter — timestamp, level, logger name, message

### Lesson 22.3 — Handlers

- `StreamHandler` — console output
- `FileHandler` — log to file
- `RotatingFileHandler` — log rotation
- Multiple handlers on one logger

### Lesson 22.4 — Production Logging Practices

- Never log sensitive data
- Structured logging — JSON format for log aggregators
- Logging in libraries vs. applications
- Log levels as operational contracts

---

# PHASE 9 — Advanced Python

---

## Module 23 — Iterators and Generators

### Lesson 23.1 — The Iterator Protocol

- What makes something an iterator
- `__iter__()` — returns self
- `__next__()` — returns next value or raises `StopIteration`

### Lesson 23.2 — Implementing an Iterator

- Building a custom iterator class
- How Python's `for` loop uses the iterator protocol internally

### Lesson 23.3 — Generator Functions

- `yield` keyword
- Lazy evaluation — values produced on demand
- Generator state — suspended between yields
- `send()` and `throw()` — two-way communication

### Lesson 23.4 — Generator Use Cases

- Reading large files line by line
- Infinite sequences — Fibonacci generator
- Pipeline chains — composing generators

### Lesson 23.5 — `itertools`

- `chain`, `islice`, `cycle`, `repeat`
- `product`, `permutations`, `combinations`
- `groupby`, `takewhile`, `dropwhile`

---

## Module 24 — Decorators

### Lesson 24.1 — The Wrapping Pattern

- Function that takes a function and returns a function
- Manual wrapping before decorator syntax

### Lesson 24.2 — The @ Syntax

- Syntactic sugar for `func = decorator(func)`
- Multiple decorators — application order

### Lesson 24.3 — functools.wraps

- Why wrapped functions lose their identity
- `@functools.wraps(func)` preserves metadata

### Lesson 24.4 — Parameterized Decorators

- A function that returns a decorator
- Three levels of nesting explained

### Lesson 24.5 — Class-Based Decorators

- Using `__call__` to make a class behave as a decorator
- When class-based decorators are clearer than function-based

### Lesson 24.6 — Real-World Decorator Patterns

- Timing/profiling
- Retry with backoff
- Caching (`functools.lru_cache`)
- Access control
- Input validation

---

## Module 25 — Context Managers

### Lesson 25.1 — The Resource Management Problem

- Files, connections, locks — must be released even on error
- Why `try/finally` everywhere is verbose

### Lesson 25.2 — The with Statement

- How `with` calls `__enter__` and `__exit__`
- `__exit__` receives exception info — can suppress or re-raise

### Lesson 25.3 — Implementing Context Managers

- Class-based — `__enter__` / `__exit__`
- `contextlib.contextmanager` — generator-based approach

### Lesson 25.4 — Real-World Context Managers

- Database transactions
- Temporary directory
- Timer context manager
- Suppressing specific exceptions

---

## Module 26 — Advanced Language Features

### Lesson 26.1 — *args and **kwargs

- Collecting positional arguments into a tuple
- Collecting keyword arguments into a dict
- Forwarding arguments — `func(*args, **kwargs)`

### Lesson 26.2 — Unpacking Operators

- `*iterable` in function calls
- `**mapping` in function calls
- Unpacking in assignments and literals

### Lesson 26.3 — Walrus Operator `:=`

- Assignment expression syntax
- Use in `while` loops and comprehensions
- When it improves readability vs. obscures it

### Lesson 26.4 — Descriptors

- `__get__`, `__set__`, `__delete__`
- How `@property` is implemented using descriptors
- How `classmethod` and `staticmethod` are descriptors

### Lesson 26.5 — `__slots__`

- Replacing `__dict__` with a fixed slot array
- Memory savings — practical measurement
- Limitations — no dynamic attributes, no multiple inheritance with other slotted classes

---

# PHASE 10 — Python Internals

> This is the signature section of the course. Most Python developers never look inside the interpreter. After this phase, students understand *why* Python behaves the way it does, not just *that* it does.

---

## Module 27 — How Python Executes Code

### Lesson 27.1 — Source to Bytecode

The complete pipeline:

```
Source code (.py)
       ↓
   Tokenizer          ← splits code into tokens
       ↓
    Parser            ← builds parse tree
       ↓
      AST             ← abstract syntax tree
       ↓
  Compiler            ← emits bytecode
       ↓
 Bytecode (.pyc)      ← stored in __pycache__
       ↓
  Python VM           ← executes bytecode
```

### Lesson 27.2 — The AST

- `import ast; ast.parse("x = 1 + 2")`
- What an AST node looks like
- AST transformations — how tools like Black and type checkers work

### Lesson 27.3 — Bytecode

- `import dis; dis.dis(function)`
- Common opcodes — `LOAD_FAST`, `STORE_FAST`, `CALL_FUNCTION`, `RETURN_VALUE`
- Reading bytecode output

### Lesson 27.4 — The Python VM

- Stack-based virtual machine
- The evaluation loop — `ceval.c`
- How opcodes modify the value stack

---

## Module 28 — CPython Internals

### Lesson 28.1 — The Interpreter Loop

- `PyEval_EvalFrameEx` — the main loop
- Why CPython uses a `switch` statement over opcodes

### Lesson 28.2 — Object Implementation

- `PyObject` — the base C struct
- Reference count field
- Type pointer
- How `int`, `str`, `list` extend `PyObject`

### Lesson 28.3 — Memory Allocator

- `pymalloc` — Python's small object allocator
- Arenas, pools, and blocks
- Why Python has its own allocator instead of using `malloc` directly

### Lesson 28.4 — The GIL

- What the Global Interpreter Lock is
- Why it exists — CPython's reference counting is not thread-safe
- What it prevents and allows
- `nogil` Python — the future of the GIL

### Lesson 28.5 — Thread Safety in Python

- The GIL does not make code thread-safe
- Race conditions still happen between Python bytecode instructions
- `threading.Lock` for true thread safety

---

## Module 29 — Performance Optimization

### Lesson 29.1 — Profiling First

- "Never optimize without measuring"
- `cProfile` and `pstats`
- `line_profiler` for line-level data
- `memory_profiler` for memory usage

### Lesson 29.2 — Time Complexity

- O(1), O(log n), O(n), O(n log n), O(n²)
- How to identify complexity of your code
- Practical impact — when does it matter?

### Lesson 29.3 — Space Complexity

- Memory tradeoffs vs. time tradeoffs
- When to care about space complexity

### Lesson 29.4 — Efficient Data Structure Selection

- List vs. deque for queue operations
- Dict vs. list for membership testing
- `heapq` for priority queue operations
- `bisect` for maintaining sorted lists

### Lesson 29.5 — Optimization Strategies

- Avoid redundant computation — cache results
- Prefer built-ins over Python loops
- NumPy for numeric computation
- Compiled extensions — when Python is too slow
- PyPy — when the GIL is the bottleneck

---

# PHASE 11 — Concurrency and Async

---

## Module 30 — Concurrency Fundamentals

### Lesson 30.1 — Processes vs. Threads

- Process — isolated memory, separate GIL
- Thread — shared memory, one GIL in CPython
- When to use each

### Lesson 30.2 — The GIL and Threading

- Why threading doesn't help CPU-bound work in CPython
- Why threading helps I/O-bound work — thread releases GIL while waiting

### Lesson 30.3 — The threading Module

- `Thread`, `start()`, `join()`
- `Lock`, `RLock`, `Semaphore`
- `ThreadPoolExecutor` from `concurrent.futures`

### Lesson 30.4 — The multiprocessing Module

- Bypassing the GIL with separate processes
- `Process`, `Pool`
- Inter-process communication — `Queue`, `Pipe`
- `ProcessPoolExecutor`

### Lesson 30.5 — When to Use What

| Workload | Tool |
|---|---|
| I/O-bound | `asyncio` or `threading` |
| CPU-bound | `multiprocessing` |
| Mixed | depends — profile first |

---

## Module 31 — Async Python

### Lesson 31.1 — The Problem with Threads for I/O

- Context switching overhead
- C10K problem
- Why one event loop outperforms thousands of threads for I/O

### Lesson 31.2 — The Event Loop

- Single-threaded event loop
- How coroutines yield control back
- The scheduler — round-robin execution

### Lesson 31.3 — async / await

- `async def` — defines a coroutine function
- `await` — suspends until the awaitable completes
- Why you can only `await` inside `async def`

### Lesson 31.4 — asyncio

- `asyncio.run()` — entry point
- `asyncio.create_task()` — concurrent execution
- `asyncio.gather()` — run multiple coroutines concurrently
- `asyncio.sleep()` vs. `time.sleep()` — the critical difference

### Lesson 31.5 — Real-World Async

- Async HTTP with `httpx` or `aiohttp`
- Async database access with `asyncpg` or `SQLAlchemy async`
- Async file I/O with `aiofiles`
- When not to use async — CPU-bound work still blocks

---

# PHASE 12 — Real Software Development

---

## Module 32 — Databases

### Lesson 32.1 — SQL Fundamentals

- `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- Filtering with `WHERE`
- Joining tables
- Indexes and why they matter

### Lesson 32.2 — SQLite with Python

- `sqlite3` standard library module
- Connection and cursor
- Parameterized queries — preventing SQL injection
- Transactions

### Lesson 32.3 — ORM Concepts

- Object-relational mapping — mapping Python classes to database tables
- Why ORMs exist
- Tradeoffs — convenience vs. control

### Lesson 32.4 — SQLAlchemy

- Core vs. ORM layer
- Defining models
- Sessions and transactions
- Querying — `session.query()` vs. 2.0 style
- Migrations with Alembic

---

## Module 33 — APIs

### Lesson 33.1 — HTTP Fundamentals

- Request / response model
- Methods: GET, POST, PUT, PATCH, DELETE
- Status codes — 2xx, 4xx, 5xx
- Headers, body, query parameters

### Lesson 33.2 — Consuming APIs with requests

- `requests.get()`, `requests.post()`
- JSON response parsing
- Authentication — API keys, Bearer tokens
- Error handling and retries

### Lesson 33.3 — REST Principles

- Stateless
- Resource-based URLs
- Representations — JSON
- Idempotency

### Lesson 33.4 — Building APIs with FastAPI

- `@app.get()`, `@app.post()` route decorators
- Path parameters and query parameters
- Request body with Pydantic models
- Response models
- Automatic OpenAPI documentation

### Lesson 33.5 — API Design

- Versioning — `/api/v1/`
- Error response format
- Pagination
- Authentication and authorization

---

## Module 34 — Project Architecture

### Lesson 34.1 — Layered Architecture

```
Routes / Controllers
        ↓
     Services
        ↓
   Repositories
        ↓
     Database
```

- Separation of concerns
- Why each layer exists

### Lesson 34.2 — Services Layer

- Business logic lives here
- Services don't know about HTTP or databases
- Testable in isolation

### Lesson 34.3 — Repository Pattern

- Abstracts database access
- Swappable implementations — SQLite in dev, Postgres in prod
- Makes unit testing possible without a database

### Lesson 34.4 — Configuration Management

- Never hardcode configuration
- `os.environ.get()` for environment variables
- `python-dotenv` for local development
- Pydantic `BaseSettings` for typed configuration

---

## Module 35 — Deployment Basics

### Lesson 35.1 — Packaging a Python Application

- `pyproject.toml` as the project file
- Building a distribution — `python -m build`
- Publishing to PyPI — `twine upload`

### Lesson 35.2 — Docker Introduction

- What containers solve
- Writing a `Dockerfile` for a Python app
- `docker build` and `docker run`
- Best practices — non-root user, minimal base image

### Lesson 35.3 — Cloud Basics

- What cloud providers offer — compute, storage, networking
- Deploying to a VPS — setup, process management with systemd or supervisord
- Managed platforms — Render, Fly.io as simple examples

### Lesson 35.4 — CI/CD Concepts

- Continuous Integration — run tests on every push
- Continuous Deployment — deploy when tests pass
- GitHub Actions — basic workflow file
- What a mature pipeline includes: lint, type check, test, build, deploy

---

# Capstone Projects

Students complete projects at each tier, building toward a full professional application.

## Foundation Tier

| Project | Concepts Practiced |
|---|---|
| Calculator | Functions, operators, input/output |
| Expense Tracker | Files, dicts, CSV |
| Password Generator | strings, random, modules |

## Intermediate Tier

| Project | Concepts Practiced |
|---|---|
| Library Management System | OOP, file I/O, exceptions |
| Quiz Platform | Dicts, loops, logic |
| Task Manager | CLI, JSON persistence |

## Advanced Tier

| Project | Concepts Practiced |
|---|---|
| REST API | FastAPI, Pydantic, routing |
| Web Scraper | requests, BeautifulSoup, async |
| Chat Application | asyncio, WebSockets |

## Professional Capstone

A complete backend application demonstrating all phases:

- FastAPI application with layered architecture
- Pydantic models for validation
- SQLAlchemy with Alembic migrations
- JWT authentication
- Full pytest test suite with fixtures and mocking
- Logging with structured output
- Docker containerization
- GitHub Actions CI pipeline
- Deployed to a cloud provider

---

# Scene Design Guidelines

Since this is a lecture-based course delivered through YouTube video:

**Visual style**
- Dark background (#0f0f0f or similar), off-white text
- Monospace font for all code
- No decorative elements — every visual element must carry information
- Diagrams: clean line art, minimal color (2–3 accent colors max)

**Animation rules**
- Animate only when it aids comprehension (e.g. stack frame push/pop, memory pointer moving)
- Diagrams reveal incrementally with narration, not all at once
- No entrance/exit animations on text — it just appears
- No particle effects, no 3D, no motion that doesn't communicate information

**Code presentation**
- Syntax highlighting on code blocks
- Line-by-line reveal when walking through execution
- Side-by-side "before / after" layouts for refactors
- Output shown directly below or beside code

**Diagram conventions**
- Boxes for objects/memory
- Arrows for references/pointers
- Indented trees for hierarchies (class hierarchy, call stack)
- Tables for comparisons (complexity, type properties)
