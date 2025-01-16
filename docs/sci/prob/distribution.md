---
title: 常用分布表
---

## 离散型

### 退化分布 / 单点分布

::fold{title="退化分布 / 单点分布" info expand}
**概率分布 $p_{\xi}(k)$** $=\begin{cases}1 & k=c \\ 0 & k\neq c\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=c$

**方差 $\operatorname{Var}(\xi)$** $=0$

**特征函数 $\varphi(t)$** $=e^{\mathrm{i}ct}$
::

$\xi$ 恒为常数 $c$，即 $P(\xi=c)=1$.

---

### 两点分布 / 伯努利分布 / 01 分布

::fold{title="两点分布 / 伯努利分布 / 01 分布" info expand}
**记作 $B(1,p)$**

**概率分布 $p_{\xi}(k)$** $=\begin{cases}p & k=1 \\ 1-p & k=0\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=p$

**方差 $\operatorname{Var}(\xi)$** $=pq$

**特征函数 $\varphi(t)$** $=pe^{\mathrm{i}t}+q$
::

$\xi$ 为事件 $A$（概率为 $p$）的示性函数，即 $\xi=\begin{cases} 1 & \text{如果 } A \text{ 发生} \\ 0 & \text{如果 } A \text{ 不发生}\end{cases}$.

---

### 二项分布

::fold{title="二项分布" info expand}
**记作 $B(n,p)$**

**概率分布 $p_{\xi}(k)$** $=\displaystyle\binom{n}{k} p^kq^{n-k}:=b(k;n,p)$，$k=0,1,\cdots,n$

**期望 $\mathbb{E}(\xi)$** $=np$

**方差 $\operatorname{Var}(\xi)$** $=npq$

**特征函数 $\varphi(t)$** $=(pe^{\mathrm{i}t}+q)^n$
::

$\xi$ 为 $n$ 次独立重复试验中事件 $A$ 发生的次数.

1. $b(k;n,p) = b(n-k;n,1-p)$.
2. $k=m$ 时 $b(k;n,p)$ 达到最大，$m$ 称为**最可能成功次数**.
    - 若 $(n+1)p$ 是整数，则 $m=(n+1)p$ 或 $m=(n+1)p-1$；
    - 若 $(n+1)p$ 不是整数，则 $m=\lfloor (n+1)p \rfloor$.
3. 若 $\xi\sim B(n,p)$，则 $P(\xi=k+1)=\dfrac{(n-k)p}{(k+1)q}\cdot P(\xi=k)$.
4. （**泊松定理**）假设 $p$ 与 $n$ 有关，记作 $p_n$，若 $\lim\limits_{n\to\infty}np_n=\lambda$，则 $\lim\limits_{n\to\infty}b(k;n,p_n)=\dfrac{\lambda^k}{k!}e^{-\lambda}$. 即 $B(n,p_n)\to P(\lambda)$.

---

### 泊松分布

::fold{title="泊松分布" info expand}
**记作 $P(\lambda)$**，$\lambda>0$

**概率分布 $p_{\xi}(k)$** $=\dfrac{\lambda^k}{k!}e^{-\lambda}:=p(k;\lambda)$，$k=0,1,2,\cdots$

**期望 $\mathbb{E}(\xi)$** $=\lambda$

**方差 $\operatorname{Var}(\xi)$** $=\lambda$

**特征函数 $\varphi(t)$** $=e^{\lambda(e^{\mathrm{i}t}-1)}$
::

由泊松定理引入，$\xi$ 取一切非负整数.

---

### 几何分布

::fold{title="几何分布" info expand}
**概率分布 $p_{\xi}(k)$** $=pq^{k-1}:=g(k;p)$，$k=1,2,3,\cdots$

**期望 $\mathbb{E}(\xi)$** $=\dfrac{1}{p}$

**方差 $\operatorname{Var}(\xi)$** $=\dfrac{q}{p^2}$

**特征函数 $\varphi(t)$** $=\dfrac{pe^{\mathrm{i}t}}{1-qe^{\mathrm{i}t}}$
::

$\xi$ 为伯努利试验首次成功的次数.

**无记忆性**：$P(\xi>k+m\mid \xi>m)=P(\xi>k)$. 即：如果前 $m$ 次试验都失败，那么从第 $m+1$ 次开始到成功的次数 $\eta$ 仍服从几何分布.

---

### 超几何分布

::fold{title="超几何分布" info expand}
**概率分布 $p_{\xi}(k)$** $=\dfrac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}$，$k=0,1,2,\cdots,\min(n,M)$

**期望 $\mathbb{E}(\xi)$** $=n\cdot\dfrac{M}{N}$

**方差 $\operatorname{Var}(\xi)$** $=n\cdot\dfrac{M}{N}\left(1-\dfrac{M}{N}\right)\cdot\dfrac{N-n}{N-1}$
::

$N$ 件产品中有 $M$ 件次品，从中抽取 $n$ 件，其中次品数为 $\xi$.

