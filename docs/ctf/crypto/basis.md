---
title: 密码学数学基础
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

 - SageMath：`mod(a, p).sqrt()`{language=python}.

---

## 离散对数

::fold{expand success title=定义}
1. 设 $G$ 是一个群，若存在 $g \in G$ 使得 $G = \{g^k\mid k\in\mathbb{N}\}$，则称 $G$ 是一个**循环群**，$g$ 是 $G$ 的**生成元**.
2. 对 $G$ 中的任意元素 $y$，都可以写成 $y = g^k$ 的形式，称 $k$ 为 $y$ 在群 $G$ 中的离散对数，简称**对数**.
3. 设 $m \geqslant 1$，$(a, m) = 1$，称使得 $a^d \equiv 1 \pmod{m}$ 的最小正整数 $d$ 为 $a$ 模 $m$ 的**阶**，记作 $\operatorname{ord}_m(a)$ 或 $\delta_m(a)$. 当 $\operatorname{ord}_m(a) = \varphi(m)$ 时，称 $a$ 是 $m$ 的**原根**.
::

**模 $m$ 剩余系存在原根的充要条件**：$m = 2, 4, p^k, 2p^k$，其中 $p$ 是奇素数，$k$ 是正整数.

**Lagrange 定理**：$g^k$ 在有限群 $G$ 中的阶是 $\dfrac{\operatorname{ord}(g)}{\gcd(k, \operatorname{ord}(g))}$.

---

### 离散对数问题 DLP

已知 $g$、$p$ 和 $y$，对于方程 $y = g^x \pmod{p}$，求解 $x$ 是一个困难问题.

用到离散对数的加密算法：[Diffie-Hellman 密钥交换](./diffie-hellman)、ElGamal 加密算法、椭圆曲线算法等.

---

### 攻击途径

[**Alpertron 离散对数求解器**](https://www.alpertron.com.ar/DILOG.HTM)

[**SageMath**](https://doc.sagemath.org/html/en/reference/groups/sage/groups/generic.html)：能自动选择算法，可计算椭圆曲线上的离散对数.

**Baby-Step Giant-Step 算法**：时间复杂度 $\Theta(\sqrt{p})$.

**Pohlig-Hellman 算法**：当 $\operatorname{ord}_p(g)$ 是光滑数时，可分解为子问题求解.

 - 若 $n = \displaystyle\prod_{i=1}^k p_i^{e_i}$ 的所有质因子 $p_i$ 都很小，则称 $n$ 是一个**光滑数**.（不是严格定义）
 - 如果 $p$ 是质数，则 $\operatorname{ord}_p(g) = \varphi(p) = p-1$，这也是常用 $p=2q+1$ 的原因.
 - 时间复杂度 $\Theta\left(\displaystyle\sum_{i=1}^k e_i\left(\log p + \sqrt{p_i}\right)\right)$.

**Pollard's $\rho$ 算法**：一种随机算法，时间复杂度 $\Theta(\sqrt{p})$.

**Pollard's Kangaroo 算法**：如果已知 $x \in [a, b]$，时间复杂度 $\Theta(\sqrt{b-a})$.

---

### Pohlig-Hellman 算法原理

::note{info}
以下证明来自 [Wikipedia](https://en.wikipedia.org/wiki/Pohlig%E2%80%93Hellman_algorithm).
::

对于离散对数问题 $y = g^x \pmod{p}$，设 $n := \operatorname{ord}_p(g) = \displaystyle\prod_{i=1}^k p_i^{e_i}$.

1. 对每个 $i \in \{1, \cdots, r\}$：
    - 计算 $g_i\equiv g^{n/p_i^{e_i}}\pmod p$. 由 Lagrange 定理，$g_i$ 的阶是 $p_i^{e_i}$.
    - 计算 $y_i \equiv y^{n/p_i^{e_i}} \equiv g^{xn/p_i^{e_i}} \equiv g_i^x \equiv g_i^{x\bmod p_i^{e_i}} \equiv g_i^{x_i} \pmod p$. 由于 $n$ 是光滑数，$x_i$ 的范围为 $[0, p_i^{e_i})$，可知其范围较小，可以用其他算法求解.
2. 得到 $x\equiv x_i\pmod{p_i^{e_i}}$，由中国剩余定理得到 $x$.

::fold{expand info title="用 Pohlig-Hellman 算法求解椭圆曲线上的离散对数问题 $G\times x=A$"}
```python
facts = list(factor(G.order()))
mods, rems = [], []

for fact in facts:
    t = fact[0] ** fact[1]
    G0 = G * (G.order() // t)
    A0 = A * (G.order() // t)
    mods.append(t)
    rems.append(discrete_log(A0, G0))

x = crt(rems, mods)
```
::

若 $n$ 并非完全光滑，例如存在一个大素数因子，仍可通过 Pohlig-Hellman 算法限制 $x$ 的范围，见 [PicoCTF 2017: ECC2 的 Writeup](https://gist.github.com/jproney/7e6cb7a40a8bf342e978a900a32e4dfc).
