---
title: Lecture 14
---

$\newcommand{\zeroone}{\{0,1\}}$
$\newcommand{\zeroonestar}{\zeroone^*}$

我们之前研究的图灵机缺少一个重要的功能：随机。本节课将介绍**随机化算法**。

---

**随机图灵机**是标准图灵机的扩展，允许存在转移：

$$
\delta(q, \sigma) = \begin{cases}
(q_1, \sigma_1, d_1)\\
(q_2, \sigma_2, d_2)
\end{cases}
$$

每一步，随机图灵机以 $1/2$ 的概率选择上面两种转移中的一种。

**RNAND-TM** 是 NAND-TM 的随机化版本，在原先的基础上提供指令 `? = RAND()`，每次调用会等概率返回 0 或 1。

---

**BPP（Bounded-error Probabilistic Polynomial time）**：函数 $F: \zeroonestar \to \zeroone \in \mathcal{BPP}$，如果存在随机图灵机 $M$，使得对所有输入 $x\in\zeroonestar$，满足：

1. $M$ 在 $a|x|^b$ 步内停机（$a,b$ 是常数）；
2. $\Pr[M(x) = F(x)] \geq \frac{2}{3}$。

此处 $2/3$ 其实可以替换为任意大于 $1/2$ 的常数，因为我们总是可以通过下述**放大引力**来将成功概率放大到任意接近 1。

::fold{title="**定理**：Amplification Lemma" success always expand}
设 $F: \zeroonestar \to \zeroone$，如果存在多项式时间随机图灵机 $P$ 和常数 $\delta < 1/2$，使得对所有输入 $x\in\zeroonestar$，满足：

$$
\Pr[P(x) = F(x)] \geq 1 - \delta
$$

那么对于任意多项式 $q(n)$，存在多项式时间随机图灵机 $Q$，使得：

$$
\Pr[Q(x) = F(x)] \geq 1 - 2^{-q(|x|)}
$$

:::fold{title="证明" expand}
（课上详细讲了，这里只记一个 sketch）

仅需让 $P$ 独立运行 $k$ 次，取多数投票结果作为 $Q$ 的输出即可。
:::
::

考虑到随机性的来源可以是通过**采样外部随机位串**来实现，我们可以给出 BPP 的另一种等价定义：

**BPP 等价定义**：函数 $F: \zeroonestar \to \zeroone \in \mathcal{BPP}$，如果存在 **$G\in\mathcal{P}$**，使得对所有输入 $x\in\zeroonestar$，满足：

$$
\Pr_{r\in\zeroone^{a|x|^b}}[G(x, r) = F(x)] \geq \frac{2}{3}
$$

其中 $r$ 是均匀随机串。（证明略）

::fold{title="$\mathcal{BPP}$ 与其他复杂度类的关系" success always expand}
**$\mathcal{P} \subseteq \mathcal{BPP} \subseteq \mathcal{EXP}$**。（是相等还是真包含还未解决）

:::fold{title="证明" expand}

-   $\mathcal{P} \subseteq \mathcal{BPP}$：确定性算法是随机算法的特例。
-   $\mathcal{BPP} \subseteq \mathcal{EXP}$：如果 $F\in\mathcal{BPP}$，那我们只需要花 $O(2^{a|x|^b})$ 的时间枚举所有随机串 $r$，统计多数投票结果即可。

:::
::

**$\mathcal{BPP} \subseteq \mathcal{P}/\mathrm{poly}$.**

**伪随机生成器**：略。
