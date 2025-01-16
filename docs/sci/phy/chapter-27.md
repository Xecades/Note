---
title: Ch.27 Gauss' Law
---

## 流量 Flux

::fold{title="流量" expand}
单位时间流过某表面的体积.
::

对于平面 $\vec{A}$：

$$
\Phi = \vec{v}\cdot\vec{A} = \frac{L}{t}\cdot A = \frac{V}{t}
$$

一般式：

$$
\Phi = \oiint \vec{v}\cdot\mathrm{d}\vec{A}
$$

对于闭合曲面，若内部无源无汇，则 $\Phi = \displaystyle\oiint \vec{v}\cdot\mathrm{d}\vec{A} = 0$；若有源，则 $\Phi \geqslant 0$，代表流出；若有汇，则 $\Phi \leqslant 0$，代表流入.

---

## Gauss' Law

::fold{title="电通量" expand}
$$
\Phi_E := \displaystyle\oiint \vec{E}\cdot\mathrm{d}\vec{A}
$$
::

::fold{title="Gauss' Law" success expand}
$$
\begin{align*}
    \text{积分形式}&\quad \Phi_E = \oiint \vec{E}\cdot\mathrm{d}\vec{A} \equiv \frac{q_{\text{enc}}}{\varepsilon_0} \\
    \text{微分形式}&\quad \nabla\cdot\vec{E} = \frac{\rho}{\varepsilon_0}
\end{align*}
$$
::

> $q_{\text{enc}}$：闭合曲面内包围的电荷量.
>
> $\rho$：电荷体积密度.
> 
> $\nabla$ 算符：$\nabla = \dfrac{\partial}{\partial x}\vec{\imath} + \dfrac{\partial}{\partial y}\vec{\jmath} + \dfrac{\partial}{\partial z}\vec{k}$

---

### 微分形式推导

首先由于数学上的[高斯公式](https://zh.wikipedia.org/wiki/%E9%AB%98%E6%96%AF%E6%95%A3%E5%BA%A6%E5%AE%9A%E7%90%86)，有

$$
\Phi_E = \oiint \vec{E}\cdot\mathrm{d}\vec{A} = \iiint \nabla\cdot\vec{E}\cdot\mathrm{d}V
$$

而

$$
\frac{q_{\text{enc}}}{\varepsilon_0} = \iiint \frac{\rho}{\varepsilon_0}\cdot\mathrm{d}V
$$

两式相等，故有

$$
\nabla\cdot\vec{E} = \frac{\rho}{\varepsilon_0}
$$

证毕.

---

### 推 Coloumb's Law

点电荷周围电场球形对称，取半径为 $R$ 的球面为高斯面，有

$$
\Phi_E = \oiint \vec{E}\cdot\mathrm{d}\vec{A} = E\cdot\oiint\mathrm{d}\vec{A} = E\cdot S = E\cdot 4\pi R^2
$$

故 $E\cdot 4\pi R^2 = \dfrac{q}{\varepsilon_0}$，即

$$
E = \frac{1}{4\pi\varepsilon_0}\frac{q}{R^2}
$$

即为 Coulomb's Law.

---

## 应用

### 均匀带电球体

::fold{title="均匀带电球体" expand}
半径为 $a$ 的均匀带电球体，电荷密度为 $\rho$，求球体内外的电场强度.
::

当 $r > a$ 时，取半径为 $r$ 的球面为高斯面，有

$$
\Phi_E = \oiint \vec{E}\cdot\mathrm{d}\vec{A} = E\cdot 4\pi r^2 = \frac{Q}{\varepsilon_0}
$$

故 $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{Q}{r^2} = \dfrac{\rho a^3}{3\varepsilon_0 r^2}$（和点电荷的结果一致）.

当 $r < a$ 时，有

$$
\Phi_E = \oiint \vec{E}\cdot\mathrm{d}\vec{A} = E\cdot 4\pi r^2 = \frac{q_{\text{enc}}}{\varepsilon_0}
$$

其中 

$$
q_{\text{enc}} = \rho\cdot\frac{4}{3}\pi r^3
$$

故 $E = \dfrac{\rho}{3\varepsilon_0}r$（$\propto r$）.

---

### 电荷分布于导体表面

首先导体内电场一定为 $0$，否则会有电荷在导体内部运动，违背静电平衡.

因此 $\Phi_E = \displaystyle\oiint \vec{E}\cdot\mathrm{d}\vec{A} = 0$，故 $Q = 0$，即导体内部电荷量为 $0$，说明导体所有电荷都分布于表面.
