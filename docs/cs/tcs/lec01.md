---
title: Lecture 01
---

## 二进制字符串

**字母表**：$\Sigma = \{0, 1\}$

-   $\Sigma^n = \Sigma \times \cdots \times \Sigma = \{(a_1, a_2, \ldots, a_n) \mid a_i \in \Sigma\}$
-   $\Sigma^0 = \{e\}$，$e$ 表示空字符串
-   $\Sigma^* = \Sigma^0 \cup \Sigma^1 \cup \Sigma^2 \cup \cdots = \bigcup_{n \geqslant 0} \Sigma^n$

**连接**：$x = a_1 a_2 \ldots a_n$，$y = b_1 b_2 \ldots b_m$，则 $xy = a_1 a_2 \ldots a_n b_1 b_2 \ldots b_m$

**前缀**，**后缀**：略。

## 编码

$E: A \to \{0, 1\}^*$ 是 $A$ 的一个**编码**，如果 $E$ 是单射（当 $x \neq x'$ 时，$E(x) \neq E(x')$）

**无前缀编码**：对于任意 $x \neq x'$，$E(x)$ 不是 $E(x')$ 的前缀。

::fold{title="**引理**：无前缀扩展" info always expand}
如果 $E: A \to \{0, 1\}^*$ 是无前缀编码，则 $E$ 可以扩展为单射 $\overline{E}: A^* \to \{0, 1\}^*$，定义为

$$
\overline{E}(x_1, x_2, \ldots, x_n) = \begin{cases}
E(x_1) E(x_2) \cdots E(x_n) & \text{若 } n \geqslant 1 \\
e & \text{若 } n=0
\end{cases}
$$

::

::fold{title="**引理**：单射 $\Rightarrow$ 无前缀" info always expand}
如果存在单射 $E: A \to \{0, 1\}^*$，则存在无前缀编码 $E': A \to \{0, 1\}^*$，使得对任意 $a \in A$，有 $|E'(a)| \leqslant 2|E(a)| + 2$。

:::fold{title="证明" expand}
将每个 $0$ 替换为 $00$，每个 $1$ 替换为 $01$，并在末尾添加 $11$。例如，如果 $E(a) = 010$，则 $E'(a) = 0100011$。
:::

::

::fold{title="**定理**" success always expand}
如果存在单射 $E: A \to \{0, 1\}^*$，则存在单射 $\overline{E}: A^* \to \{0, 1\}^*$。

（可以对自然数做编码，那就可以对自然数的向量做编码）
::

**自然数 $\mathbb{N}$**：（NtS = Natural to String）

$$
    NtS(n) = \begin{cases}
    0 & \text{若 } n=0 \\
    1 & \text{若 } n=1 \\
    NtS(\lfloor n/2 \rfloor) \cdot \text{parity}(n) & \text{若 } n > 1
    \end{cases}
$$

其中 $\text{parity}(n)$ 表示 $n$ 的奇偶性（$n$ 为偶数时为 $0$，为奇数时为 $1$）

## 可数

::fold{title="**定理**" success always expand}
以下命题等价

1. $A$ 可数
2. $A$ 是有限集或存在**双射** $f: A \to \mathbb{N}$
3. 存在**单射**（one-to-one）$g: A \to \mathbb{N}$
4. 存在**满射**（onto）$h: \mathbb{N} \to A$

::

::fold{title="**引理**" info always expand}
$\{0, 1\}^*$ 是可数的。

:::fold{title="证明" expand}
按字符串长度对 $\{0, 1\}^*$ 进行分块：$\{0, 1\}^* = \Sigma^0 \cup \Sigma^1 \cup \Sigma^2 \cup \Sigma^3 \cup \cdots$，在每个块内按对应数的二进制表示排序。
:::
::

::fold{title="**定理**：可数=可编码" success always expand}
$A$ 可数当且仅当存在单射 $E: A \to \{0, 1\}^*$。
::

本课程只讨论 $f: \{0, 1\}^* \to \{0, 1\}^*$ 的 problem（输入输出必须可数）。
