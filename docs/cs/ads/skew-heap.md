---
title: Skew Heap
---

Skew Heap 之于 Leftist Heap，就如同 Splay Tree 之于 AVL Tree。为了判断是否需要交换左右子树，Leftist Heap 给每个节点附加了一个 $\text{Npl}$ 值，这是 Leftist Heap 带来的额外内存开销。

Skew Heap 则不再需要 $\text{Npl}$ 值，而是选择在 Merge 时，**永远进行左右子树的交换**。

显然，这样的操作会导致树的形态变得不规则，甚至可能退化为一条链，但是实际上我们可以通过摊还分析证明，Skew Heap 的摊还复杂度是 $O(\log n)$。

---

**摊还分析**：略。