---
title: Ch.2 Linear Algebra
---

量子用到的线性代数和传统线性代数有一些符号上的不同，我们主要使用 Paul Dirac 的符号体系. 除此之外，在科研领域，主要采用**复数域**来进行计算，而本书为了便于读者理解，主要使用**实数域**. 本文只介绍量子计算中用到的和常规线性代数有所不同的部分.

---

## Bra-Ket 记号

在 Dirac 符号体系中，我们称行向量为 **Bra**，记作 $\langle \cdot \rvert$，列向量为 **Ket**，记作 $\lvert \cdot \rangle$，例如

$$
\begin{align*}
\text{行向量 Bra } \langle v\rvert &= \begin{bmatrix} 1 & \sqrt{2} & -\pi & 3\end{bmatrix}, \\[1em]
\text{列向量 Ket } \lvert w\rangle &= \begin{bmatrix} 1 \\ 0 \\ -3\end{bmatrix}.
\end{align*}
$$

向量的元素个数称为向量的**维度**，相同维数的 Bra 和 Ket 可以进行**内积**，例如对于 $n$ 维 Bra $\langle a\rvert= \begin{bmatrix} a_1 & a_2 & \cdots & a_n \end{bmatrix}$ 和 $n$ 维 Ket $\lvert b\rangle = \begin{bmatrix} b_1 & b_2 & \cdots & b_n \end{bmatrix}^\top$，它们的内积为

