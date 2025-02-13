---
title: Ch.6 Classic Logic, Gates, and Circuits
---

本章介绍了经典逻辑电路，并引入了**可逆逻辑门**的概念，然后在此基础上介绍了一种以**桌球碰撞**来实现逻辑运算的理想模型. 本文只介绍可逆逻辑门的部分：CNOT 门、Toffoli 门、Fredkin 门.

---

## 受控非门 CNOT

**受控非门**（Controlled-NOT gate）接收两个输入比特，传出两个输出比特. 它的作用是：**当第一个比特是 1 时，将第二个比特取反；当第一个比特是 0 时，第二个比特保持不变**. 用函数的形式表达，可以写为

$$
f(x, y) = (x, x \oplus y).
$$

CNOT 门是**可逆的**，给定一组输出，可以唯一确定输入. 我们后面介绍的所有门都满足这个条件.

同时我们注意到，两个 CNOT 门的作用可以**相互抵消**，即 $(x, y) \mapsto (x, x \oplus y) \mapsto (x, x \oplus (x \oplus y)) = (x, y)$.

我们可以通过一个**扇出**（Fan-out，在本书中指的是将一个比特复制到多个比特，即下图的小黑点）和一个**异或门**来实现 CNOT 电路.

![](./assets/classic-logic-gates-and-circuits.cnot-circuit.svg){.inv width=400px}

在量子电路中，我们用如下记号表示.

```typst
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    lstick($x$), 1, ctrl(1), 1, rstick($x$), [\ ],
    lstick($y$), 1, targ(), 1, rstick($x xor y$)
))
```

---

## Toffoli 门

**Toffoli 门**有三个输入和三个输出，**当前两个输入都是 1 时，将第三个输入取反**，因此又称为**CCNOT 门**（Controlled-Controlled-NOT gate）. 它可以用函数表示为

$$
T(x, y, z) = (x, y, (x \land y) \oplus z).
$$

和 CNOT 门一样，Toffoli 门也是可逆的，并且两个 Toffoli 门的作用可以相互抵消.

它用如下的记号表示.

```typst
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    lstick($x$), 1, ctrl(1), 1, rstick($x$), [\ ],
    lstick($y$), 1, ctrl(1), 1, rstick($y$), [\ ],
    lstick($z$), 1, targ(), 1, rstick($(x and y) xor z$)
))
```

Toffoli 门是**通用门**，因为它可以实现 **NAND 门**和**扇出**.

$$
\begin{align*}
\text{NAND:}\quad & T(x, y, 1) = (x, y, (x \land y) \oplus 1) = (x, y, x \uparrow y), \\[0.7em]
\text{扇出:}\quad & T(x, 1, 0) = (x, 1, (x \land 1) \oplus 0) = (x, 1, x).
\end{align*}
$$

---

## Fredkin 门

**Fredkin 门**有三个输入和三个输出，**当前第一个输入是 1 时，交换第二个和第三个输入**，对应函数

$$
F(x, y, z) = (x, (\neg x \land y) \lor (x \land z), (\neg x \land z) \lor (x \land y)).
$$

或者更直观地写成

$$
\begin{align*}
F(0, y, z) &= (0, y, z), \\[0.7em]
F(1, y, z) &= (1, z, y).
\end{align*}
$$

Fredkin 门也是自身的逆. 可用如下记号表示.

```typst
#import "@preview/quill:0.6.0": *
#scale(180%, reflow: true, quantum-circuit(
    lstick($x$), 1, ctrl(1), 1, rstick($x$), [\ ],
    lstick($y$), 1, swap(1), 1, rstick($(not x and y) or (x and z)$), [\ ],
    lstick($z$), 1, swap(0), 1, rstick($(not x and z) or (x and y)$)
))
```

Fredkin 门也是**通用门**，因为可以实现**与门**、**非门**和**扇出**.

$$
\begin{align*}
\text{与门:}\quad & F(x, y, 0) = (x, \neg x\land y, x\land y), \\[0.7em]
\text{非门、扇出:}\quad & F(x, 0, 1) = (x, x, \neg x).
\end{align*}
$$
