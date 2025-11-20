---
title: Lecture 09
---

**Church-Turing Thesis**: Any function that can be computed by an algorithm can be computed by a Turing machine.（即图灵机 capture 了计算的本质）（不可证明，只是断言）

## Universal Turing Machine

**通用图灵机**：$U(M, x) := M(x)$

**构造方法**：$M$ 的转移函数 $\delta: K \times \Sigma \to K \times \Sigma \times \{L, R, S, H\}$ 本质是五元组 $(k, \sigma, k', \sigma', d)$ 的集合，且这样的五元组最多有 $|K| \cdot |\Sigma|$ 个。很容易用 Python 写一个按照五元组列表模拟 $M$ 的程序，由于 Python 和图灵机等价，故存在一个图灵机 $U$ 能够模拟任意图灵机 $M$。

## 可计算性

::fold{title="**定理**：存在不可计算函数" success always expand}
存在布尔函数 $F^*: \{0,1\}^* \to \{0,1\}$，使得不存在图灵机 $M$ 计算 $F^*$。

这样的函数称为**不可计算的**（uncomputable），对应的语言称为**不可判定的**（undecidable）。

:::fold{title="证明 1（非构造性证明）" expand}

1. 所有布尔函数的集合是不可数的；
2. 所有图灵机的集合是可数的（因为可以编码）；

因此，存在不可被图灵机计算的布尔函数。

:::

:::fold{title="证明 2（构造性证明）" expand}

$$
F^*(x) =
\begin{cases}
0, & \text{if } x \text{ is the encoding of a TM } M \text{ and } M(x) = 1 \\
1, & \text{otherwise}
\end{cases}
$$

考虑对于 $\forall M$：

-   如果 $M(M) = 1$，则 $F^*(M) = 0 \neq M(M)$；
-   如果 $M(M) \neq 1$，则 $F^*(M) = 1 \neq M(M)$。

即存在某个输入 $M$，使得 $F^*(M) \neq M(M)$，因此不存在图灵机计算 $F^*$。

证明原理：**Diagonalization**，本质是还是利用了不可数性。

:::
::

::fold{title="**停机问题**" info expand}
**问题：**是否存在图灵机 $\text{HALT}$，对于任意图灵机 $M$ 和输入 $x$，$\text{HALT}(M, x)$ 能够判定 $M$ 是否在输入 $x$ 上停机？

$$
\text{HALT}(M, x) =
\begin{cases}
1, & \text{if } M \text{ halts on input } x \\
0, & \text{otherwise}
\end{cases}
$$

只需证明，如果 $\text{HALT}$ 可被 $M_\text{HALT}$ 计算，则 $F^*$ 也可被计算，从而导出矛盾。

如下算法可以计算 $M_{F^*}(x)$：

```
on input x:
    run M_HALT on (x, x)
    if M_HALT(x, x) == 0:
        return 1
    else:
        run x on x
        return 1 - x(x)
```

矛盾。
::

::fold{title="`HALT_ON_ZERO` 函数" info expand}
**问题：**是否存在图灵机 $\text{HALT\_ON\_ZERO}$，对于任意图灵机 $M$，$\text{HALT\_ON\_ZERO}(M)$ 能够判定 $M$ 是否在输入 `0` 上停机？

$$
\text{HALT\_ON\_ZERO}(M) =
\begin{cases}
1, & \text{if } M \text{ halts on input } 0 \\
0, & \text{otherwise}
\end{cases}
$$

只需构造从 `HALT` 到 `HALT_ON_ZERO` 的归约，即对于 `HALT` 的输入 $M, x$，构造图灵机 $N$，使得 $\text{HALT}(M, x) = \text{HALT\_ON\_ZERO}(N)$。

按照以下方式构造 $N$：

```
on input y:
    ignore y
    run M on x
    return M(x)
```

$N$ 在 0 上停机 $\iff$ $M$ 在 $x$ 上停机。

注：$M$ 和 $x$ 是硬编码到 $N$ 中的，因此可以由图灵机实现。

::

::fold{title="`ZEROFUNC` 函数" info expand}
**问题：**是否存在图灵机 $\text{ZEROFUNC}$，对于任意图灵机 $M$，$\text{ZEROFUNC}(M)$ 能够判定 $M$ 是否计算零函数？（即对于所有输入 $x$，$M(x) = 0$）

$$
\text{ZEROFUNC}(M) =
\begin{cases}
1, & \text{if } \forall x, M(x) = 0 \\
0, & \text{otherwise}
\end{cases}
$$

相同思路，需要构造一个 $N$，使得 $M$ 在 $x$ 上停机 $\iff$ $N$ 计算零函数。

按照以下方式构造 $N$：

```
on input y:
    run M on x
    return 0
```

::

## 规约

A **reduction** from $F$ to $G$ is a **computable** function $R: \{0,1\}^* \to \{0,1\}^*$ such that $F(x) = G(R(x))$ for all $x \in \{0,1\}^*$.（即把 $F$ 的输入通过图灵机映射到 $G$ 的输入，可理解为**难度上 $F \leqslant G$**）

::fold{title="**定理**：可计算性通过规约传递" success always expand}
如果 $F$ 可规约到 $G$，且 $G$ 可计算，则 $F$ 可计算。

**常用逆否：**若存在 $F$ 到 $G$ 的规约，且 $F$ 不可计算，则 $G$ 不可计算。
::

## Rice's Theorem

**功能等价**：图灵机 $M$ 和 $M'$ 是功能等价的（functionally equivalent），如果 $\forall x, M(x) = M'(x)$。（即计算同一个函数）

**语义的**：A property (function) $P: \{0,1\}^* \to \{0,1\}$ is **semantic** if $P(M) = P(M')$ for any pair of functionally equivalent TMs $M$ and $M'$.（即只关注输入输出，不关注具体实现）

::fold{title="**莱斯定理**" success always expand}
All **non-trivial** **semantic** properties of programs are **undecidable**.

(trivial 指所有程序都满足或所有程序都不满足)

:::fold{title="证明" expand}
定义图灵机 $M_\text{INF}$：

```
M_INF on input x:
    loop forever
```

即 $M_\text{INF}$ 在任何输入上都不停止。

由于 $P$ 是布尔函数，不妨设 $P(M_\text{INF}) = 0$（否则考虑 $1-P$ 即可）。

由于 $P$ 是非平凡的，因此存在某个图灵机 $M_\text{YES}$，使得 $P(M_\text{YES}) = 1$。

尝试构建从 $\text{HALT}(M, x)$ 到 $P(N)$ 的规约。

```
N = on input y:
    run M on x
    run M_YES on y
    return M_YES(y)
```

下面证明 $\text{HALT}(M, x) \equiv P(N)$：

-   如果 $\text{HALT}(M, x) = 0$，则 $M$ 在 $x$ 上不停止，因此 $N$ 在任何输入上都不停止，由于 $P$ 是语义的，$P(N) = P(M_\text{INF}) = 0 = \text{HALT}(M, x)$；
-   如果 $\text{HALT}(M, x) = 1$，则 $M$ 在 $x$ 上停止，因此 $N$ 在任何输入上都返回 $M_\text{YES}(y) = 1 = \text{HALT}(M, x)$。

因此 $P$ 是不可判定的。

:::
::
