---
title: Lecture 10
---

## Recursion Theorem

用记号 $\langle M \rangle$ 表示图灵机 $M$ 的编码。

::fold{title="构造 Quine" info always expand}
我们尝试构造一个图灵机 $Q$，使得它输出自己的编码 $\langle Q \rangle$。

考虑函数 $q: \{0,1\}^* \to \{0,1\}^*$，$q(w) = \langle M_w \rangle$，其中 $M_w$ 是一个图灵机，满足 $M_w$ 在任意输入上都输出 $w$。显然 $q$ 是可计算的。

构造图灵机 $B$：

```
on input w:
    compute q(w)
    write q(w) to the tape and swap it with w
```

即最开始输入纸带为 $w$，经过 $B$ 的计算后，纸带上变为 $q(w) \cdot w$。

构造图灵机 $A$，无论输入，都清空纸带并输出 $B$ 的编码 $\langle B \rangle$，也就是定义 $A = M_{\langle B \rangle}$。

定义 $Q = A\to B$，即先运行 $A$，再运行 $B$。

首先运行 $A$，无论输入为何，纸带上都变为 $\langle B \rangle$。然后运行 $B$，纸带上变为 $q(\langle B \rangle) \cdot \langle B \rangle$。而 $q(\langle B \rangle) = \langle M_{\langle B \rangle} \rangle$，**后者是一个输出 $B$ 的编码的图灵机的编码，即 $A$ 的编码**。因此，最终纸带上变为 $\langle A \rangle \cdot \langle B \rangle = \langle Q \rangle$。
::

::fold{title="**Recursion Theorem**" success always expand}
对于任意图灵机 $T$，$T$ 输入一个图灵机的编码 $\langle M \rangle$ 和 $x$，都能构造出一个图灵机 $R$，使得对于任意输入 $x$，$R(x) = T(\langle R \rangle, x)$。

本质上是说，**“图灵机获得自己的编码”这件事是可计算的**。

:::fold{title="证明" expand}

和上面的 Quine 构造类似，考虑 $R = A \to B \to T$，输入 $x$ 时：

1. 运行 $A$（不删纸带），$A$ 把 $B$ 和 $T$ 的编码写到纸带上；此时纸带为 $x\langle B \rangle \langle T \rangle$。
2. 运行 $B$，$B$ 把 $A$ 的编码写到纸带上，并重排纸带；此时纸带为 $\langle A \rangle \langle B \rangle \langle T \rangle x$，即为 $\langle R \rangle x$。
3. 运行 $T$，此时 $T$ 的输入正是 $\langle R \rangle$ 和 $x$。

:::
::

::fold{title="用 Recursion Theorem 证明 `HALT` 不可计算" info always expand}
假设 `HALT` 可计算，构造图灵机 $M$：

```
on input w:
    obtain <M>
    run HALT(M, w)
    if HALT(M, w) == 1:
        loop forever
    else:
        halt
```

则对于任意输入 $w$，$M$ 在 $w$ 上停机 $\iff$ $M$ 在 $w$ 上不停机，矛盾。
::

**Minimal**：称 $M$ 是最小的，如果对于任意功能等价图灵机 $M'$，都有 $|\langle M \rangle| \leqslant |\langle M' \rangle|$。

::fold{title="用 Recursion Theorem 证明是否是最小图灵机不可判定" info always expand}

$$
\text{MINI}(M) =
\begin{cases}
1, & \text{if } M \text{ is minimal} \\
0, & \text{otherwise}
\end{cases}
$$

假设 `MINI` 可计算，构造图灵机 $M$：

```
on input x:
    obtain <M>
    for s in {0,1}^* in increasing order of length:
        if MINI(s) == 1 and |s| > |<M>|:
            run s on x
            return s(x)
```

首先，最小的图灵机是无限的，而 $M$ 的编码长度有限，因此总能找到一个编码长度大于 $M$ 的最小图灵机 $s$。

但是，$M$ 的运行结果就是 $s$ 的运行结果，因此 $M$ 和 $s$ 功能等价，且 $|s| > | \langle M \rangle |$，矛盾。
::

::fold{title="**不动点定理**" success always expand}
对于任意可计算函数 $t: \{0,1\}^* \to \{0,1\}^*$，都存在图灵机 $F$，使得对于任意输入 $x$，都有 $t(\langle F \rangle) = \langle M\rangle$，其中 $M$ 与 $F$ 功能等价。

（假设：所有 01 串都能被解释为图灵机编码，如果编码错误，则对应一台马上停机的图灵机）

:::fold{title="证明" expand}
构造图灵机 $F$：

```
on input w:
    obtain <F>
    compute t(<F>), let it be <M>
    simulate M on w
```

:::
::

## Godel 不完备定理

**Statement**：字符串 $x$（e.g. “HALT is uncomputable”）

**Proof**：字符串 $t$

定义 $\mathcal{T} \subseteq \{0,1\}^*$，为**所有真命题的集合**。

**Proof system for $\mathcal{T}$**：图灵机 $V$：

$$
V(x, t) =
\begin{cases}
1, & \text{if } t \text{ is a valid proof of statement } x \\
0, & \text{otherwise}
\end{cases}
$$

并且（我们希望它）满足：

1. **Effectiveness**：$\forall x, t\in \{0,1\}^*$，$V(x, t)$ 总会停机；
2. **Soundness**：$\forall x \notin \mathcal{T}, t \in \{0,1\}^*$，都有 $V(x, t) = 0$；（不会证明假命题）
3. **Completeness**：$\forall x \in \mathcal{T}$，$\exists t \in \{0,1\}^*$，使得 $V(x, t) = 1$。（所有真命题都能被证明）

::fold{title="**Godel 不完备定理**" success always expand}
任何满足 Effectiveness 和 Soundness 的证明系统都不可能是 Complete 的。

:::fold{title="证明" expand}
令 $\mathcal{T}$ 为所有类似下列形式的真命题的集合：

“a TM $M$ halts on 0” 或 “a TM $M$ does not halt on 0”。

如果 $\mathcal{T}$ 有一个完备的证明系统 $V$，我们试图证明 `HALTONZERO` 可计算：

对于任意 $M$，我们并行地做下面两件事：

```
1. run M on 0
2. let x = "M does not halt on 0"
   for t in {0,1}^* in increasing order of length:
       run V(x, t)
       if V(x, t) == 1:
           return 0
```

注意到，如果进程 1 停机，则说明 $M$ 会在 0 上停机，那么 $x$ 是假命题，由 Soundness 可知进程 2 不会停机；

如果进程 1 不停机，则说明 $M$ 不会在 0 上停机，则一定能找到某个 $t$ 使得 $V(x, t) = 1$，由 Completeness 可知进程 2 会停机。

两个进程有且只有一个会停机，我们只需要观察哪个进程停机，就能判定 $M$ 是否在 0 上停机，从而计算出 `HALTONZERO`，矛盾。
:::
::

（后面推广到 Qualified Integer Statements，给了证明的 sketch，只不过没细看）
