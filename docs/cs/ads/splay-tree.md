---
title: Splay Tree
---

在二叉搜索树的基础上，每次对节点的操作（查询、插入、删除）时，通过一些类似 AVL Tree 的旋转操作**将该节点移动到根节点**。

Splay Tree 的单次操作并不能达到 $O(\log N)$ 的时间复杂度（在某些情况下甚至是 $O(N)$ 的）。但可以证明，在任何连续的 $M$ 次操作后，能够保证 $O(M \log N)$ 的时间复杂度（即**摊还时间复杂度**，*Amortized Time Bound*）。

假如访问了节点 $X$（在查询、插入后，删除前）：

 - 如果 $X$ 是根节点，不进行任何操作；
 - 如果 $X$ 的父节点是根节点，对 $X$ 进行一次 **Single Rotation**（即 AVL Tree 的 LL- 或 RR-Rotation，或称 **Zig** 操作），使得 $X$ 移动到根节点；
 - 否则，记 $X$ 的父节点为 $P$，祖父节点为 $G$，分如下两种情况讨论。

---

## Zig-Zag

Zig-Zag 分为左右对称的两种情况，都是通过 **Double Rotation**（LR- 或 RL-Rotation）解决，下面以其中一种情况为例。

对于如下左图，通过在 $G$、$P$、$X$ 上进行 LR-Rotation 操作，从而把 $X$ 移动到根节点（如右图）。

::grid

:sep{span=12}

```typst 初始情况
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

:sep{span=12}

```typst 进行 Double Rotation 之后
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

---

## Zig-Zig

这种情况是通过两次 Single Rotation 解决的，但是需要注意**旋转的顺序**：从上往下先对 $G$ 进行一次旋转，再对 $P$ 旋转。

::grid

:sep{span=12}

```typst 初始情况
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

:sep{span=12}

```typst 进行两次 Single Rotation 之后
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

---

## 复杂度证明

见[摊还分析](amortized-analysis)。
