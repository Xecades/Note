---
title: Lecture 02
---

**Finite function**：$f: \{0, 1\}^n \to \{0, 1\}^m$。

**AND**、**OR**、**NOT**：略。

**MAJ**：即选择出现最多的数，$\text{MAJ}_3: \{0,1\}^3 \to \{0,1\}$ 定义为

$$\text{MAJ}_3(x_1, x_2, x_3) = \begin{cases} 1 & \text{若 } x_1 + x_2 + x_3 \geqslant 2 \\ 0 & \text{否则} \end{cases}$$

::fold{title="**定理**" success always expand}
函数 $f$ 可被布尔电路计算 $\leftrightarrow$ $f$ 可被 AON-CIRC 程序计算。

且 $f$ 的**门数**和 AON-CIRC 程序的**行数**相等。

:::fold{title="AON-CIRC 程序实现 XOR" expand}

```
temp_1 = AND(x[0], x[1])
temp_2 = NOT(temp_1)
temp_3 = OR(x[0], x[1])
y[0] = AND(temp_2, temp_3)
```

:::
::

**NAND** 可以实现 AON 所有门。

::fold{title="**定理**" info always expand}
布尔电路 $\leftrightarrow$ NAND 电路 $\leftrightarrow$ AON-CIRC 程序 $\leftrightarrow$ NAND-CIRC 程序。

四者相互转换，且门数/行数保持同量级。
::

$\mathcal{F}=\{f_1, f_2, \ldots, f_k\}$ 是 **universal** 的，当且仅当它们可以计算 NAND。
