---
title: Lecture 03
---

::fold{title="**定理**" success always expand}
任意 finite function $f: \{0, 1\}^n \to \{0, 1\}^m$，存在有 $O\left(\dfrac{m\cdot 2^n}{n}\right)$ 个门的布尔电路计算 $f$，且这个界是**紧的**（存在某个电路必须需要这么多门）。

:::fold{title="证明：$\forall f$，至多需要 $O((m\cdot 2^n)/ n)$ 个门" expand}
定义 $\text{LOOKUP}_k: \{0, 1\}^{2^k + k} \to \{0, 1\}$ 为 $\text{LOOKUP}_k(\mathbb{x}, i) = x_i$，即返回 $\mathbb{x}$ 这个长度为 $2^k$ 的字符串中第 $i$ 位的值。

递推，用主定理可知 $\text{LOOKUP}_k$ 可用 $O(2^k)$ 个门实现。

后面的略了，复习的时候记得看一下。
:::

:::fold{title="证明：$\exists f$，至少需要 $O((m\cdot 2^n)/ n)$ 个门" expand}
**引理**：$\{0,1\}^n \to \{0,1\}$ 的函数共有 $2^{2^n}$ 个。（显然）

**引理**：$\leqslant s$ 行的 NAND-CIRC 程序 $P$ 可被编码为长度为 **$O(s \log s)$** 的字符串。

**证明**：$s$ 行，每行都是 $x = \text{NAND}(y, z)$，最多三个变量，因此整个程序最多 $3s$ 个变量，排成一行，前 $n$ 个是输入变量，然后 $m$ 个输出变量，剩下的都是中间变量。每行可以表示为 $(i, j, k)$ 的元组，这个元组可以用 $O(\log s)$ 位表示，因此整个程序可以用 $O(s \log s)$ 位表示（精确值是 **$3s\lceil\log 3s\rceil$**）。

由引理，$\leqslant s$ 行的 NAND-CIRC 程序最多只有 $2^{c s \log s}$ 个，即 $\#P(s) \leqslant 2^{c s \log s}$。

令 $s = \dfrac{2^n}{cn}$，则 $\#P(s) \leqslant 2^{\frac{2^n}{n}\log s} < 2^{2^n}$。根据鸽笼原理，存在某个函数 $f: \{0,1\}^n \to \{0,1\}$，其任意 NAND-CIRC 程序至少需要 $s = \Omega\left(\dfrac{2^n}{n}\right)$ 行，命题得证
:::
::

定义 $\text{EVAL}_{s, n, m}: \{0, 1\}^{3s\lceil\log 3s\rceil + n} \to \{0, 1\}^m$，输入 $s$ 行的 NAND-CIRC 程序 $P$ 和长度为 $n$ 的 $\mathbb{x}$，输出 $P(\mathbb{x})$ 的值。

::fold{title="**定理**" success always expand}
存在有 $O(s^2 \log s)$ 个门的布尔电路计算 $\text{EVAL}_{s, n, m}$。（可以优化到 $O(s \log s)$，课上没细讲叫看书）

证明：略（原理是先写 python 程序，把里面的变量的 get 和 update 分别用 LOOKUP 和定义临时变量替代）
::