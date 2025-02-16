---
title: Ch.7 Quantum Gates and Circuits
---

本章将上一章所讲的可逆门电路带入量子计算当中，并介绍了一些基础量子电路的实现. 从本章开始，假设所有的测量装置**都是固定的**，我们用 $(\ket{0}, \ket{1})$ 来替代之前使用的 $(\ket{\uparrow}, \ket{\downarrow})$.

---

## 量子 CNOT 门

上一章提到的经典 CNOT 门对应如下左图真值表，我们将其写成右图的**张量形式**：

::grid{gap=5px}
:sep{span=11}
```typst 经典 CNOT 门
#show table.cell.where(y: 1): text.with(weight: "bold")
#table(
    columns: 4,
    inset: 9pt,
    align: horizon + center,
    stroke: none,
    table.hline(y: 0, stroke: 2pt),
    table.hline(y: 1),
    table.hline(y: 2, stroke: 2pt),
    table.vline(x: 2, stroke: 2pt),
    table.vline(x: 1),
    table.vline(x: 3),
    table.header(table.cell(colspan: 2)[*Input*], table.cell(colspan: 2)[*Output*]),
    $bold(x)$, $bold(y)$, $bold(x)$, $bold(x xor y)$,
    [0], [0], [0], [0],
    [0], [1], [0], [1],
    [1], [0], [1], [1],
    [1], [1], [1], [0]
)
```

:sep{span=2 .center}
$\Longrightarrow$

:v{3rem}

:sep{span=11}
```typst 量子 CNOT 门
#import "@preview/physica:0.9.4": *
#show table.cell.where(y: 1): text.with(weight: "bold")
#table(
    columns: 2,
    inset: 9pt,
    align: horizon + center,
    stroke: none,
    table.hline(y: 0, stroke: 2pt),
    table.hline(y: 1, stroke: 2pt),
    table.vline(x: 1, stroke: 2pt),
    table.header([*Input*], [*Output*]),
    $ket(00)$, $ket(00)$,
    $ket(01)$, $ket(01)$,
    $ket(10)$, $ket(11)$,
    $ket(11)$, $ket(10)$
)
```
::

量子 CNOT 门的函数表达可以写成如下形式，其作用可直观理解为**将 $\ket{10}$ 和 $\ket{11}$ 的概率振幅互换**.

$$
\text{CNOT}(r\ket{00} + s\ket{01} + t\ket{10} + u\ket{11}) = r\ket{00} + s\ket{01} + u\ket{10} + t\ket{11}
$$

经典 CNOT 门中，控制位的输入输出是一样的，但**量子 CNOT 门并不是这样**. 假设第一个输入为 $\frac{1}{\sqrt{2}}\ket{0}+\frac{1}{\sqrt{2}}\ket{1}$，第二个输入为 $\ket{0}$，将其写为张量的形式，即

$$
\left(\frac{1}{\sqrt{2}}\ket{0}+\frac{1}{\sqrt{2}}\ket{1}\right)\oplus\ket{0}=\frac{1}{\sqrt{2}}\ket{00}+\frac{1}{\sqrt{2}}\ket{10},
$$

经过 CNOT 门后，输出为 $\frac{1}{\sqrt{2}}\ket{00}+\frac{1}{\sqrt{2}}\ket{11}$，**这是一个纠缠态**. 我们用如下的电路图来表示这个过程：

```typst
#import "@preview/quill:0.6.0": *
#import "@preview/physica:0.9.4": *
#show math.equation: math.display
#scale(180%, reflow: true, quantum-circuit(
    lstick($1/sqrt(2)ket(0)+1/sqrt(2)ket(1)$), 1, ctrl(1), 1, rstick($1/sqrt(2)ket(00)+1/sqrt(2)ket(11)$, n:2), [\ ],
    lstick($ket(0)$), 1, targ(), 1
))
```

---

## 单输入量子门

在经典逻辑中，只有两种可能的单输入门：NOT 门和恒等门. 而由于量子态的叠加性质，我们可以**有无数种单输入量子门**. 最常用的有 **Pauli 门**和 **Hadamard 门**，其中 Pauli 门包括 **I 门**、**X 门**、**Y 门**和 **Z 门**.

---

### I 门和 Z 门

**I 门对应恒等矩阵 $\begin{bmatrix}1&0\\0&1\end{bmatrix}$**，其作用是保持输入不变.

**Z 门对应矩阵 $\begin{bmatrix}1&0\\0&-1\end{bmatrix}$**，对于输入 $a_0\ket{0}+a_1\ket{1}$，其输出为

$$
Z(a_0\ket{0}+a_1\ket{1})=\begin{bmatrix}1&0\\0&-1\end{bmatrix}\begin{bmatrix}a_0\\a_1\end{bmatrix}=\begin{bmatrix}a_0\\-a_1\end{bmatrix}=a_0\ket{0}-a_1\ket{1}.
$$

