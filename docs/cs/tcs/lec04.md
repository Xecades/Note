---
title: Lecture 04
---

这节课研究无限长度的函数 $f:\{0,1\}^*\to\{0,1\}^*$。

**布尔函数**：$f:\{0,1\}^*\to\{0,1\}$。

对给定的任意 $f:\{0,1\}^*\to\{0,1\}^*$，定义**布尔函数 $bf: \{0,1\}^* \to \{0,1\}$** 为

$$
bf(x, i, c) =
\begin{cases}
f(x)_i & \text{if } c=0, i < |f(x)| \\
1 & \text{if } c=1, i < |f(x)| \\
0 & \text{if } i \geqslant |f(x)|
\end{cases}
$$

显然计算 $f$ 的程序 $\text{F}$ 可以被转换为计算 $bf$ 的程序 $\text{BF}$，反之亦然。

$\Longrightarrow$ 计算 $f$ 和计算 $bf$ 在复杂度上是等价的，所以**我们可以只研究布尔函数**。

---

**语言**：对于布尔函数 $f:\{0,1\}^*\to\{0,1\}$，定义集合 $A_f = \{x \in \{0,1\}^* \mid f(x) = 1\}$，即使 $f$ 的值为 1 的输入集合。（**布尔函数和 Language 一一对应**）

$x\in A_f$：称为 $x$ decides $A_f$，等价于 $f(x) = 1$。

---

**有限自动机 (DFA，Deterministic Finite Automaton)**：$M = (K, s, F, \delta)$，其中

-   $K$：有限状态集合
-   $s \in K$：初始状态
-   $F \subseteq K$：接受状态集合（即哪些状态返回 1）
-   $\delta: K \times \{0,1\} \to K$：状态转移函数（即给定当前状态和输入，返回下一个状态的函数）

称 $M$ **计算**（computes）布尔函数 $f$，如果 $M$ 接收 $x$ 当且仅当 $f(x) = 1$。

称 $M$ **判定**（decides）语言 $A$，如果 $M$ 接收 $x$ 当且仅当 $x \in A$，$A$ 记作 $L(M)$。

**正则**（regular）：能被某个 DFA 判定的语言/布尔函数称为正则的。

**空集 $\varnothing$ 和全集 $\{0,1\}^*$ 都是正则的。**

**$\{e\}$ 也是正则的**，DFA：初始为 1，任意输入均转移到 0。（只接受空串）

![DFA 图示](assets/lec04-dfa.png)

---

::fold{title="**定理**：DFA 不能表示所有 $f$" success always expand}
存在布尔函数 $f:\{0,1\}^*\to\{0,1\}$，使得没有 DFA 能计算 $f$。（一定存在非正则语言）

:::fold{title="证明" expand}
$M = (K, s, F, \delta)$，所有元素都是有限的，因此 $M$ 是可数的，但布尔函数的集合是不可数的。
:::
::

**拼接**（Concatenation）：$AB = \{ab \mid a \in A, b \in B\}$。

::fold{title="**定理**" success always expand}
若 $A$ 和 $B$ 是正则的，则 $A \cup B$，$A \cap B$，$\overline{A}$，$AB$ 也是正则的。

:::fold{title="证明" expand}
以 $A \cup B$ 为例，设 $M_A = (K_A, s_A, F_A, \delta_A)$ 和 $M_B = (K_B, s_B, F_B, \delta_B)$，构造 $M = (K, s, F, \delta)$，其中

-   $K = K_A \times K_B$
-   $s = (s_A, s_B)$
-   $F = \{(q_A, q_B) \mid q_A \in F_A \text{ or } q_B \in F_B\}$
-   $\delta((q_A, q_B), a) = (\delta_A(q_A, a), \delta_B(q_B, a))$

（$AB$ 的证明需要 NFA，下节课讲）
:::
::

---

**非确定有限自动机 (NFA，Nondeterministic Finite Automaton)**：

![NFA 图示](assets/lec04-nfa.png)

-   从 $q_0$ 接受 $0$，可以到 $q_1$ 也可以留在 $q_0$。
-   从 $q_1$，即使没有接受输入，也可以跳到 $q_2$（e-transition）。

$N = (K, s, F, \Delta)$，其中 $\Delta$ 为 **transition relation**：

$\Delta \subseteq K \times \{0,1,e\} \times K$：第一项当前状态，第二项输入（$e$ 表示空输入），第三项下一个状态。

![上例输入 011 的计算过程](assets/lec04-nfa-compute.png)

**只要结果有一条路径到达接受状态**（$q_2$），就接受该输入。

![接受倒数第二位为 1 的输入](assets/lec04-nfa-example.png)
