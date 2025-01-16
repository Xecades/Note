---
title: 摊还分析
---

设想一个栈，在其上定义三种操作：$\text{push}$、$\text{pop}$、$\text{multiPop}$。其中 $\text{push}$ 和 $\text{pop}$ 顾名思义，$\text{multiPop}(k)$ 指连续地 $\text{pop}$ 出栈中的 $k$ 个元素。

显然，$\text{push}$ 和 $\text{pop}$ 都是 $O(1)$ 的时间复杂度，而 $\text{multiPop}$ 是 $O(n)$ 的复杂度，其中 $n$ 为栈中元素的个数。

如果按照最坏情况来计算这个数据结构的复杂度，那么只要一次性 $\text{multiPop}$ 出栈中所有 $n$ 个元素，就会消耗 $O(n)$ 的时间，也就是说**最坏时间复杂度**（*Worst-case Time Complexity*）是 $O(n)$。但这能够代表实际使用中的表现吗？并不能，因为要想能 $\text{multiPop}$ 出 $n$ 个元素，栈中必须至少有 $n$ 个元素，也就是说前面一定有不少于 $n$ 个复杂度为 $O(1)$ 的 $\text{push}$ 操作。这样一均摊下来，每次操作的复杂度就是 $O(1)$。

像这样分析，我们得到整个数据结构的**平均时间复杂度**（*Average Time Complexity*）。但在实际研究中，要想达到真正的平均是很难的，因此我们引入**摊还时间复杂度**（*Amortized Time Complexity*）的概念，它本质上是**对平均时间复杂度上界的逼近**。

---

## 引入

在连续的 $M$ 次操作中，记 $c_i$ 为第 $i$ 次操作的开销（*Cost*），则

$$
\begin{align*}
    T_\text{worst} &= \max_{1\leq i \leq M}c_i \\
    T_\text{average} &= \frac{1}{M}\sum_{i=1}^{M}c_i
\end{align*}
$$

我们希望构造出一组**摊还开销**（*Amortized Cost*） $\hat{c_i}$，使得 $T_\text{amortized} := \frac{1}{M}\sum_{i=1}^M \hat{c_i}$ 能够反映 $T_\text{average}$ 的上界，即

$$
T_\text{amortized} \geqslant T_\text{average}
$$

这样，如果我们能够想办法证明 $T_\text{amortized} = O\bigl(f(n)\bigr)$ 的，那么同时也就证明了 $T_\text{average}$ 也是 $O\bigl(f(n)\bigr)$ 的。据此，我们希望 $T_\text{amortized}$ 和 $T_\text{average}$ 之间的差距尽可能小，即

$$
\sum_{i=1}^M \Delta_i := \sum_{i=1}^M \hat{c_i} - c_i
$$

在满足**非负**的同时尽可能小。

我们关注的重点即为如何构造这个 $\Delta_i$。

---

## 势能法

一种常用的分析方法是**势能法**（*Potential Method*）。它借用物理中势能的概念，给当前数据结构的状态 $D_i$ 赋予一个**势能** $\Phi(D_i)$，并通过势能的变化来分析摊还开销。

取 $\Delta_i = \hat{c_i} - c_i := \Phi(D_i) - \Phi(D_{i-1})$，那么

$$
\sum_{i=1}^M \Delta_i = \Phi(D_M) - \Phi(D_0)
$$

只要势函数 $\Phi$ 选择得合适，保证 $\Phi(D_i)$ 始终非负，如果初始情况的势能 $\Phi(D_0)$ 为 $0$，那么自然就保证了 $\sum_{i=1}^M \Delta_i \geqslant 0$ 的条件。这种需求显然更容易实现。

---