即保持 $\ket{0}$ 的概率振幅不变，而将 $\ket{1}$ 的概率振幅取反.

更进一步，对于基态 $\ket{1}$，Z 门将其变为 $-\ket{1}$，而之前提到，$\ket{1}$ 和 $-\ket{1}$ 是等价的，因此 **Z 门对基态不产生任何影响**. 对于其他态，例如 $\frac{1}{\sqrt{2}}\ket{0}+\frac{1}{\sqrt{2}}\ket{1}$，输出为 $\frac{1}{\sqrt{2}}\ket{0}-\frac{1}{\sqrt{2}}\ket{1}$，**这是两个不同的量子态**，因此 **Z 门不等于 I 门**.

对于这种只改变概率振幅的符号的门，我们称之为**相位门**（Phase Gate，在实际应用中，不止包括正负号的改变，还包括在复平面上的旋转）.

---

### X 门和 Y 门

X 门和 Y 门**类似于传统布尔逻辑当中的 NOT 门**.

$$
X=\begin{bmatrix}0&1\\1&0\end{bmatrix},\quad Y=\begin{bmatrix}0&1\\-1&0\end{bmatrix}.
$$

---

### Hadamard 门

Hadamard 门又称 **H 门**，对应矩阵

$$
H=\frac{1}{\sqrt{2}}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

通常用于**将标准基 $\ket{0}$ 和 $\ket{1}$ 变为叠加态**.

$$
\begin{align*}
H(\ket{0}) &= \frac{1}{\sqrt{2}}(\ket{0}+\ket{1}) \\[0.7em]
H(\ket{1}) &= \frac{1}{\sqrt{2}}(\ket{0}-\ket{1})
\end{align*}
$$

---

我们通过在方框内加上对应符号来表示这些门：

```typst
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    3, $H$, 3
))
```

---

## 存在通用量子门吗？

在经典计算中，我们知道**任何逻辑电路都可以用 NAND 门和扇出实现**，也可以**只通过 Fredkin 门实现**. 那么在量子计算中，是否存在能够表示所有量子门的**通用量子门**呢？**答案是否定的**.

在经典逻辑中，$n$ 个变量最多只会有 $2^n$ 个布尔函数，而之前我们提到，在量子计算中，仅仅是一个量子比特就有无穷多种量子门. 使用有限个量子门不可能表示无穷多的量子电路，因此**不存在通用量子门**.

尽管如此，我们还是有办法通过有限的门来**模拟**任何的量子电路（本书不会详细讨论这个问题）.

---

## 不可复制原理

注意到 $\text{CNOT}(\ket{00})=\ket{00}$，$\text{CNOT}(\ket{10})=\ket{11}$，因此对于 $\ket{x}\in\{\ket{0},\ket{1}\}$，我们有 $\text{CNOT}(\ket{x0})=\ket{xx}$，也就是说 **CNOT 门可以复制经典比特**，也即 CNOT 门可以实现经典逻辑中的扇出.

因此我们尝试思考，是否存在一个量子门可以**复制**任意的量子态？**可以证明，这样的门并不存在**. 这个结论被称为**不可复制原理**（No-Cloning Theorem）.

假设这样的门 $G$ 存在，它输入量子态 $\ket{x}$ 和一个与 $\ket{x}$ 无关的辅助位 $\ket{k}$，将 $\ket{x}$ 复制后输出 $\ket{x}\ket{x}$，即

```typst
#import "@preview/quill:0.6.0": *
#import "@preview/physica:0.9.4": *
#scale(180%, reflow: true, quantum-circuit(
    lstick($ket(x)$), 1, mqgate($G$, n: 2), 1, rstick($ket(x)$), [\ ],
    lstick($ket(k)$), 3, rstick($ket(x)$)
))
```

那么它一定满足：

1. $G(\ket{0}\ket{k})=\ket{0}\ket{0}$.
2. $G(\ket{1}\ket{k})=\ket{1}\ket{1}$.
3. $G\left(\left(\dfrac{1}{\sqrt{2}}\ket{0}+\dfrac{1}{\sqrt{2}}\ket{1}\right)\ket{k}\right)=\left(\dfrac{1}{\sqrt{2}}\ket{0}+\dfrac{1}{\sqrt{2}}\ket{1}\right)\left(\dfrac{1}{\sqrt{2}}\ket{0}+\dfrac{1}{\sqrt{2}}\ket{1}\right)$.

其中第三个式子也可以写成

$$
G\left(\frac{1}{\sqrt{2}}\ket{0k}+\frac{1}{\sqrt{2}}\ket{1k}\right)=\frac{1}{2}\ket{00}+\frac{1}{2}\ket{11}+\frac{1}{2}\ket{01}+\frac{1}{2}\ket{10}.
$$

