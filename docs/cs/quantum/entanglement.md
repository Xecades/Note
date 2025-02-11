---
title: Ch.4 Entanglement
---

本章简要介绍了**量子纠缠**（Entanglement）的数学模型，以及量子纠缠的表现形式. 在本章中，我们研究的对象是**两个孤立系统**之间的量子效应.

---

## 张量积

我们从**非量子纠缠**的情况引入.

假设 Alice 和 Bob **分别拥有一个量子比特**，Alice 的在 $(\lvert a_0\rangle, \lvert a_1\rangle)$ 基下的态为 $\lvert v\rangle = c_0\lvert a_0\rangle + c_1\lvert a_1\rangle$，Bob 的在 $(\lvert b_0\rangle, \lvert b_1\rangle)$ 基下的态为 $\lvert w\rangle = d_0\lvert b_0\rangle + d_1\lvert b_1\rangle$.

定义 $\lvert v\rangle$ 和 $\lvert w\rangle$ 的**张量积**（Tensor product）为 $\lvert v\rangle\otimes\lvert w\rangle$，也可以写成 $\lvert v\rangle\lvert w\rangle$. 它的运算**遵循乘法分配律**，即

$$
\begin{align*}
\lvert v\rangle\lvert w\rangle &= (c_0\lvert a_0\rangle + c_1\lvert a_1\rangle)(d_0\lvert b_0\rangle + d_1\lvert b_1\rangle) \\
&= c_0d_0\lvert a_0\rangle\lvert b_0\rangle + c_0d_1\lvert a_0\rangle\lvert b_1\rangle + c_1d_0\lvert a_1\rangle\lvert b_0\rangle + c_1d_1\lvert a_1\rangle\lvert b_1\rangle.
\end{align*}
$$

在上式中，每一个张量积的第一项都属于 Alice，第二项都属于 Bob，我们定义张量积**不遵循交换律**，即 $\lvert v\rangle\lvert w\rangle \neq \lvert w\rangle\lvert v\rangle$.

可见 $\lvert v\rangle\lvert w\rangle$ 是 $\lvert a_0\rangle\lvert b_0\rangle$、$\lvert a_0\rangle\lvert b_1\rangle$、$\lvert a_1\rangle\lvert b_0\rangle$、$\lvert a_1\rangle\lvert b_1\rangle$ 的**线性组合**，它们分别对应着 Alice 和 Bob 测量之后的四种可能的态.

$c_0d_0$ 为 $\lvert a_0\rangle\lvert b_0\rangle$ 的**概率振幅**，其平方 $c_0^2d_0^2$ 描述了两人测量之后，Alice 得到 $\lvert a_0\rangle$，Bob 得到 $\lvert b_0\rangle$ 的**概率**.

换一个记号，将 $\lvert v\rangle\lvert w\rangle$ 写成

$$
\lvert v\rangle\lvert w\rangle = r\lvert a_0\rangle\lvert b_0\rangle + s\lvert a_0\rangle\lvert b_1\rangle + t\lvert a_1\rangle\lvert b_0\rangle + u\lvert a_1\rangle\lvert b_1\rangle,
$$

那么 **$r^2+s^2+t^2+u^2=1$**，并且 **$ru = st = c_0d_0c_1d_1$**.

---

## 量子纠缠

更进一步，我们不再要求 $ru = st$，**当 $ru \neq st$ 时，我们称 $\lvert v\rangle$ 和 $\lvert w\rangle$ 两个量子比特发生了量子纠缠**. 发生量子纠缠的比特无法写成 $\lvert v\rangle = c_0\lvert a_0\rangle + c_1\lvert a_1\rangle$ 的形式，也即**张量积无法分解**.

---

假设 Alice 和 Bob 的量子比特的张量积为

$$
\frac{1}{2}\lvert a_0\rangle\lvert b_0\rangle + \frac{1}{2}\lvert a_0\rangle\lvert b_1\rangle + \frac{1}{\sqrt{2}}\lvert a_1\rangle\lvert b_0\rangle + 0\lvert a_1\rangle\lvert b_1\rangle.
$$

**外侧系数乘积**为 $1/2\times0=0$，**内侧系数乘积**为 $1/2\times1/\sqrt{2}\neq0$，两者不相等，因此它们发生了量子纠缠.

该式同时说明，当两人进行测量时，有 $1/4$ 的概率得到 00，有 $1/4$ 的概率得到 01，有 $1/2$ 的概率得到 10，不可能得到 11.

现在考虑这样的情况，**Alice 先进行测量**，而 Bob 不进行测量. 我们可以把张量积改写为

$$
\lvert a_0\rangle\left(\frac{1}{2}\lvert b_0\rangle + \frac{1}{2}\lvert b_1\rangle\right) + \lvert a_1\rangle\left(\frac{1}{\sqrt{2}}\lvert b_0\rangle + 0\lvert b_1\rangle\right).
$$

为了**保持括号内部为单位向量**，提取系数，得到

$$
\frac{1}{\sqrt{2}}\lvert a_0\rangle\left(\frac{1}{\sqrt{2}}\lvert b_0\rangle + \frac{1}{\sqrt{2}}\lvert b_1\rangle\right) + \frac{1}{\sqrt{2}}\lvert a_1\rangle\left(1\lvert b_0\rangle + 0\lvert b_1\rangle\right).
$$

