---
title: Ch.2 随机变量与分布函数
---

## 分布函数

### 一元

**分布函数 $F(x)$** $=P(\xi\leqslant x)$，$-\infty<x<\infty$. 注意可以取等.

**密度函数 $p(x)$** $=\dfrac{\mathrm{d}F(x)}{\mathrm{d}x}$. 满足 $F(x)=\displaystyle\int_{-\infty}^x p(t)\,\mathrm{d}t$. 此时的 $\xi$ 称为**连续型随机变量**.

---

### 多元

**联合分布函数 $F(x, y)$** $=P(\xi\leqslant x, \eta\leqslant y)$.

**边际分布函数 $F_{\xi}(x)$** $=P(\xi\leqslant x, -\infty<y<\infty)=F(x,\infty)$.

**联合密度函数 $p(x, y)$** $=\dfrac{\partial^2 F(x, y)}{\partial x\partial y}$. 注意只有 $(\xi, \eta)$ 为**连续型随机向量**时才有 $p(x, y)$.

**边际密度函数 $p_{\xi}(x)$** $=\dfrac{\mathrm{d} F_{\xi}(x)}{\mathrm{d} x}=\displaystyle\int_{-\infty}^{\infty}p(x, y)\,\mathrm{d}y$.

---

## 随机变量的关系

**$\xi$，$\eta$ 相互独立**：$F(x, y)=F_{\xi}(x)F_{\eta}(y)$. 对于连续型随机向量：$p(x, y)=p_{\xi}(x)p_{\eta}(y)$.

**离散型条件分布**：$\xi=x_i$ 条件下 $\eta$ 的

 - **条件概率分布列 $p_{\eta\mid\xi}(y_j\mid x_i)$** $=P(\eta=y_j\mid \xi=x_i)=\dfrac{P(\xi=x_i, \eta=y_j)}{P(\xi=x_i)}$.
 - **条件分布**：$P(\eta\leqslant y\mid \xi=x_i)=\displaystyle\sum_{y_j\leqslant y}p_{\eta\mid\xi}(y_j\mid x_i)$.

**连续型条件分布**：$\xi=x$ 条件下 $\eta$ 的

 - **条件密度 $p_{\eta\mid\xi}(y\mid x)$** $=\dfrac{p(x, y)}{p_{\xi}(x)}$.
 - **条件分布 $F_{\eta\mid\xi}(y\mid x)$** $=P(\eta\leqslant y\mid \xi=x)=\displaystyle\int_{-\infty}^y p_{\eta\mid\xi}(v\mid x)\,\mathrm{d}v$.

::fold{title="连续型贝叶斯公式" expand success}
由 $p(x, y)=p_{\xi\mid\eta}(x\mid y)p_{\eta}(y)=p_{\eta\mid\xi}(y\mid x)p_{\xi}(x)$，可得

$$
p_{\eta\mid\xi}(y\mid x)=\frac{p_{\xi\mid\eta}(x\mid y)p_{\eta}(y)}{p_{\xi}(x)}
$$

将分母的 $p_{\xi}(x)$ 替换为 $\displaystyle\int_{-\infty}^{\infty}p_{\xi\mid\eta}(x\mid v)p_{\eta}(v)\,\mathrm{d}v$（**连续型全概率公式**），得到**连续型贝叶斯公式**

$$
p_{\eta\mid\xi}(y\mid x)=\frac{p_{\xi\mid\eta}(x\mid y)p_{\eta}(y)}{\displaystyle\int_{-\infty}^{\infty}p_{\xi\mid\eta}(x\mid v)p_{\eta}(v)\,\mathrm{d}v}
$$
::

---

## 随机变量的函数

**卷积公式**：若 $\xi$ 与 $\eta$ 相互独立，则 $p_{\xi+\eta}(z)=\displaystyle\int_{-\infty}^{\infty}p_{\xi}(z-y)p_{\eta}(y)\,\mathrm{d}y$. 离散情况类似.

