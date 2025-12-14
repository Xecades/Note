---
title: Lecture 11
---

从本次课开始，我们主要讨论可计算函数。

---

**运行时间**：Let $T: \mathbb{N} \to \mathbb{N}$, we say a TM $M$ has a running time of $T(n)$ if for every sufficiently large $n$ and every **input of length $n$**, $M$ halts within $T(n)$ steps. 类似可定义 NAND-RAM 程序的运行时间。

::fold{title="假设" always expand}
通常假设：

1. $T(n) \geq n$，因为至少需要读完输入；
2. $T(n)$ 是时间可计算的（time-constructible），即 $T(n)$ 可以被某个 TM 在 $T(n)$ 步内计算出来；
3. $T(n)$ 是单调非减的。

这样的 $T(n)$ 称为 **nice function**。大多数常见函数都满足这些假设。
::

**$\mathrm{TIME}_\mathrm{TM}(T(n))$** $=\{$boolean function $F\mid F$ is computable by some TM with $T(n)$ running time$\}$，即运行时间在 $T(n)$ 之内的所有布尔函数的集合。e.g. $\mathrm{TIME}_\mathrm{TM}(10\cdot n^3) \subsetneq \mathrm{TIME}_\mathrm{TM}(2^n)$。类似可定义 $\mathrm{TIME}_\mathrm{RAM}(T(n))$。

**$\mathcal{P}=\bigcup_{k\in \mathbb{N}} \mathrm{TIME}_\mathrm{TM}(n^k)$**，所有在多项式步内计算的布尔函数的集合。

**$\mathcal{EXP}=\bigcup_{k\in \mathbb{N}} \mathrm{TIME}_\mathrm{TM}\left(2^{n^k}\right)$**，所有在指数步内计算的布尔函数的集合。

**$\mathcal{P} \subsetneq \mathcal{EXP}$**，后面会证明。

::fold{title="**定理**：TM 和 NAND-RAM 运行时间等价" success always expand}
$\mathrm{TIME}_\mathrm{TM}(T(n)) \subseteq \mathrm{TIME}_\mathrm{RAM}(10\cdot T(n))) \subseteq \mathrm{TIME}_\mathrm{TM}(T(n)^4)$。
::

有了上面的定理，可以用 $\mathrm{TIME}_\mathrm{RAM}$ 来定义 $\mathcal{P}$ 和 $\mathcal{EXP}$：$\mathcal{P} = \bigcup_{k\in \mathbb{N}} \mathrm{TIME}_\mathrm{RAM}(n^k)$，$\mathcal{EXP} = \bigcup_{k\in \mathbb{N}} \mathrm{TIME}_\mathrm{RAM}\left(2^{n^k}\right)$。可见 $\mathcal{P}$ 和 $\mathcal{EXP}$ 与计算模型无关。

回顾：Universal TM $U(M, x) = M(x)$，对应的 NAND-RAM 程序 $U(P, x) = P(x)$。

可以证明，**若 $P(x)$ 在 $T(|x|)$ 步内计算，则 $U(P, x)$ 可在 $a|P|^b\cdot T(|x|)$ 步内计算**，其中 $a,b$ 是常数。（证明略）

::fold{title="**Time Hierarchy Theorem**" success always expand}
对任意 nice function $T: \mathbb{N} \to \mathbb{N}$，存在布尔函数 $F$，使得

$$
F \in \mathrm{TIME}_\mathrm{RAM}(T(n)\log n)\setminus\mathrm{TIME}_\mathrm{RAM}(T(n))
$$

也就是说**如果允许多花 $\log n$ 的时间，就能计算出更多的函数**。

:::fold{title="证明" expand}
固定任意 nice function $T(n)$，定义：

$$
\mathrm{HALT}_T(P, x) =
\begin{cases}
1, & \text{if } |P|\leq\log\log|x|\\
&\text{and }P \text{ halts on } x \text{ in } \leq 100T(|P|+|x|) \text{ steps}\\
0, & \text{otherwise}
\end{cases}
$$

（称作 **Bounded halting problem**，即限制了运行时间）

下面我们证明：

1. $\mathrm{HALT}_T \in \mathrm{TIME}_\mathrm{RAM}(T(n)\log n)$；
2. $\mathrm{HALT}_T \notin \mathrm{TIME}_\mathrm{RAM}(T(n))$。

:v{-1.6em}

---

:v{-1.6em}

**证明 $\mathrm{HALT}_T \in \mathrm{TIME}_\mathrm{RAM}(T(n)\log n)$**：

```
1| if |P| > loglog|x|:
2|     return 0
3| compute T0 = T(|P| + |x|)
4| simulate P on x for 100·T0 steps
5| if P halts within 100·T0 steps:
6|     return 1
7| else:
8|     return 0
```

