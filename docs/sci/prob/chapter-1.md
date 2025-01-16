---
title: Ch.1 事件及其概率
---

## 公理化定义

::fold{title="概率空间 $(\Omega,\mathcal{F},P)$" expand success}
1. **样本空间 $\Omega$**：样本点 $\omega$ 的全体.
2. **事件域 $\mathcal{F}$**：$\Omega$ 中满足以下条件的子集的全体：
   - $\Omega\in\mathcal{F}$；
   - 若 $A\in\mathcal{F}$，则 $\overline{A}\in\mathcal{F}$；
   - 若 $A_1,A_2,\ldots\in\mathcal{F}$，则 $\bigcup_{i=1}^\infty A_i\in\mathcal{F}$.
3. **概率测度 $P$**：$\mathcal{F}\to\mathbb{R}$ 的映射，满足：
   - 非负性：$P(A)\geqslant 0$；
   - 规范性：$P(\Omega)=1$；
   - 可列可加性：若 $A_1,A_2,\ldots\in\mathcal{F}$ 两两互不相容，则
     $$
     P\left(\sum_{i=1}^\infty A_i\right)=\sum_{i=1}^\infty P(A_i).
     $$
::

$\mathcal{F}$ 称为 $\Omega$ 上的 $\sigma$-代数或 $\sigma$-域，$\mathcal{F}$ 中的元素（$\Omega$ 的子集）称为事件.

若 $\Omega = \mathbb{R}^n$，取一切左开右闭的 $n$ 维矩形及其（有限或可列）并、（有限或可列）交、逆所组成的集合为 $\mathcal{F}$，记作 $\mathcal{B}^n$，称为 $n$ 维 Borel $\sigma$-代数.

---

 - 若 $A_1,A_2,\ldots,A_n$ 两两互不相容，则
    $$
    P\left(\sum_{i=1}^n A_i\right)=\sum_{i=1}^n P(A_i).
    $$
 - 若 $B\subset A$，则 $P(A-B)=P(A)-P(B)$.（其实 $A-B$ 的写法已经蕴含了 $B\subset A$.）
 - $P(A\cup B)=P(A)+P(B)-P(AB)$.
 - $P(A\setminus B)=P(A)-P(AB)$.

---

## 条件概率

在事件 $B$ 发生的条件下 $A$ 发生的概率

$$
P(A\mid B)=\frac{P(AB)}{P(B)}.
$$

有乘法公式

$$
P(AB)=P(A\mid B)\cdot P(B).
$$

推广：

$$
P(A_1A_2\cdots A_n)=P(A_1)\cdot P(A_2\mid A_1)\cdot P(A_3\mid A_1A_2)\cdots P(A_n\mid A_1A_2\cdots A_{n-1}).
$$

---

### 完备事件组

::fold{title="完备事件组" expand}
满足以下条件的事件列 $\{A_1,A_2,\cdots,A_n,\cdots\}$ 称为 $\Omega$ 的一个完备事件组：

1. $A_i$ 两两互不相容，且 $P(A_i)>0$；
2. $\sum_{i=1}^\infty A_i=\Omega$.

最简单的完备事件组是 $\{A,\overline{A}\}$.
::

---

### 全概率公式

::fold{title="全概率公式" expand success}
设 $\{A_1,A_2,\cdots,A_n,\cdots\}$ 是一个完备事件组，则对任一事件 $B$ 有

$$
P(B)=\sum_{i=1}^\infty P(A_i)\cdot P(B\mid A_i).
$$
::

> 注意到 $A_iB\subset A_i$，故 $(A_iB)$ 两两互不相容，由可列可加性得
>
> $$
> \begin{align*}
>     P(B)=P(B\Omega)&=P\left(B\sum_{i=1}^\infty A_i\right)=P\left(\sum_{i=1}^\infty A_iB\right)\\
>     &=\sum_{i=1}^\infty P(A_iB)=\sum_{i=1}^\infty P(A_i)\cdot P(B\mid A_i).
> \end{align*}
> $$
> 
> 证毕.

全概率公式本质是一个加权平均，$P(A_i)$ 即为权重.

---

### 贝叶斯公式

::fold{title="贝叶斯公式" expand success}
贝叶斯公式是对全概率公式的简单推广，即

$$
P(A_i\mid B)=\frac{P(A_i)\cdot P(B\mid A_i)}{\sum_{k=1}^\infty P(A_k)\cdot P(B\mid A_k)}.
$$
::

$P(A_i)$ 是在没有进一步关于 $B$ 的信息时对 $A_i$ 的概率，称为**先验概率**；

在得知新的信息 $B$ 后，人们对 $A_i$ 发生的可能性有了新的估计，得到条件概率 $P(A_i\mid B)$，称为**后验概率**.

::fold{title="**例 1.34**：贝叶斯决策" expand}
某工厂有四条流水线生产同一种样品，其中每条流水线产量分别占总产量的 $12\%$，$25\%$，$25\%$ 和 $38\%$，且各流水线的不合格率分别为 $0.06$，$0.05$，$0.04$ 和 $0.03$.

某客户购买了一件产品，发现是不合格品，向厂家提出索赔 $10000$ 元. 按规定，工厂要求四条流水线共同承担责任. 问每条流水线应该各赔付多少？
::

> 假设 $B$ 表示“任取一件产品是不合格品”，$A_i$ 表示“该产品是由第 $i$ 条流水线生产的”，则
>
> $$
> \begin{align*}
>     P(B) &= \sum_{i=1}^4 P(A_i)\cdot P(B\mid A_i) \\
>     &= 0.12\times 0.06 + 0.25\times 0.05 + 0.25\times 0.04 + 0.38\times 0.03 \\
>     &= 0.0411.
> \end{align*}
> $$
>
> 说明工厂产品不合格率为 $4.11\%$. 现在客户所购买产品为不合格品，即 $B$ 发生了，因此需要求出在 $B$ 条件下 $A_i$ 发生的概率 $P(A_i\mid B)$，并按比例分配赔偿金额.
>
> 由贝叶斯公式
>
> $$
> P(A_i\mid B)=\frac{P(A_i)\cdot P(B\mid A_i)}{P(B)}
> $$
>
> 计算得到 $P(A_1\mid B)\approx0.175$，$P(A_2\mid B)\approx0.304$，$P(A_3\mid B)\approx0.243$，$P(A_4\mid B)\approx0.278$，故每条流水线应分别赔付 $1750$ 元，$3040$ 元，$2430$ 元和 $2780$ 元.

---

## 事件独立性

> **$A$ 与 $B$ 独立**：$P(A\mid B)=P(A)$，或 $P(AB)=P(A)\cdot P(B)$.

任何事件都与 $\emptyset$ 和 $\Omega$ 独立.

若 $A$ 与 $B$ 互不相容（$P(AB)=0$），且 $P(A)P(B)\neq0$，则 $A$ 与 $B$ 一定不独立.

> **$n$ 个事件相互独立**：对一切 $1\leqslant i<j<k<\cdots\leqslant n$，有
> 
> $$
> \left\{\begin{align*}
> &P(A_iA_j)=P(A_i)P(A_j) \\
> &P(A_iA_jA_k)=P(A_i)P(A_j)P(A_k) \\
> &\cdots \\
> &P(A_1A_2\cdots A_n)=P(A_1)P(A_2)\cdots P(A_n)
> \end{align*}\right.
> $$

上述 $\displaystyle\binom{n}{2}+\cdots+\binom{n}{n}=2^n-n-1$ 个等式缺一不可.
