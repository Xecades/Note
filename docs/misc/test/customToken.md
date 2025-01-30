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

使用 [FontAwesome](https://fontawesome.com) 加载 SVG 图标，支持 Solid、Regular 和 Brands 三种类别。

```md
... :<icon>[.type]: ...
```


::tab
# :flask: 效果

 - Solid: :flag:
 - Regular: :flag.r:
 - Brands: :github.b:

# :code: 源码
```md
 - Solid: :flag:
 - Regular: :flag.r:
 - Brands: :github.b:
```
::

The *magic spell* :arrow-up: :arrow-up: :arrow-down: :arrow-down: :arrow-left: :arrow-right: :arrow-left: :arrow-right: :a: :b: :a: :b: will lead you to the treasure :sack-dollar:.

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
<Note内容>
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
::fold{title="[标题]" [always] [expand] [default] | success | info | warning | danger}
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

::fold{always expand warning title="始终展开的折叠面板"}
你没有办法关闭它！
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
<Typst代码>
```
~~~

::tab
# :flask: 效果
```typst *Waves*
// Code from https://raw.githubusercontent.com/typst/packages/main/packages/preview/cetz/0.3.2/gallery/waves.typ
#import "@preview/cetz:0.3.2": canvas, draw, vector, matrix

#set page(width: auto, height: auto, margin: .5cm)

#canvas({
  import draw: *

  ortho(y: -30deg, x: 30deg, {
    on-xz({
      grid((0,-2), (8,2), stroke: gray + .5pt)
    })

    // Draw a sine wave on the xy plane
    let wave(amplitude: 1, fill: none, phases: 2, scale: 8, samples: 100) = {
      line(..(for x in range(0, samples + 1) {
        let x = x / samples
        let p = (2 * phases * calc.pi) * x
        ((x * scale, calc.sin(p) * amplitude),)
      }), fill: fill)

      let subdivs = 8
      for phase in range(0, phases) {
        let x = phase / phases
        for div in range(1, subdivs + 1) {
          let p = 2 * calc.pi * (div / subdivs)
          let y = calc.sin(p) * amplitude
          let x = x * scale + div / subdivs * scale / phases
          line((x, 0), (x, y), stroke: rgb(0, 0, 0, 150) + .5pt)
        }
      }
    }

    on-xy({
      wave(amplitude: 1.6, fill: rgb(0, 0, 255, 50))
    })
    on-xz({
      wave(amplitude: 1, fill: rgb(255, 0, 0, 50))
    })
  })
})
```

# :code: 源码
~~~md
```typst *Waves*
// Code from https://raw.githubusercontent.com/typst/packages/main/packages/preview/cetz/0.3.2/gallery/waves.typ
#import "@preview/cetz:0.3.2": canvas, draw, vector, matrix

#set page(width: auto, height: auto, margin: .5cm)

#canvas({
  import draw: *

  ortho(y: -30deg, x: 30deg, {
    on-xz({
      grid((0,-2), (8,2), stroke: gray + .5pt)
    })

    // Draw a sine wave on the xy plane
    let wave(amplitude: 1, fill: none, phases: 2, scale: 8, samples: 100) = {
      line(..(for x in range(0, samples + 1) {
        let x = x / samples
        let p = (2 * phases * calc.pi) * x
        ((x * scale, calc.sin(p) * amplitude),)
      }), fill: fill)

      let subdivs = 8
      for phase in range(0, phases) {
        let x = phase / phases
        for div in range(1, subdivs + 1) {
          let p = 2 * calc.pi * (div / subdivs)
          let y = calc.sin(p) * amplitude
          let x = x * scale + div / subdivs * scale / phases
          line((x, 0), (x, y), stroke: rgb(0, 0, 0, 150) + .5pt)
        }
      }
    }

    on-xy({
      wave(amplitude: 1.6, fill: rgb(0, 0, 255, 50))
    })
    on-xz({
      wave(amplitude: 1, fill: rgb(255, 0, 0, 50))
    })
  })
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

# 选项卡 3.14159265358979323846264338327950288419716939937510582

```python
print("It has a long title!")
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

# 选项卡 3.14159265358979323846264338327950288419716939937510582

```python
print("It has a long title!")
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

采用 24 栏栅格布局，支持上下、等高对齐。

```md
::grid{align=[bottom | top | equal] gap=[0] gapx=[0] gapy=[0]}
:sep{span=<宽度> [sm:span=<小屏幕下的宽度>] offset=[0]}

<内容 1>

:sep{span=<宽度> [sm:span=<小屏幕下的宽度>] offset=[0]}

<内容 2>

[...]
::
```

::tab
# :flask: 效果

:::grid{align=equal gapx=10px gapy=20px}

:sep{span=24}
::::fold{always expand title="Lorem Ipsum" info}
Aliquip ea eu quis nisi. Veniam sint officia cillum dolore. Cillum et sunt quis amet velit do magna. Aute amet sit consectetur elit mollit dolor duis excepteur laboris nostrud id Lorem. Pariatur duis ullamco aliquip laborum aliqua tempor cupidatat elit enim amet cillum.
::::

