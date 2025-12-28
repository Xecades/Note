---
title: Lecture 13
---

$\newcommand{\NN}{\mathbb{N}}$
$\newcommand{\rmSIZE}{\mathrm{SIZE}}$
$\newcommand{\rmTIME}{\mathrm{TIME}}$
$\newcommand{\rmRAM}{\mathrm{RAM}}$
$\newcommand{\rmTM}{\mathrm{TM}}$
$\newcommand{\rmHALT}{\mathrm{HALT}}$
$\newcommand{\Ppoly}{\mathcal{P}/\mathrm{poly}}$
$\newcommand{\zeroone}{\{0,1\}}$
$\newcommand{\zeroonestar}{\zeroone^*}$

::fold{title="**定理**：Cook-Levin 定理" success always expand}
**3SAT is NP-complete.**

:::fold{title="证明" expand}
3SAT $\in \mathcal{NP}$ 在上节课已经证明，接下来证明：

**对于任意 $F \in \mathcal{NP}$，$F \leq_P$ 3SAT。**

我们采取以下规约链条：

$$
F \leq_P \text{NANDSAT} \leq_P \text{SAT} \leq_P \text{3SAT}
$$

-   **NANDSAT:** Given a NAND-CIRC $Q$ with $n$ inputs and one output, is there an input $t \in \zeroonestar$ such that $Q(t) = 1$?
-   **SAT:** 和 3SAT 唯一的区别是每个子句可以有任意数量的文字。

---

**Step 1:** $\text{NANDSAT} \leq_P \text{SAT}$

例子：对于 NAND-CIRC 程序，输入 $t_1, t_2, t_3$，输出 $y$

```
temp_1 = NAND(t_1, t_2)
temp_2 = NAND(t_2, t_3)
y = NAND(temp_1, temp_2)
```

找到一组输入使得输出为 1，其实等价于

$\newcommand{\temp}{\text{temp}}$
$\newcommand{\NAND}{\text{NAND}}$

$$
\begin{aligned}
&(\temp_1==\NAND(t_1, t_2)) \\
\land& (\temp_2==\NAND(t_2, t_3)) \\
\land& (y==\NAND(\temp_1, \temp_2)) \\
\land& (y==1)
\end{aligned}
$$

对于其中每一个子句 $a==\NAND(b, c)$，我们可以将其转化为 SAT 子句：

$$
\newcommand{\ba}{\bar a}
\newcommand{\bb}{\bar b}
\newcommand{\bc}{\bar c}
(\ba \lor \bb \lor \bc) \land (a \lor b) \land (a \lor c)
$$

而对于 $y==1$，可以直接转换成 $y$。

**Step 2:** $\text{SAT} \leq_P \text{3SAT}$

对于子句 $(x_1 \lor x_2)$，转换成 $(x_1 \lor x_2 \lor y) \land (x_1 \lor x_2 \lor \bar y)$。

对于子句 $(x_1 \lor x_2 \lor x_3 \lor x_4)$，转换成 $(x_1 \lor x_2 \lor y) \land (\bar y \lor x_3 \lor x_4)$。

递归地做就行。

**Step 3:** $F \leq_P \text{NANDSAT}$

回顾 $\mathcal{NP}$ 的定义：

> $\exists$ TM $V$ with polynomial running time such that for any $x \in \zeroonestar$, $F(x) = 1 \iff \exists t \in \zeroonestar$ such that $V(x, t) = 1$ and $|t| \leq |x|^a$（$a$ 是某个常数）。

由于 $F \in \mathcal{NP}$，所以问 $F(x)$ 是否为 1，等价于问是否 $\exists t \in \zeroonestar$ such that $V(x, t) = 1$ and $|t| \leq |x|^a$，该形式和 NANDSAT 非常类似。

$V$ 是一个图灵机，对于给定的 $x$，其输入长度 $\leq |x|+|t| \leq 2|x|^a$，且运行时间 $\leq (2|x|^a)^b = 2^b |x|^{ab}$（$b$ 是某个常数）。

讲图灵机转化为 NAND-CIRC 程序的唯一问题在于**前者可以有变量长度的循环**，据说两周之前的课（lec11）讲过**如果图灵机的输入长度和运行时间都是多项式级别的，那么可以将循环展开，且展开之后也是多项式的。**

因此此处能够将 $V(x, t)$ 转化为 NAND-CIRC 程序 $Q(x, t)$，由于 $x$ 给定，可以将 $x$ 的值直接写死在程序中，得到 NAND-CIRC 程序 $Q_x(t)$。

从而问题转化为：是否 $\exists t \in \zeroone^{|x|^a}$ 使得 $Q_x(t) = 1$，即 NANDSAT 问题，完成规约。
:::
::

**证明 $F$ 是 $\mathcal{NP}$ 完全的：** (1) 证明 $F \in \mathcal{NP}$；(2) 证明 $\text{3SAT} \leq_P F$。

**Subset Sum is NP-complete.**

::fold{title="Independent Set problem" always expand}
给定一个无向图 $G=(V,E)$ 和整数 $k$，问是否存在 $S \subseteq V$，使得 $|S| \geq k$，且对于任意 $u,v \in S$，$(u,v) \notin E$。（即 $S$ 中的任意两个顶点都不相邻）

（课上详细证明了 IS 是 $\mathcal{NP}$ 完全的，通过规约 3SAT $\leq_P$ IS，这里略过。）
::