---

### 巴斯卡分布

::fold{title="巴斯卡分布" info expand}
**概率分布 $p_{\xi}(k)$** $=\displaystyle\binom{k-1}{r-1}p^r q^{k-r}$，$k=r,r+1,r+2,\cdots$

**期望 $\mathbb{E}(\xi)$** $=\dfrac{r}{p}$

**方差 $\operatorname{Var}(\xi)$** $=\dfrac{rq}{p^2}$

**特征函数 $\varphi(t)$** $=\left(\dfrac{pe^{\mathrm{i}t}}{1-qe^{\mathrm{i}t}}\right)^r$
::

$\xi$ 为得到第 $r$ 次成功时的伯努利试验次数. $r=1$ 时即为几何分布.

---

## 连续型

### 均匀分布

::fold{title="均匀分布" success expand}
**记作 $U(a,b)$**

**概率密度 $p_{\xi}(x)$** $=\begin{cases}\frac{1}{b-a} & a\leqslant x\leqslant b \\[.5em] 0 & \text{otherwise}\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=\dfrac{a+b}{2}$

**方差 $\operatorname{Var}(\xi)$** $=\dfrac{(b-a)^2}{12}$

**特征函数 $\varphi(t)$** $=\dfrac{e^{\mathrm{i}tb}-e^{\mathrm{i}ta}}{\mathrm{i}t(b-a)}$
::

$\xi$ 在区间 $[a,b]$ 上均匀取值.

---

### 正态分布 / 高斯分布

::fold{title="正态分布 / 高斯分布" success expand}
**记作 $N(a,\sigma^2)$**

**概率密度 $p_{\xi}(x)$** $=\dfrac{1}{\sqrt{2\pi}\sigma}\exp\left\{{-\dfrac{(x-a)^2}{2\sigma^2}}\right\}$，$-\infty<x<\infty$

**期望 $\mathbb{E}(\xi)$** $=a$

**方差 $\operatorname{Var}(\xi)$** $=\sigma^2$

**特征函数 $\varphi(t)$** $=\exp\left\{{\mathrm{i}at-\dfrac{1}{2}\sigma^2t^2}\right\}$
::

当 $a=0$，$\sigma=1$ 时，称为**标准正态分布**，其密度及分布函数分别记作 $\varphi(x)$ 和 $\Phi(x)$.

$$
\begin{align*}
\varphi(x)&=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}} \\[1em]
\Phi(x)&=\int_{-\infty}^x\varphi(t)\,\mathrm{d}t=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^x e^{-\frac{t^2}{2}}\,\mathrm{d}t
\end{align*}
$$

---

### 指数分布

::fold{title="指数分布" success expand}
**概率密度 $p_{\xi}(x)$** $=\begin{cases}\lambda e^{-\lambda x} & x\geqslant 0 \\ 0 & x<0\end{cases}$，$\lambda>0$

**分布函数 $F(x)$** $=\begin{cases}1-e^{-\lambda x} & x\geqslant 0 \\ 0 & x<0\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=\dfrac{1}{\lambda}$

**方差 $\operatorname{Var}(\xi)$** $=\dfrac{1}{\lambda^2}$

**特征函数 $\varphi(t)$** $=\left(1-\dfrac{\mathrm{i}t}{\lambda}\right)^{-1}$
::

---

### $\chi^2$ 分布

::fold{title="$\chi^2$ 分布" success expand}
**记作 $\chi^2(n)$**，$n\in\mathbb{N}^+$

**概率密度 $p_{\xi}(x)$** $=\begin{cases}\frac{1}{2^{n/2}\Gamma(n/2)}x^{n/2-1}e^{-x/2} & x\geqslant 0 \\ 0 & x<0\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=n$

**方差 $\operatorname{Var}(\xi)$** $=2n$

**特征函数 $\varphi(t)$** $=(1-2\mathrm{i}t)^{-n/2}$

其中 $\Gamma(n)$ 为第一类欧拉积分.
::

---

### $\Gamma$ 分布

::fold{title="$\Gamma$ 分布" success expand}
**记作 $\Gamma(\lambda,r)$**，$\lambda>0,\ r>0$

**概率密度 $p_{\xi}(x)$** $=\begin{cases}\frac{\lambda^r}{\Gamma(r)}x^{r-1}e^{-\lambda x} & x\geqslant 0 \\ 0 & x<0\end{cases}$

**期望 $\mathbb{E}(\xi)$** $=\dfrac{r}{\lambda}$

**方差 $\operatorname{Var}(\xi)$** $=\dfrac{r}{\lambda^2}$

**特征函数 $\varphi(t)$** $=\left(1-\dfrac{\mathrm{i}t}{\lambda}\right)^{-r}$

其中 $\Gamma(r)$ 为第一类欧拉积分.
::

当 $r$ 为整数时也称**爱尔兰分布**.

$r=1$ 时，退化为指数分布.