这说明，当 Alice 测量时，她有均等的概率得到 0 或 1，如果得到 0，她的量子比特坍缩到 $\lvert a_0\rangle$，**整个系统的张量积坍缩到 $\lvert a_0\rangle\left(\frac{1}{\sqrt{2}}\lvert b_0\rangle + \frac{1}{\sqrt{2}}\lvert b_1\rangle\right)$**，这个式子可以因式分解，说明 Bob 的量子比特同时坍缩到了 $\frac{1}{\sqrt{2}}\lvert b_0\rangle + \frac{1}{\sqrt{2}}\lvert b_1\rangle$，和 Alice **不再发生纠缠**.

如果 Alice 得到 1，那么 Bob 的量子比特会坍缩到 $\lvert b_0\rangle$，也就是说，一旦 Alice 观测到 1，Bob 一定会观测到 0，这个现象是瞬时的，**不受光速限制**.

---

## 超光速通信

发生纠缠的量子比特确实**不受距离的限制**，即使 Alice 和 Bob 在宇宙的两头，Alice 对自己的量子比特进行测量，Bob 的量子比特也会瞬间坍缩到相应的态. 这**看似违背爱因斯坦的相对论，实则不然**.

我们回到刚刚研究的例子，Alice 和 Bob 的量子比特的张量积为

$$
\frac{1}{2}\lvert a_0\rangle\lvert b_0\rangle + \frac{1}{2}\lvert a_0\rangle\lvert b_1\rangle + \frac{1}{\sqrt{2}}\lvert a_1\rangle\lvert b_0\rangle + 0\lvert a_1\rangle\lvert b_1\rangle.
$$

我们已经知道，如果 Alice 先进行测量，她有 $1/2$ 的概率得到 0，有 $1/2$ 的概率得到 1. 我们来看看**如果 Bob 抢先进行了测量**，Alice 后测量，她的结果会是什么.

在这种情况下，两人都就行了测量，可以直接**将系数平方**计算概率，即两人有 $1/4$ 的概率得到 00，有 $1/4$ 的概率得到 01，有 $1/2$ 的概率得到 10，不可能得到 11. 也就是说，Alice 有 $1/4+1/4=1/2$ 的概率得到 0，有 $1/2+0=1/2$ 的概率得到 1，**这和只有 Alice 测量的情况是一样的**. 这个结果对任意的量子纠缠态都成立.

这说明，Alice 和 Bob **没有办法区分是谁先进行了测量**，**无法传递信息**，自然也就无法进行超光速通信.

---

## 张量积的标准基

$\mathbb{R}^2$ 的标准基是 $\left(\begin{bmatrix}1\\0\end{bmatrix}, \begin{bmatrix}0\\1\end{bmatrix}\right)$，当 Alice 和 Bob 使用标准基时，他们的量子比特的张量积为

$$
r\begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix} + s\begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix} + t\begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix} + u\begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix}.
$$

因此，$\mathbb{R}^2\otimes\mathbb{R}^2$ 的标准基为

$$
\left(\begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix}, \begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix}, \begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix}, \begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix}\right).
$$

这是一个四维空间，为了简化，我们**将其用 $\mathbb{R}^4$ 的标准基表示**.

$$
\begin{matrix*}
\begin{bmatrix}1\\0\\0\\0\end{bmatrix} = \begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix}, &
\begin{bmatrix}0\\1\\0\\0\end{bmatrix} = \begin{bmatrix}1\\0\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix}, \\[3em]
\begin{bmatrix}0\\0\\1\\0\end{bmatrix} = \begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}1\\0\end{bmatrix}, &
\begin{bmatrix}0\\0\\0\\1\end{bmatrix} = \begin{bmatrix}0\\1\end{bmatrix} \otimes \begin{bmatrix}0\\1\end{bmatrix}.
\end{matrix*}
$$

为了方便记忆，可以将其理解为

$$
\begin{bmatrix}a_0\\a_1\end{bmatrix} \otimes \begin{bmatrix}b_0\\b_1\end{bmatrix} = \begin{bmatrix}a_0\begin{bmatrix}b_0\\b_1\end{bmatrix}\\[1.5em] a_1\begin{bmatrix}b_0\\b_1\end{bmatrix}\end{bmatrix} = \begin{bmatrix}a_0b_0\\a_0b_1\\a_1b_0\\a_1b_1\end{bmatrix}.
$$

---

## CNOT 门

**CNOT 门**可用于产生量子纠缠. 它的矩阵表示为

$$
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}.
$$

假设有一对**非纠缠**的量子比特，它们的张量积为

$$
\frac{1}{\sqrt{2}}\begin{bmatrix}1\\1\end{bmatrix}\otimes\begin{bmatrix}1\\0\end{bmatrix} = \frac{1}{\sqrt{2}}\begin{bmatrix}1\\0\\1\\0\end{bmatrix}.
$$

将它们发送到 CNOT 门，会使得张量积**左乘 CNOT 门的矩阵**，得到

$$
\frac{1}{\sqrt{2}}\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}\begin{bmatrix}1\\0\\1\\0\end{bmatrix} = \frac{1}{\sqrt{2}}\begin{bmatrix}1\\0\\0\\1\end{bmatrix}.
$$

得到的张量积外层乘积不等于内层，因此发生了**量子纠缠**. 它可以被写成

$$
\frac{1}{\sqrt{2}}\begin{bmatrix}1\\0\end{bmatrix}\otimes\begin{bmatrix}1\\0\end{bmatrix} + \frac{1}{\sqrt{2}}\begin{bmatrix}0\\1\end{bmatrix}\otimes\begin{bmatrix}0\\1\end{bmatrix}.
$$

当 Alice 和 Bob 进行测量时，他们**要么同时得到 0，要么同时得到 1**，这个张量积将在以后经常出现.