由于 $G$ 的**线性性**，有 $G\left(\frac{1}{\sqrt{2}}\ket{0k}+\frac{1}{\sqrt{2}}\ket{1k}\right)=\frac{1}{\sqrt{2}}(G(\ket{0k})+G(\ket{1k}))=\frac{1}{\sqrt{2}}(\ket{00}+\ket{11})$，与右式不符，矛盾，命题得证.

---

### 贝尔电路

**贝尔电路**是一种常用的量子电路结构.

```typst 贝尔电路
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    2, $H$, ctrl(1), 2, [\ ],
    3, targ(), 2
))
```

传入 $\mathbb{R}^4$ 的常用标准正交基，输出一定也是一组标准正交基，它们被称为**贝尔态**.

$$
\begin{align*}
B(\ket{00}) &= \frac{1}{\sqrt{2}}(\ket{00}+\ket{11}), \quad B(\ket{01}) = \frac{1}{\sqrt{2}}(\ket{01}+\ket{10}), \\[1em]
B(\ket{10}) &= \frac{1}{\sqrt{2}}(\ket{00}-\ket{11}), \quad B(\ket{11}) = \frac{1}{\sqrt{2}}(\ket{01}-\ket{10}).
\end{align*}
$$

由于 CNOT 门和 Hadamard 门都是可逆的，因此**贝尔电路也是可逆的**.

```typst 逆贝尔电路
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    2, ctrl(1), $H$, 2, [\ ],
    2, targ()
))
```

---

## 密集编码

**密集编码**（Superdense Coding）是一种量子通信协议，它可以**用一个量子比特传输两个比特的信息**.

首先制备纠缠态为 $\frac{1}{\sqrt{2}}(\ket{00}+\ket{11})$（**贝尔态**）的两个量子比特，分别交给 Alice 和 Bob. Alice 想要通过手里的**一个量子比特**传输**两个传统比特**的信息给 Bob，她进行如下操作：

1. 如果想要传输的信息是 $00$，她不做任何操作.
2. 如果想要传输的信息是 $01$，她对自己的量子比特应用 X 门.
3. 如果想要传输的信息是 $10$，她对自己的量子比特应用 Z 门.
4. 如果想要传输的信息是 $11$，她对自己的量子比特应用 Y 门.

这些操作的输出**恰好为一组贝尔态**，可以通过**逆贝尔电路**来解码.

Alice 将处理完成的量子比特**交给 Bob**，Bob 对这 Alice 的量子比特和自己的量子比特进行**逆贝尔电路**操作，即可得到 Alice 想要传输的信息.

---

## 量子隐形传态

和密集编码场景一样，Alice 和 Bob 共享纠缠态为 $\frac{1}{\sqrt{2}}(\ket{00}+\ket{11})$ 的两个量子比特，但除此之外 Alice 还有一个**未知的量子态** $a\ket{0}+b\ket{1}$，因为不能测量，**她无从得知 $a$ 和 $b$ 的值**，但她想要**将这个量子态传输给 Bob**. 我们称之为**量子隐形传态**（Quantum Teleportation）.

Alice 通过一个**逆贝尔电路**来对自己的未知比特进行编码.

```typst 量子隐形传态
#import "@preview/quill:0.6.0": *
#import "@preview/physica:0.9.4": *
#show math.equation: math.display
#scale(180%, reflow: true, quantum-circuit(
    lstick($a ket(0)+b ket(1)$), 1, ctrl(1), $H$, 1, rstick([Alice's qubits], n: 2), [\ ],
    lstick($1/sqrt(2) ket(00)+1/sqrt(2) ket(11)$, n: 2), 1, targ(), [\ ],
    5, rstick([Bob's qubits], n: 1)
))
```

当 Alice 的量子比特通过电路后，整个系统的状态为

$$
\begin{align*}
&1/2\ket{00}\oplus(a\ket{0}+b\ket{1}) \\[0.5em]
+\ &1/2\ket{01}\oplus(a\ket{1}+b\ket{0}) \\[0.5em]
+\ &1/2\ket{10}\oplus(a\ket{0}-b\ket{1}) \\[0.5em]
+\ &1/2\ket{11}\oplus(a\ket{1}-b\ket{0}).
\end{align*}
$$

接下来，Alice对自己的两个量子比特**进行测量**，共有四种可能的结果，概率均为 $1/4$.

 - 测量结果为 $00$ 时，Bob 的量子比特状态为 $a\ket{0}+b\ket{1}$；
 - 测量结果为 $01$ 时，Bob 的量子比特状态为 $a\ket{1}+b\ket{0}$；
 - 测量结果为 $10$ 时，Bob 的量子比特状态为 $a\ket{0}-b\ket{1}$；
 - 测量结果为 $11$ 时，Bob 的量子比特状态为 $a\ket{1}-b\ket{0}$.

