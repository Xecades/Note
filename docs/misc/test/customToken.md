---
title: 自定义语法
---

::fold{expand info title="摘要"}
基于 Markdown-it 实现的自定义语法。
::

:asterisk

## 数学公式

利用 [KaTeX](https://katex.org/) 渲染数学公式。

### 行内公式

```md
... $<公式内容>$ ...
```


::tab
# :flask: 效果
可以不难推得 $\varphi(n):=n\prod_{p\mid n}(1-\frac{1}{p})$。

$\mathfrak{Xecades}$ 这个名字来源于单词 Decade：$\text{10 Decades}\rightarrow \text{X Decades}\rightarrow \text{Xecades}$。

# :code: 源码
```md
可以不难推得 $\varphi(n):=n\prod_{p\mid n}(1-\frac{1}{p})$。

$\mathfrak{Xecades}$ 这个名字来源于单词 Decade：$\text{10 Decades}\rightarrow \text{X Decades}\rightarrow \text{Xecades}$。
```
::


### 行间公式

```md
$$
<公式内容>
$$
```


::tab
# :flask: 效果
$$
\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}
$$

# :code: 源码
```md
$$
\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}
$$
```
::


---

## Icon

使用 [FontAwesome](https://fontawesome.com) 加载 SVG 图标。

```md
... :<icon>: ...
```


::tab
# :flask: 效果

The *magic spell* :arrow-up: :arrow-up: :arrow-down: :arrow-down: :arrow-left: :arrow-right: :arrow-left: :arrow-right: :a: :b: :a: :b: will lead you to the treasure :sack-dollar:.

# :code: 源码
```md
The *magic spell* :arrow-up: :arrow-up: :arrow-down: :arrow-down: :arrow-left: :arrow-right: :arrow-left: :arrow-right: :a: :b: :a: :b: will lead you to the treasure :sack-dollar:.
```
::


---

## 引言

适合用于展示名言、引用等。

```md
::quote
<引言内容>
::
```


::tab
# :flask: 效果
:::quote
Two roads diverged in a wood, and I—\
I took *the one less traveled by*,\
And that has made all the difference.\
<right>—Robert Frost</right>
:::

# :code: 源码
```md
:::quote
Two roads diverged in a wood, and I—\
I took *the one less traveled by*,\
And that has made all the difference.\
<right>—Robert Frost</right>
:::
```
::


::quote
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
::


::quote
$$
e ^ {i \pi} + 1 = 0
$$
::


---

## Note

功能上类似于 MkDocs Material 的 [Admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/)，用于提供额外信息。

```md
::note{[default] | success | info | warning | danger}
<Note 内容>
::
```

::tab
# :flask: 效果
:::note
这里是 `note.default` 的内容
:::

# :code: 源码
```md
:::note
这里是 `note.default` 的内容
:::
```
::


::tab
# :flask: 效果
:::note{danger}
$\text{P} \neq \text{NP}$
:::

# :code: 源码
```md
:::note{danger}
$\text{P} \neq \text{NP}$
:::
```
::


::note{success}
这里是 `note.success` 的内容
::

::note{info}
这里是 `note.info` 的内容
::

::note{warning}
这里是 `note.warning` 的内容
::

::note{danger}
这里是 `note.danger` 的内容
::

::note{success}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
::


---

## 折叠面板

```md
::fold{title="[标题]" [expand] [default] | success | info | warning | danger}
<折叠内容>
::
```


::tab
# :flask: 效果
:::fold{title="默认展开的 `default` 折叠面板" expand}
这里是 `fold.default` 的内容
:::

# :code: 源码
```md
:::fold{title="默认展开的 `default` 折叠面板" expand}
这里是 `fold.default` 的内容
:::
```
::


::fold{title="`success` 折叠面板" success}
这里是 `fold.success` 的内容
::

::fold{title="`info` 折叠面板" info}
这里是 `fold.info` 的内容
::

::fold{title="`warning` 折叠面板" warning}
这里是 `fold.warning` 的内容
::

::fold{title="`danger` 折叠面板" danger}
这里是 `fold.danger` 的内容
::

::fold{title="标题是支持 $\LaTeX$ 的" expand success}
折叠面板也支持 $\LaTeX$！

$$
\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}
$$
::