**次序统计量**：设 $\xi_1,\xi_2,\cdots,\xi_n$ 独立同分布，分布函数为 $F(x)$. 把它们从小到大排列，所得随机变量 $\xi_1^*\leqslant\xi_2^*\leqslant\cdots\leqslant\xi_n^*$ 称为其**次序统计量**. 按定义，$\xi_1^*=\min\{\xi_1,\xi_2,\cdots,\xi_n\}$，$\xi_n^*=\max\{\xi_1,\xi_2,\cdots,\xi_n\}$. 则

 - **$\xi_n^*$ 的分布函数** $F_{\xi_n^*}(x)=P(\xi_n^*\leqslant x)=P(\xi_1\leqslant x,\xi_2\leqslant x,\cdots,\xi_n\leqslant x)=F^n(x)$.
 - **$\xi_1^*$ 的分布函数** $F_{\xi_1^*}(x)=1-P(\xi_1^*>x)=1-[1-F(x)]^n$.
 - **$(\xi_1^*, \xi_n^*)$ 的联合分布函数**
   $$
   \begin{align*}
      F(x, y)&=P(\xi_1^*\leqslant x,\xi_n^*\leqslant y) \\
      &=P(\xi_n^*\leqslant y)-P(\xi_1^*>x,\xi_n^*\leqslant y) \\
      &=F^n(y)-P\left(\bigcap_{i=1}^n(x<\xi_n\leqslant y)\right) \\[1em]
      &=\begin{cases}
         F^n(y)-[F(y)-F(x)]^n & x<y \\[1em]
         F^n(y) & x\geqslant y
      \end{cases}
   \end{align*}
   $$

**随机变量的变换**：$(\xi_1,\cdots,\xi_n)\to(\eta_1,\cdots,\eta_n)$，每个 $\eta_i$ 为 $\boldsymbol\xi$ 的函数，写出反函数 $x_i=x_i(y_1,\cdots,y_n)$，则 $\boldsymbol\eta$ 的联合密度 $q(y_1,\cdots,y_n)=p(x_1(y_1,\cdots,y_n),\cdots,x_n(y_1,\cdots,y_n))\left|J\right|$. 其中 $J$ 为 **Jacobi 行列式** $\dfrac{\partial(x_1,\cdots,x_n)}{\partial(y_1,\cdots,y_n)}\neq0$.

**多维正态随机向量的可逆线性变换仍是正态随机向量**.

::fold{title="随机变量变换 Example" info expand}
> $\xi$，$\eta$ 相互独立，都服从参数为 $1$ 的指数分布，分别求 $\alpha=\xi+\eta$ 与 $\beta=\dfrac{\xi}{\eta}$ 的密度.

$x,y>0$ 时，$p(x,y)=e^{-(x+y)}$，这是 $(\xi,\eta)$ 的联合密度.

函数组 $\begin{cases} u=x+y \\ v=x/y \end{cases}$ 存在反函数，当 $x,y>0$，$u,v>0$ 时

$$
\begin{align*}
J^{-1}&=\dfrac{\partial(u,v)}{\partial(x,y)}=\begin{vmatrix} 1 & 1 \\[.5em] \frac{1}{y} & -\frac{x}{y^2}\end{vmatrix} \\[2em]
&=-\dfrac{x+y}{y^2}=-\dfrac{(1+v)^2}{u}
\end{align*}
$$

故 $|J|=\dfrac{u}{(1+v)^2}$. 因此 $(\alpha,\beta)$ 的联合密度为

$$
q(u,v)=\begin{cases}
\dfrac{ue^{-u}}{(1+v)^2} & u>0,\ v>0 \\[1em]
0 & \text{otherwise}
\end{cases}
$$

$\alpha$ 和 $\beta$ 各自的密度即为 $q(u,v)$ 的边际密度.
::
