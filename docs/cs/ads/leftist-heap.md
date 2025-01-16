---
title: Leftist Heap
---

首先有如下定义。

::fold{expand title="Null Path Length - $\text{Npl}(x)$"}
**Null Path Length**：任意节点 $x$ 到最近的没有两个子节点的节点（即至多有一个孩子）的距离。规定 $\text{Npl}(\text{NULL}) = -1$。
::

显然可以得到如下递推式。

$$
\text{Npl}(x) = \min\{\text{Npl}(\text{left}(x)), \text{Npl}(\text{right}(x))\} + 1
$$

::fold{expand title="Leftist Heap" success}
在堆的基础上，满足对于任意节点 $x$，左儿子的 $\text{Npl}$ 大于等于右儿子的 $\text{Npl}$。
::

据此可以通过归纳法得到如下定理。

> A leftist heap of $r$ nodes on the right path must have at least $2^r - 1$ nodes.

该定理保证了 Right Path 长度的上界为 $O(\log n)$，Leftist Heap 正是利用此特性，让 Merge 操作永远发生于 Right Path 上，从而保证了 $O(\log n)$ 的复杂度。

---

## Merge & Insert

插入本质上是特殊的 Merge，因此我们只需要考虑 Merge 操作即可。

思路是先将两条 Right Path 合并按键值排序，然后保留左子树不变拼接成新的树，最后在 Right Path 上根据 $\text{Npl}$ 交换左右子树。

---

## Delete-Min

删除根节点后，将左右子树合并即可。
