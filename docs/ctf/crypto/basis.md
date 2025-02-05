---
title: 数学基础
---

## 二次剩余

::fold{expand success title=定义}
若存在整数 $x$ 使得 $x^2 \equiv a \pmod{p}$，则称 $a$ 是模 $p$ 的二次剩余，否则称为二次非剩余.
::

$p$ 为合数的讨论较为复杂（NP-hard），这里只讨论 $p$ 为奇素数的情况.

---

### 判定

**Legendre 符号 $\left(\dfrac{a}{p}\right)$** $:= a^{(p-1)/2}\bmod p$，其中 $p$ 是奇素数.

 - 若 $(a / p) = 1$，则 $a$ 是二次剩余.
 - 若 $(a / p) = -1$，则 $a$ 是二次非剩余.
 - 若 $(a / p) = 0$，则 $a \equiv 0 \pmod p$. 即 $p \mid a$.

**性质：**

 - **完全积性**：对任意 $a, b \in \mathbb{Z}$，有 $\left(\dfrac{ab}{p}\right) = \left(\dfrac{a}{p}\right)\cdot\left(\dfrac{b}{p}\right)$.
 - **二次互反律**：对任意奇素数 $p \neq q$，有 $\left(\dfrac{p}{q}\right)\cdot\left(\dfrac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}$.
 - **二次剩余的个数**：对奇素数 $p$，模 $p$ 意义下二次剩余和二次非剩余均有 $\dfrac{p-1}{2}$ 个.

### 求解

**当 $p \equiv 3 \pmod{4}$ 时**，对于方程 $x^2 \equiv a \pmod{p}$，

 - $a^{(p+1)/4} \bmod p$ 为一个解.（费马小定理推得）
 - **Atkin 算法**：令 $b \equiv (2a)^{(p-5)/8}\pmod p$，$\mathrm{i}\equiv2ab^2\pmod p$，则 $\mathrm{i}^2\equiv-1\pmod p$，且 $ab(i-1)\bmod p$ 为一个解.

**当 $p \equiv 1 \pmod{4}$ 时**，可由 **Tonelli-Shanks 算法**求解.

 - SageMath：`mod(a, p).sqrt()`.

---

## 循环群

::fold{expand success title=定义}
设 $G$ 是一个群，若存在 $g \in G$ 使得 $G = \{g^k\mid k\in\mathbb{Z}\}$，则称 $G$ 是一个**循环群**，$g$ 是 $G$ 的一个**生成元**.

若存在最小 $n \in \mathbb{Z}$ 使得 $G = \{e, g, g^2, \ldots, g^{n-1}\}$，其中 $e$ 是 $G$ 的单位元，则称 $G$ 是一个**有限循环群**. 此时 $n$ 称为 $G$ 的**阶**，记作 $|G|$.
::

**循环群元素的阶**：对循环群中任意一个元素，都可以写成 $g^k$ 的形式，$g^k$ 的阶可由 $\operatorname{ord}(g^k) = \dfrac{n}{\gcd(n, k)}$ 求得.