Alice 把自己的测量结果**使用两个经典比特**传输给 Bob，Bob 根据收到的信息**对自己的量子比特进行操作**，即可得到 Alice 想要传输的量子态.

 - 如果 Bob 收到的信息是 $00$，他不做任何操作；
 - 如果 Bob 收到的信息是 $01$，他对自己的量子比特应用 X 门；
 - 如果 Bob 收到的信息是 $10$，他对自己的量子比特应用 Z 门；
 - 如果 Bob 收到的信息是 $11$，他对自己的量子比特应用 Y 门.

量子隐形传态的过程中，**量子态的信息并没有通过传统的通信方式传输**，而是通过**纠缠态**的方式传输，这是量子通信的一个重要特性. 量子隐形传态可以理解为**密集编码的逆过程**.

---

## 量子位翻转纠错

**量子纠错**（Quantum Error Correction，QEC）是量子计算中的一个重要研究方向，本节介绍一个简单的量子纠错算法：**量子位翻转纠错**（Quantum Bit-Flip Correction）. 即发送的量子比特 01 翻转，从 $a\ket{0}+b\ket{1}$ 变成 $a\ket{1}+b\ket{0}$ 的情况.

解决方案是**发送三个拷贝**，例如要发送 $\ket{0}$，则发送 $\ket{000}$，如果其中一个比特发生了翻转（**发生两个翻转的可能性很低**），我们可以通过剩下的两个比特来确定正确的比特.

Alice 通过如下电路来制备这三个比特，它们是纠缠态，因此并不违背不可复制原理.

```typst 冗余量子比特制备
#import "@preview/quill:0.6.0": *
#import "@preview/physica:0.9.4": *
#show math.equation: math.display
#scale(180%, reflow: true, quantum-circuit(
    lstick($a ket(0)+b ket(1)$), 1, ctrl(1), ctrl(2), 1, rstick($a ket(000)+b ket(111)$, n: 3), [\ ],
    lstick($ket(0)$), 1, targ(), [\ ],
    lstick($ket(0)$), 2, targ()
))
```

Alice 把这三个比特同时发给 Bob，由于**信道干扰**，Bob 收到的比特可能是 $a\ket{000}+b\ket{111}$、$a\ket{100}+b\ket{011}$、$a\ket{010}+b\ket{101}$ 或 $a\ket{110}+b\ket{001}$，分别对应无翻转、第一位翻转、第二位翻转和第三位翻转的情况.

Bob 需要从中得知是否发生了偏转以及哪一位发生了偏转，但**不能直接测量**，因为测量会破坏信息 $a$、$b$ 本身. 他新增两个辅助比特进行运算.

```typst 位翻转奇偶校验
#import "@preview/quill:0.6.0": *
#import "@preview/physica:0.9.4": *
#show math.equation: math.display
#scale(180%, reflow: true, quantum-circuit(
    lstick([Received qubits], n:3), 1, ctrl(3), 1, ctrl(4), 2, rstick([Received qubits], n: 3), [\ ],
    3, ctrl(2), [\ ],
    5, ctrl(2), [\ ],
    lstick($ket(0)$), 1, targ(), targ(), 2, meter(), rstick([Parity qubits], n: 2), [\ ],
    lstick($ket(0)$), 3, targ(), targ(), meter()
))
```

先**只考虑前四个量子比特**，假设 Bob 收到 $a\ket{c_0c_1c_2}+b\ket{d_0d_1d_2}$. 首先注意到如果发生翻转，一定是在 $c$ 和 $d$ 的同一位同时发生的，即 $c_0\oplus c_1=d_0\oplus d_1$.

当 $c_0\oplus c_1=0$ 时，第四位量子比特不受前两个比特的翻转，保持为 $\ket{0}$；当 $c_0\oplus c_1=1$ 时，第四位比特受到了翻转，变为 $\ket{1}$. 容易证明，第四位比特和前三位不会发生纠缠，因此**直接测量第四位比特**即可得知 $c_0\oplus c_1$ 的值. 同理，第五位比特对应 $c_0\oplus c_2$ 的值.

观察校验位的结果，Bob 进行如下操作：

 - 如果得到 $\ket{00}$，说明没有发生翻转，不做任何操作；
 - 如果得到 $\ket{01}$，说明第三位翻转，对第三个比特应用 X 门；
 - 如果得到 $\ket{10}$，说明第二位翻转，对第二个比特应用 X 门；
 - 如果得到 $\ket{11}$，说明第一位翻转，对第一个比特应用 X 门.

从而完成纠错.