在上面的例子中，定义势函数 $\Phi(D_i)$ 为第 $i$ 次操作后**栈中的元素个数**，则 $\Phi(D_i) \geqslant 0 = \Phi(D_0)$。对于三种操作

 - $\text{push}$：$\Delta_i = \Phi(D_i) - \Phi(D_{i-1}) = (\operatorname{sizeof}S+1) - \operatorname{sizeof}S = 1$，摊还开销 $\hat{c_i} = c_i + \Delta_i = 1+1 = 2$。
 - $\text{pop}$：$\Delta_i = \Phi(D_i) - \Phi(D_{i-1}) = (\operatorname{sizeof}S-1) - \operatorname{sizeof}S = -1$，摊还开销 $\hat{c_i} = c_i + \Delta_i = 1-1 = 0$。
 - $\text{multiPop}(k)$：$\Delta_i = \Phi(D_i) - \Phi(D_{i-1}) = (\operatorname{sizeof}S-k) - \operatorname{sizeof}S = -k$，摊还开销 $\hat{c_i} = c_i + \Delta_i = k-k = 0$。

因此

$$
\sum_{i=1}^M\hat{c_i} = \sum_{i=1}^M O(1) = O(M) \geqslant \sum_{i=1}^M c_i
$$

所以 $T_\text{amortized} = O(M) / M = O(1)$。这是比最坏时间复杂度更贴近于现实的复杂度。

---

## Splay Tree 的摊还分析

在 [Splay Tree](splay-tree) 中，我们给每个节点定义一个 $\operatorname{rank}$：

$$
\operatorname{rank}i := \log S(i)
$$

其中 $S(i)$ 为节点 $i$ 包括自身的后代个数。

> 定义 $\operatorname{rank}$ 函数的目的是模拟树高。
> 
> 在一个完全二叉树中，树高为 $h$ 的节点个数为 $i = 2^h-1$，此时 $\log S(i)$ 就是树高 $h$。虽然 Splay Tree 不一定是完全二叉树，但 $\log S(i)$ 仍然可以作为树高的一个近似。后面我们会看到，相较于直接用树高分析，$\log S(i)$ 的分析更为简单。

定义树 $T$ 的势函数

$$
\Phi(T) := \sum_{i\in T}\operatorname{rank}i
$$

显然，$\Phi(T)$ 恒非负，且空树的势能为 $0$。

Splay Tree 的操作都由 Zig、Zag、Zig-Zag 三种子操作构成。我们对于每种子操作分别分析。

---

### Zig 操作

::grid

:sep{width="50%"}

```typst 初始情况（$T_1$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "P")
    circle((-.7, -1), name: "X")
    line("P", "X")


    hide(circle((.7, -1), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")


    hide(circle("X"))
    hide(circle((rel: (-.7, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")


    hide(circle("X"))
    hide(circle((rel: (.7, -1)), name: "XR"))
    intersections("XXR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "XR-rect")
        hide(circle("X"))
        hide(line("X.center", "XR.center"))
    })
    line("XXR.0", "XXR.1")

    content("P", $P$)
    content("X", $X$)

    content("PR-rect", $P_R$)
    content("XR-rect", $X_R$)
    content("XL-rect", $X_L$)
})
```

:sep{width="50%"}

```typst 一次 Zig 操作后（$T_2$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "X")
    circle((.7, -1), name: "P")
    line("P", "X")

    hide(circle("P"))
    hide(circle((rel: (-.7, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")


    hide(circle("P"))
    hide(circle((rel: (.7, -1)), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")


    hide(circle((-.7, -1), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")


    content("P", $P$)
    content("X", $X$)

    content("PL-rect", $X_R$)
    content("PR-rect", $P_R$)
    content("XL-rect", $X_L$)
})
```

::

$$
\begin{align*}
    \hat{c_i} &= c_i + \Phi(T_2) - \Phi(T_1) \\
    &= 1 + \operatorname{rank}_2 X - \operatorname{rank}_1 X \\
    &\qquad + \operatorname{rank}_2 P - \operatorname{rank}_1 P
\end{align*}
$$

由于变换后 $S(P)$ 降低，所以 $\operatorname{rank}_2 P - \operatorname{rank}_1 P \leqslant 0$，因此

$$
\hat{c_i}(\text{Zig}) \leqslant 1 + \operatorname{rank}_2 X - \operatorname{rank}_1 X
$$

---

### Zig-Zag 操作

::grid

:sep{width="50%"}