-   Line 1-2：$O(|P|)$，因为需要读 $P$ 的全部内容。
-   Line 3：因为是 nice function，故能在 $O(T(|P|+|x|))$ 步内完成；
-   Line 4：由上面的 Universal TM 性质，能在 $O(a|P|^b\cdot 100T_0)$ 步内完成；
-   Line 5-8：$O(1)$。

综上，总运行时间为 $O(|P|^b\cdot T_0)$。注意到 $|P| \leq \log\log|x| \leq \log\log(|P|+|x|)$，则

$$
\begin{aligned}
O(|P|^b\cdot T_0) &\leq O\left((\log\log(|P|+|x|))^b \cdot T(|P|+|x|)\right) \\
&= o\left(T(|P|+|x|)\cdot \log(|P|+|x|)\right)
\end{aligned}
$$

即 $\mathrm{HALT}_T \in \mathrm{TIME}_\mathrm{RAM}(T(n)\log n)$。

**证明 $\mathrm{HALT}_T \notin \mathrm{TIME}_\mathrm{RAM}(T(n))$**：

思路：证明所有在 $T(n)$ 步内计算的程序 $P$，都不能计算 $\mathrm{HALT}_T$。

假设 $\mathrm{HALT}_T \in \mathrm{TIME}_\mathrm{RAM}(T(n))$，定义：

$$
Q^*(z)=Q^*(P1^m)=
\begin{cases}
\text{loop}, & \text{if }|P| < 0.1\log\log m\text{ and } P \text{ halts on } P1^m \text{ in }\\
&100T(|P|+|z|)=100T(2|P|+m) \text{ steps}\\
\text{halt}, & \text{otherwise}
\end{cases}
$$

可以写出 $Q^*$ 的程序：

```
on input z:
1|   if z is not of the form P1^m:
2|       return 0
3|   compute b = HALT_T(P, z)
4|   if b == 1:
5|       loop forever
6|   else:
7|       halt
```

令 $P=Q^*, m=2^{2^{100|Q^*|}}$，考虑 $Q^*(Q^*1^m)$ 的运行时间：

-   Line 1-2：$|P|+m$；
-   Line 3：根据假设，运行时间为 $T(|P|+|z|)=T(2|P|+m)$。
-   Line 4-7：$O(1)$。

综上，总运行时间为 $2T(2|P|+m)$。

-   如果 loop 分支成立，即 $Q^*(Q^*1^m)$ 不停机，但该分支的条件是 $Q^*$ 在同样的输入下停机，因此不可能进入该分支；
-   如果 halt 分支成立，则 $Q^*(Q^*1^m)$ 在 $2T(2|P|+m) < 100T(2|P|+m)$ 步内停机，且 $|P| < 0.1\log\log m$，满足 loop 分支的条件，应该不停机，矛盾。

因此，两个分支都不可能，故 $\mathrm{HALT}_T \notin \mathrm{TIME}_\mathrm{RAM}(T(n))$。
:::
::

由 Time Hierarchy Theorem 可知，$\mathcal{P} \subsetneq \mathcal{EXP}$（真包含）。

---

**$F_{\uparrow n}$**：给定 $F:\{0,1\}^* \to \{0,1\}$，定义 $F_{\uparrow n}:\{0,1\}^n \to \{0,1\}$，其中对任意 $x \in \{0,1\}^n$，都有 $F_{\uparrow n}(x) = F(x)$。即把 $F$ 限制在长度为 $n$ 的输入上。

**$F_{\uparrow n}\in\mathrm{SIZE}_n(T(n))$ if it needs at most $T(n)$ gates.**（NAND-CIRC 电路）

**$F \in \mathrm{SIZE}(T(n))$ if for every $n$, $F_{\uparrow n} \in \mathrm{SIZE}_n(T(n))$**。即对于任意输入长度 $n$，$F$ 在该长度下都能被大小为 $T(n)$ 的电路计算出来。

::fold{title="$\mathrm{SIZE}$ 和 $\mathrm{TIME}$ 比较" always expand}
$F\in\mathrm{SIZE}(T(n))\Longleftrightarrow\forall n, \exists$ NAND-CIRC $P, \forall x\in \{0,1\}^n, F(x)$ can be computed by $P$ in $T(n)$ lines.

$F\in\mathrm{TIME}(T(n))\Longleftrightarrow\exists$ NAND-TM $P, \forall n, \forall x\in \{0,1\}^n, F(x)$ can be computed by $P$ in $T(n)$ steps.

两者只有前面两个量词顺序不同。直觉上，$\mathrm{TIME}$ 要求对所有 $n$ 找到一个通用的 $P$，而 $\mathrm{SIZE}$ 只需要对每个 $n$ 找到一个对应的 $P$ 即可，因此 $\mathrm{TIME}$ 应该要求更高。
::

::fold{title="**定理**：$\mathrm{TIME}$ 和 $\mathrm{SIZE}$ 的关系" success always expand}
$\forall$ nice function $T(n)$，都有 **$\mathrm{TIME}(T(n)) \subseteq \mathrm{SIZE}(T(n)^3)$**。

::