::fold{title="Lorem" danger}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Veniam irure ipsum dolore dolore Lorem voluptate adipisicing eiusmod minim. Eu incididunt enim irure nisi. Amet eu nostrud irure Lorem mollit eu ipsum excepteur cillum irure in sint reprehenderit deserunt. Occaecat adipisicing culpa excepteur magna id dolor exercitation ut ea dolor ut veniam est eiusmod. Consequat qui ut labore dolor ut. Ipsum ullamco commodo veniam occaecat fugiat sint consectetur nisi deserunt sunt ullamco et veniam. Do commodo mollit voluptate veniam ipsum irure dolore nisi.
::

::fold{success}
:::quote
这个折叠面板没有标题
:::
::

::fold{title="这个折叠面板的标题真的真的真的真的真的真的真的真的真的真的真的真的非常的长，而且里面还有 `code` 块"}
```python
print("Hello World")
```
::

---

## 链接卡片

```md
::linkcard{href="<链接地址>"}
<链接名称>
::
```

::tab
# :flask: 效果
:::linkcard{href="https://blog.xecades.xyz/"}
Xecades 的博客
:::

# :code: 源码
```md
:::linkcard{href="https://blog.xecades.xyz/"}
Xecades 的博客
:::
```
::

::linkcard{href="https://github.com/xecades/alpha"}
$\mathfrak{Xecades} :: \alpha$ 的 GitHub 仓库
::

::linkcard{href="/"}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
::

---

## Typst 渲染

基于 [Typst.ts](https://myriad-dreamin.github.io/typst.ts) 实现 Typst 的渲染。

~~~
```typst [标题]
<Typst 代码>
```
~~~

::tab
# :flask: 效果
```typst 一棵来自 ***Typst*** 的树
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))
    )
})
```

# :code: 源码
~~~md
```typst 一棵来自 ***Typst*** 的树
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))
    )
})
```
~~~
::

---

## 选项卡

```md
::tab
# <选项卡 1>

<选项卡 1 内容>

# <选项卡 2>

<选项卡 2 内容>

[...]
::
```

::tab
# 选项卡 1

这里是「**选项卡 1**」 的内容

# 选项卡 2

这里是「**选项卡 2**」 的内容

# $\LaTeX$ 公式

选项卡也是支持 $\LaTeX$ 的！

$$
\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}
$$

# Lorem

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# 一个名字很长很长很长很长很长很长的选项卡（而且名字里面还有 `code`）

```python
print("Hello World")
```

# :code: 源码

~~~md
:::tab
# 选项卡 1

这里是「**选项卡 1**」 的内容

# 选项卡 2

这里是「**选项卡 2**」 的内容

# $\LaTeX$ 公式

选项卡也是支持 $\LaTeX$ 的！

$$
\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}
$$

# Lorem

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# 一个名字很长很长很长很长很长很长的选项卡（而且名字里面还有 `code`）

```python
print("Hello World")
```
:::
~~~
::


::tab
# 唯一一个 Tab！

:::note
这个选项卡只有这一个 Tab
:::
::

---

## Grid

```md
::grid
:sep{width="<宽度>"}

<内容 1>

:sep{width="<宽度>"}

<内容 2>

[...]
::
```

::tab
# :flask: 效果

:::grid
:sep{width="50%"}

```typst **二叉搜索树**例 1
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([20], ([16], [13], [18]), ([25], [21], [28]))
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 2
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([10], ([5], [2], [7]), [15])
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 3
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 4
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([16], ([10], ([7], [1], []), [15]), ([19], ([17], [], [18]), [20]))
    )
})
```

:::

# :code: 源码

~~~md
:::grid
:sep{width="50%"}

```typst **二叉搜索树**例 1
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([20], ([16], [13], [18]), ([25], [21], [28]))
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 2
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([10], ([5], [2], [7]), [15])
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 3
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))
    )
})
```

:sep{width="50%"}

```typst **二叉搜索树**例 4
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    tree.tree(
        draw-node: (node, ..) => {
            if node.content == [] { return none }
            circle((), radius: .35, stroke: black)
            content((), [#node.content])
        },
        draw-edge: (from, to, pa, child) => {
            if child.content == [] { return none }
            tree.default-draw-edge(from, to, pa, child)
        },
        ([16], ([10], ([7], [1], []), [15]), ([19], ([17], [], [18]), [20]))
    )
})
```

:::
~~~

::
