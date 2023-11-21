# CS61A: Structure and Interpretation of Computer Programs

**🔮 COURSE-FINISHED-AT**: Nope, haven't finished yet.

**🔗 COURSE-SITE**: [inst.eecs.berkeley.edu/~cs61a/su20](https://inst.eecs.berkeley.edu/~cs61a/su20/)

---

## Higher-Order Functions

### HW 02 Q4: Church numerals

The homework [HW 02 Q4: Church numerals](https://inst.eecs.berkeley.edu/~cs61a/su20/hw/hw02/#q4) introduced a very interesting concept called *Church numerals*. I'd like to note it down.

> The logician Alonzo Church invented a system of representing non-negative integers entirely using functions. The purpose was to show that functions are sufficient to describe all of number theory: if we have functions, we do not need to assume that numbers exist, but instead we can invent them.

Using $\lambda$-functions in python, we have the following definitions:

```py
def zero(f):
    return lambda x: x

def successor(n): # n is a church numeral
    return lambda f: lambda x: f(n(f)(x))
```

Both `zero(f)` and `successor(n)` are *higher-order functions*, they take functions as arguments and return functions as results.

The `successor(n)` function may look scary, but it's actually not. `n` is a function that takes `f` in and returns another function that takes `x` in. So `n` is technically the same as `lambda f: lambda x: n(f)(x)`. What `successor(n)` does is just to wrap another layer of `f` to `n`.

From the explanation above, we can see that the number of `f` is simply the corresponding integer. Rather than defining `one(f)` as `successor(zero)` and `two(f)` as `successor(one)`, we can also use:

```py
def one(f):
    return lambda x: f(x)

def two(f):
    return lambda x: f(f(x))
```

Then it's easy to implement `church_to_int(n)` function:

```py
def church_to_int(n):
    return n(lambda x: x + 1)(0)
```

Let's examine how to add two Church numerals together. For example, by adding `two(f)(x) = f(f(x))` and `one(f)(x) = f(x)` together, we should get `three(f)(x) = f(f(f(x)))`. The answer is to take `one` and plug it into `x` of `two(f)(x)`: `two(f)(one(f)(x))`. The code would be:

```py
def add_church(m, n):
    return lambda f: lambda x: m(f)(n(f)(x))
```

Then we try multiplication. The idea is to plug `n` into `f` of `m(f)(x)`.

```py
def mul_church(m, n):
    return lambda f: lambda x: m(n(f))(x)
```
The most challenging task is to implement power. Here is the answer. You can verify this by plugging in some numbers.

```py
def pow_church(m, n):
    return lambda f: lambda x: n(m)(f)(x)
```

---

### HW 03 Q6: Anonymous factorial

Another interesting quiz I found is [HW 03 Q6: Anonymous factorial](https://inst.eecs.berkeley.edu/~cs61a/su20/hw/hw03/#q6).

The recursive factorial function can be written as a single expression by using a conditional expression.

```py
fact = lambda n: 1 if n == 1 else n * fact(n - 1)
```

Note that this implementation relies on the *fact* that `fact` has a name. Is there a way to define `fact` recursively without giving it a name?

The task is to implement an anonymous function that computes the factorial of `n` using **only** call expressions, conditional expressions, and lambda expressions (no assignment or def statements). You may also use `-` and `*` operators.

How the non-anonymous factorial function works is that inside each layer of recursion, the function `fact` itself can always be called. Thus, we come up with the idea to **pass the function itself as an argument** to the function.

```py
def fact(f, n):
    return 1 if n == 1 else n * f(f, n - 1)

fact(fact, 5) # 120
```

So the answer would be:

```py
fact = (lambda f: lambda x: f(f, x))(lambda f, x: 1 if x == 1 else x * f(f, x - 1))
```

The idea behind this quiz is something called *Y Combinator*. Y Combinator is a method to turn a non-anonymous recursive function into an anonymous one. Here's one example (by GitHub Copilot):

```py
def Y(f):
    return (lambda x: f(lambda y: x(x)(y)))(lambda x: f(lambda y: x(x)(y)))

fact = Y(lambda f: lambda n: 1 if n == 0 else n * f(n - 1))

fact(5)  # 120
```

I won't dig into Y Combinator here.

---

**Under Construction**