```typst 初始情况（$T_1$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "G")
    circle((rel: (-1, -1)), name: "P")
    circle((rel: (1, -1)), name: "X")
    line("G", "P")
    line("P", "X")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.7, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-.7, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // XR
    hide(circle("X"))
    hide(circle((rel: (.7, -1)), name: "XR"))
    intersections("XXR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "XR-rect")
        hide(circle("X"))
        hide(line("X.center", "XR.center"))
    })
    line("XXR.0", "XXR.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (1.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("P", $P$)
    content("X", $X$)

    content("PL-rect", $P_L$)
    content("GR-rect", $G_R$)
    content("XL-rect", $X_L$)
    content("XR-rect", $X_R$)
})
```

:sep{width="50%"}

```typst 一次 Zig-Zag 操作后（$T_2$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "X")
    circle((-1, -1), name: "P")
    circle((1, -1), name: "G")
    line("P", "X")
    line("G", "X")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.7, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // PR
    hide(circle("P"))
    hide(circle((rel: (.7, -1)), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")

    // GL
    hide(circle("G"))
    hide(circle((rel: (-.7, -1)), name: "GL"))
    intersections("GGL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "GL-rect")
        hide(circle("G"))
        hide(line("G.center", "GL.center"))
    })
    line("GGL.0", "GGL.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("P", $P$)
    content("X", $X$)

    content("PL-rect", $P_L$)
    content("GR-rect", $G_R$)
    content("PR-rect", $X_L$)
    content("GL-rect", $X_R$)
})
```

::

$$
\begin{align*}
    \hat{c_i} &= c_i + \Phi(T_2) - \Phi(T_1) \\
    &= 2 + \bcancel{\operatorname{rank}_2 X} - \operatorname{rank}_1 X \\
    &\qquad + \operatorname{rank}_2 P - \operatorname{rank}_1 P \\
    &\qquad + \operatorname{rank}_2 G - \bcancel{\operatorname{rank}_1 G}
\end{align*}
$$

> 这里 $c_i = 2$ 是因为 Zig-Zag 操作需要两次旋转。

首先 $\operatorname{rank}_2 X = \operatorname{rank}_1 G$，两者抵消。

同时我们注意到不等式 $4ab \leqslant (a + b) ^ 2$ 恒成立，左右同时取以 $2$ 为底的对数，得到 $2 + \log a + \log b \leqslant 2\log(a + b)$。在其中令 $a = S_2(P)$，$b = S_2(G)$，则

$$
\begin{align*}
    & \ 2 + \operatorname{rank}_2 P + \operatorname{rank}_2 G \\
    =& \ 2 + \log S_2(P) + \log S_2(G) \\
    \leqslant& \ 2\log\bigl(S_2(P) + S_2(G)\bigr) \\
    <& \ 2\log\bigl(S_2(P) + S_2(G) + 1\bigr) \\
    =& \ 2\log S_2(X) \\
    =& \ 2\operatorname{rank}_2 X
\end{align*}
$$

同时由于 $\operatorname{rank}_1 P > \operatorname{rank}_1 X$，最终我们得到

$$
\hat{c_i}(\text{Zig-Zag}) \leqslant 2(\operatorname{rank}_2 X - \operatorname{rank}_1 X)
$$

---

### Zig-Zig 操作

::grid

:sep{width="50%"}

```typst 初始情况（$T_1$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "G")
    circle((rel: (-.7, -1)), name: "P")
    circle((rel: (-.7, -1)), name: "X")
    line("G", "P")
    line("X", "P")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-.7, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // XR
    hide(circle("X"))
    hide(circle((rel: (.7, -1)), name: "XR"))
    intersections("XXR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "XR-rect")
        hide(circle("X"))
        hide(line("X.center", "XR.center"))
    })
    line("XXR.0", "XXR.1")

    // PR
    hide(circle("P"))
    hide(circle((rel: (.9, -1)), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (1.1, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("X", $X$)
    content("P", $P$)

    content("XL-rect", $X_L$)
    content("GR-rect", $G_R$)
    content("XR-rect", $X_R$)
    content("PR-rect", $P_R$)
})
```

:sep{width="50%"}