:sep{span=8 sm:span=24}
::::fold{always expand title="Dolor" warning}
Ullamco pariatur irure enim esse esse amet eiusmod. Cupidatat aliquip duis nulla quis. Voluptate velit aliquip exercitation ex tempor aliquip duis cupidatat magna aliqua incididunt est.
::::

:sep{span=16 sm:span=24}
::::fold{always expand title="Sit Amet" success}
Irure eiusmod elit aute laboris ut cillum dolore nisi sunt ullamco. Esse duis velit exercitation aliquip occaecat. Ex quis et sint non consequat eu nisi dolor. Adipisicing esse cupidatat id ex duis qui aliqua. Et occaecat dolor ut eu consectetur labore. Pariatur non labore adipisicing aute ex culpa quis cupidatat ullamco laboris ex. Tempor ipsum dolore ad consequat incididunt qui ea ea esse sint laboris fugiat. Quis aute laboris laborum amet.
::::

:::

# :code: 源码

```md
:::grid{align=equal gapx=10px gapy=20px}

:sep{span=24}
::::fold{always expand title="Lorem Ipsum" info}
Aliquip ea eu quis nisi. Veniam sint officia cillum dolore. Cillum et sunt quis amet velit do magna. Aute amet sit consectetur elit mollit dolor duis excepteur laboris nostrud id Lorem. Pariatur duis ullamco aliquip laborum aliqua tempor cupidatat elit enim amet cillum.
::::

:sep{span=8 sm:span=24}
::::fold{always expand title="Dolor" warning}
Ullamco pariatur irure enim esse esse amet eiusmod. Cupidatat aliquip duis nulla quis. Voluptate velit aliquip exercitation ex tempor aliquip duis cupidatat magna aliqua incididunt est.
::::

:sep{span=16 sm:span=24}
::::fold{always expand title="Sit Amet" success}
Irure eiusmod elit aute laboris ut cillum dolore nisi sunt ullamco. Esse duis velit exercitation aliquip occaecat. Ex quis et sint non consequat eu nisi dolor. Adipisicing esse cupidatat id ex duis qui aliqua. Et occaecat dolor ut eu consectetur labore. Pariatur non labore adipisicing aute ex culpa quis cupidatat ullamco laboris ex. Tempor ipsum dolore ad consequat incididunt qui ea ea esse sint laboris fugiat. Quis aute laboris laborum amet.
::::

:::
```

::

::grid{align=top gap=10px}
:sep{span=12}
Exercitation elit labore veniam ullamco qui dolor officia. Ut veniam reprehenderit labore in anim pariatur cillum nulla quis ex sunt adipisicing laborum mollit. Mollit laboris commodo ex pariatur ut fugiat commodo occaecat. Nostrud adipisicing incididunt Lorem aliquip cupidatat. Amet minim esse non tempor. Ea laborum cupidatat duis velit. Mollit in enim consequat laboris commodo dolore aliqua irure est laborum nulla.

:sep{span=12}
Officia aliquip velit excepteur commodo ea irure quis cillum cupidatat nostrud ullamco ipsum fugiat exercitation. Minim id excepteur reprehenderit occaecat aliquip anim duis nulla veniam. Ad sunt adipisicing amet pariatur laborum id minim adipisicing elit cupidatat. Minim eu eu fugiat et non aliqua ea tempor incididunt sunt veniam cillum reprehenderit. Minim sit laborum proident Lorem cupidatat.
::

---

## 星形分割线

```md
:asterisk
```

::tab
# :flask: 效果

:asterisk

# :code: 源码

```md
:asterisk
```
::

---

## 点状背景

在文字周围添加点状背景。

```md
::dot-pattern
<内容>
::
```

::tab
# :flask: 效果

见下方


# :code: 源码

```md
:::dot-pattern
Lorem ipsum dolor sit amet,

Eu enim tempor aliquip eu minim.
:::
```
::

::dot-pattern
Lorem ipsum dolor sit amet,

Eu enim tempor aliquip eu minim.
::

---

## 垂直间距

提供精细化的垂直间距调整，支持负数。

```md
:v{<高度>}
```

::tab
# :flask: 效果

Dolore aliqua proident elit ut anim aliquip duis adipisicing elit et mollit est irure non. Cupidatat sit mollit est velit officia dolore.

:v{4rem}

Eu incididunt elit et laborum sint dolor incididunt.

:v{-2.8em}

Incididunt proident enim aute enim laborum eiusmod.

# :code: 源码

```md
Dolore aliqua proident elit ut anim aliquip duis adipisicing elit et mollit est irure non. Cupidatat sit mollit est velit officia dolore.

:v{4rem}

Eu incididunt elit et laborum sint dolor incididunt.

:v{-2.8em}

Incididunt proident enim aute enim laborum eiusmod.
```
::