$$
\langle a|b\rangle = \begin{bmatrix} a_1 & a_2 & \cdots & a_n \end{bmatrix} \begin{bmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{bmatrix} = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n.
$$

因此，向量的**模长** $\lvert\lvert a\rangle\rvert$ 也可以表示为 $\sqrt{\langle a|a\rangle}$.

---

## 标准正交基

在 $\mathbb{R}^2$ 平面中，我们定义如下几组**标准正交基**（Orthonormal basis）：

$$
\begin{align*}
\lvert\uparrow\rangle = \begin{bmatrix} 1 \\ 0 \end{bmatrix}&\text{ 和 }\lvert\downarrow\rangle = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \\[1em]
\lvert\rightarrow\rangle = \begin{bmatrix} \dfrac{1}{\sqrt{2}} \\[1em] \dfrac{-1}{\sqrt{2}} \end{bmatrix}&\text{ 和 }\lvert\leftarrow\rangle = \begin{bmatrix} \dfrac{1}{\sqrt{2}} \\[1em] \dfrac{1}{\sqrt{2}} \end{bmatrix}, \\[2.5em]
\lvert\nearrow\rangle = \begin{bmatrix} \dfrac{1}{2} \\[1em] \dfrac{-\sqrt{3}}{2} \end{bmatrix}&\text{ 和 }\lvert\swarrow\rangle = \begin{bmatrix} \dfrac{\sqrt{3}}{2} \\[1em] \dfrac{1}{2} \end{bmatrix}.
\end{align*}
$$

给定一组标准正交基 $\{\lvert b_1\rangle, \lvert b_2\rangle, \cdots, \lvert b_n\rangle\}$，我们可以将任意的 $n$ 维 Ket $\lvert v\rangle$ **标准正交分解**为

$$
\lvert v\rangle = \langle b_1|v\rangle \lvert b_1\rangle + \langle b_2|v\rangle \lvert b_2\rangle + \cdots + \langle b_n|v\rangle \lvert b_n\rangle.
$$

---

## 有序基

将集合的大括号 $\{\}$ 改为小括号 $()$，我们就得到了**有序基**（Ordered basis）. 有序基强调了向量的排列顺序不能改变，例如在 $\mathbb{R}^2$ 平面中 $\left(\lvert\uparrow\rangle, \lvert\downarrow\rangle\right) \neq \left(\lvert\downarrow\rangle, \lvert\uparrow\rangle\right)$.

---

## 矩阵

**矩阵**可以用一行 Ket 或一列 Bra 来表示，例如

$$
\begin{align*}
A &= \begin{bmatrix}1 & -4 & 2 \\ 2 & 3 & 0\end{bmatrix} = \begin{bmatrix}\langle a_1\rvert \\ \langle a_2\rvert\end{bmatrix}, \\[1em]
B &= \begin{bmatrix}1 & 2 \\ 7 & 5 \\ 6 & 1\end{bmatrix} = \begin{bmatrix}\lvert b_1\rangle & \lvert b_2\rangle\end{bmatrix}.
\end{align*}
$$

$A$ 和 $B$ 的**矩阵乘法**则可以表示为

$$
AB = \begin{bmatrix}\langle a_1\rvert \\ \langle a_2\rvert\end{bmatrix} \begin{bmatrix}\lvert b_1\rangle & \lvert b_2\rangle\end{bmatrix} = \begin{bmatrix}\langle a_1|b_1\rangle & \langle a_1|b_2\rangle \\ \langle a_2|b_1\rangle & \langle a_2|b_2\rangle\end{bmatrix}.
$$

---

设 $B=\begin{bmatrix}\lvert b_1\rangle & \lvert b_2\rangle & \cdots & \lvert b_n\rangle\end{bmatrix}$，则

$$
B^\top B=\begin{bmatrix}\langle b_1\rvert \\ \langle b_2\rvert \\ \vdots \\ \langle b_n\rvert\end{bmatrix} \begin{bmatrix}\lvert b_1\rangle & \lvert b_2\rangle & \cdots & \lvert b_n\rangle\end{bmatrix} = \begin{bmatrix}\langle b_1|b_1\rangle & \langle b_1|b_2\rangle & \cdots & \langle b_1|b_n\rangle \\ \langle b_2|b_1\rangle & \langle b_2|b_2\rangle & \cdots & \langle b_2|b_n\rangle \\ \vdots & \vdots & \ddots & \vdots \\ \langle b_n|b_1\rangle & \langle b_n|b_2\rangle & \cdots & \langle b_n|b_n\rangle\end{bmatrix}.
$$

因此，**$\{\lvert b_1\rangle, \lvert b_2\rangle, \cdots, \lvert b_n\rangle\}$ 是标准正交基当且仅当 $B^\top B=I$**，其中 $I$ 是单位矩阵.

前面提到，$\lvert v\rangle$ 的标准正交分解可以写成

$$
\begin{align*}
\lvert v\rangle &= x_1\lvert b_1\rangle + x_2\lvert b_2\rangle + \cdots + x_n\lvert b_n\rangle \\[1em]
&=\langle b_1|v\rangle \lvert b_1\rangle + \langle b_2|v\rangle \lvert b_2\rangle + \cdots + \langle b_n|v\rangle \lvert b_n\rangle.
\end{align*}
$$

我们可以用矩阵来得到一个更紧凑的表达：

$$
\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_n\end{bmatrix} = B^\top \lvert v\rangle = \begin{bmatrix}\langle b_1|v\rangle \\ \langle b_2|v\rangle \\ \vdots \\ \langle b_n|v\rangle\end{bmatrix}.
$$

---

## 正交矩阵、酉矩阵

在实数域上，**正交矩阵**（Orthogonal matrix）是指满足 $A^\top A=I$ 的矩阵. 它的复数版本是 **酉矩阵**（Unitary matrix），指满足 $A^\dagger A=I$ 的矩阵，其中 $A^\dagger$ 是 $A$ 的**厄米共轭**（Hermitian conjugate）（即将 $A$ 的转置取复共轭）. 正交矩阵是一种特殊的酉矩阵.

下面简要介绍两类特殊的正交矩阵：

$$
\begin{bmatrix}
\dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{2}} \\[1em]
\dfrac{1}{\sqrt{2}} & \dfrac{-1}{\sqrt{2}}
\end{bmatrix}
\text{ 和 }
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}.
$$

 - **前者**对应有序基 $\left(\lvert\leftarrow\rangle, \lvert\rightarrow\rangle\right)$，也和 **Hadamard 门**有关.
 - **后者**是将 $\mathbb{R}^4$ 空间的常用基最后两个元素交换位置得到的，它对应 **CNOT 门**.

**所有的量子电路都由这两种门构成**.
