---
title: Lecture 06
---

## Pumping Theorem

::fold{title="**泵引理**：正则表达式的必要条件" success always expand}
若语言 $L$ 是正则的，则存在一个整数 $p \geqslant 1$（称为 **Pumping length**），使得对任意字符串 $w \in L$，只要 $|w| \geqslant p$，就可以将 $w$ 分解为 $w = xyz$，满足：

1.  对任意 $i \geqslant 0$，字符串 $xy^iz \in L$；
2.  $|y| > 0$；
3.  $|xy| \leqslant p$。

:::fold{title="证明" expand}
设 $M = (K, s, F, \delta)$ 是一个接受 $L$ 的 DFA，令 $p = |K|$（**State 数**）。对任意 $w \in L$，且 $|w| \geqslant p$，考虑 $M$ 处理 $w$ 的过程：

由于 $|w| \geqslant p$，根据抽屉原理，在处理前 $p$ 个字符时，**$M$ 一定会访问某个状态两次**。设这两个位置分别为 $j$ 和 $k$，其中 $0 \leqslant j < k \leqslant p$。

将 $w$ 分解为 $w = xyz$，其中：

-   $x$ 是 $w$ 的前 $j$ 个字符；
-   $y$ 是从位置 $j$ 到 $k$ 的字符；
-   $z$ 是剩余的字符。

由于 $M$ 在处理 $y$ 时从状态 $q$ 回到状态 $q$，因此对于任意 $i \geqslant 0$，字符串 $xy^iz$ 也会被 $M$ 接受。

此外，$|y| = k - j > 0$，且 $|xy| = k \leqslant p$。
:::

:::fold{title="例题" info expand}
_Use pumping theorem to show that $L=\{ww : w\in\{0, 1\}^*\}$ is not regular._

假设 $L$ 是正则的，则存在一个整数 $p \geqslant 1$ 满足泵引理。

选择字符串 $s = 0^p1^p0^p1^p \in L$，显然 $|s| = 4p > p$。根据泵引理，$s$ 可以被分解为 $s = xyz$，满足上述三个条件。由于 $|xy| \leqslant p$，所以 $y$ 只能包含字符 '0'。设 $y = 0^k$，其中 $k > 0$。根据泵引理，对任意 $i \geqslant 0$，字符串 $xy^iz \in L$。选择 $i = 2$，则有：

$$xy^2z = 0^{p+k}1^p0^p1^p$$

显然，$xy^2z \notin L$，因为它不再是形如 $ww$ 的字符串。这与假设 $L$ 是正则的矛盾。因此，语言 $L = \{ww : w\in\{0, 1\}^*\}$ 不是正则的。
:::
::