```typst 一次 Zig-Zig 操作后（$T_2$）
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "X")
    circle((rel: (.7, -1)), name: "P")
    circle((rel: (.7, -1)), name: "G")
    line("G", "P")
    line("X", "P")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-1.1, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.9, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // GL
    hide(circle("G"))
    hide(circle((rel: (-.7, -1)), name: "GL"))
    intersections("GGL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "GL-rect")
        hide(circle("G"))
        hide(line("G.center", "GL.center"))
    })
    line("GGL.0", "GGL.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("X", $X$)
    content("P", $P$)

    content("XL-rect", $X_L$)
    content("GR-rect", $G_R$)
    content("PL-rect", $X_R$)
    content("GL-rect", $P_R$)
})
```

::

$$
\begin{align*}
    \hat{c_i} &= c_i + \Phi(T_2) - \Phi(T_1) \\
    &= 2 + \operatorname{rank}_2 X - \operatorname{rank}_1 X \\
    &\qquad + \operatorname{rank}_2 P - \operatorname{rank}_1 P \\
    &\qquad + \operatorname{rank}_2 G - \operatorname{rank}_1 G
\end{align*}
$$

注意到 $S_1(X) + S_2(G) \leqslant S_2(X)$。剩下的证明与 Zig-Zag 类似，此处从略。最终我们得到

$$
\hat{c_i}(\text{Zig-Zig}) \leqslant 3(\operatorname{rank}_2 X - \operatorname{rank}_1 X)
$$

---

### 摊还分析

根据上面的分析，有

$$
\begin{align*}
    \hat{c_i}(\text{Zig}) &\leqslant 1 + \operatorname{rank}_2 X - \operatorname{rank}_1 X \leqslant 1 + 3(\operatorname{rank}_2 X - \operatorname{rank}_1 X) \\
    \hat{c_i}(\text{Zig-Zag}) &\leqslant 2(\operatorname{rank}_2 X - \operatorname{rank}_1 X) \leqslant 3(\operatorname{rank}_2 X - \operatorname{rank}_1 X) \\
    \hat{c_i}(\text{Zig-Zig}) &\leqslant 3(\operatorname{rank}_2 X - \operatorname{rank}_1 X)
\end{align*}
$$

这是一种非常优美的结构。对于一个完整的查询、插入、删除操作，它都是由一系列 Zig、Zig-Zag、Zig-Zig 子操作组成的，而这些子操作中的 $\hat{c_i}$ 累加后 $\operatorname{rank}X$ 相互抵消，只剩下初末状态的 $\operatorname{rank}$ 差值，同时我们知道末状态下 $X$ 就是根节点，也就是说

$$
\hat{c_i} \leqslant 1 + 3(\operatorname{rank} T - \operatorname{rank} X) = O(\log N)
$$

> 为什么加的是常数 $1$ 呢？这是因为 Zig 永远只可能在最后一次子操作进行，最多只会执行一次。

据此，我们可以得到 Splay Tree 的摊还时间复杂度为 $O(\log N)$。

---

## 总结

上面的分析基于一个重要的假设：$\Phi(D_M) \geqslant \Phi(D_0)$，但这一条件在有些情况下并不一定成立（例如 Splay Tree 初始非空）。实际上，如果这个假设不成立了，我们仍然能够得到类似的结论：只要操作次数 $M$ 足够大，总体实际表现出来的复杂度仍然为 $O\bigl(f(n)\bigr)$。

$$
\begin{align*}
    T_\text{average} &= \frac{1}{M}\sum_{i=1}^M c_i \\
    &= \left(\frac{1}{M}\sum_{i=1}^M \hat{c_i}\right) + \frac{1}{M}\bigl(\Phi(D_0) - \Phi(D_M)\bigr) \\
    &= O(\log N) + \frac{1}{M}\bigl(\Phi(D_0) - \Phi(D_M)\bigr) \\
    &\leqslant O(\log N) + \frac{1}{M}\Phi(D_0)
\end{align*}
$$

只要初始状态给定，$\Phi(D_0) / M$ 实际上是一个常数。在这种情况下甚至直接说 $T_\text{average} = O(\log N)$ 也是合理的。如果想要更严谨一点，我们让 $M\rightarrow+\infty$，这个时候常数也可以忽略不计了。
