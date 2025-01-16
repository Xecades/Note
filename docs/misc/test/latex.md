---
title: LaTeX 测试
---

::note{info}
以下文章仅作 $\LaTeX$ 测试用，完整文章见[《「狄利克雷卷积」和「莫比乌斯反演」》](https://blog.xecades.xyz/articles/DirichletConvolution/)
::

:asterisk

**狄利克雷卷积**（Dirichlet Convolution）在解析数论中是一个非常重要的工具.

使用狄利克雷卷积可以很方便地推出**莫比乌斯反演**（Möbius Inversion）相关重要函数和公式，它在信息学竞赛和解析数论中至关重要.

很多初学者不能真正地理解莫比乌斯反演，或者说即使能使用最终的公式，也难以理清楚它是怎么推导的.

本文中，我将尝试使用一种新的方式讲解狄利克雷卷积和莫比乌斯反演，希望能对大家有所帮助.

---

> 文中的引语（浅色文字）是可选内容，为正文的补充或提示. 阅读时，你可以选择跳过这部分文字，而不会影响内容连贯性.

---

## 什么是狄利克雷卷积

狄利克雷卷积是定义在**数论函数**间的二元运算.

> 所谓**数论函数**，是指定义域为 $\mathbb{N}$（**自然数**），值域为 $\mathbb{C}$（**复数**） 的一类函数，每个数论函数可以视为复数的序列.

它最常见的定义式为：

$$\boxed{\Bigl(f*g\Bigr)(n):=\sum_{d\mid n}f(d)g\biggl(\dfrac{n}{d}\biggr)\quad(d\in\mathbb{N})}$$

> 这里提醒一个很明显的事实：在这个定义式中，右式的函数 $f$ 和 $g$ 括号中的参数是可以调换的，即：
> 
> $$\Bigl(f*g\Bigr)(n):=\sum_{d\mid n}f\biggl(\dfrac{n}{d}\biggr)g(d)\quad(d\in\mathbb{N})$$

如果我们比较关注式子的对称性，下面有狄利克雷卷积的另一个定义式：

$$\boxed{\Bigl(f*g\Bigr)(n):=\sum_{xy=n}f(x)g(y)\quad(x,y\in\mathbb{N})}$$

下面举一个例子，以方便理解：

$$\begin{aligned}
&\Bigl(f*g\Bigr)(6) \\
=&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
\end{aligned}$$

在后面的文章中我们会反复应用这两个定义式.

> **为什么叫“狄利克雷卷积”呢？**
> 
> 首先，**狄利克雷**（Gustav Lejeune Dirichlet）是 19 世纪德国的数学家，他是解析数论的创立者，是解析数论很多重要理论的提出者. 至于“卷”，可以理解为在二维平面上延伸的两个数论函数（一个沿 x 轴，一个沿 y 轴）像卷毛巾一样交叉结合起来. “积”这个字在定义式中的星号 $*$ 体现出来了，如果定义普通函数加法为数论函数间的“加”运算，那么这里的狄利克雷卷积就是数论函数的“乘”运算，这一点我会在后文再次提到.

---

## 本文要用到的数论函数

还记得到吗？数论函数都是 $f: \mathbb{N}\rightarrow\mathbb{C}$ 类型的. 下面我来列举一些常用的数论函数.

> 初看时你可能会觉得这些定义没有什么用，但它们在狄利克雷卷积中大多是作为记号存在的.

### **单位函数** $\varepsilon(n)$

$$\boxed{\varepsilon(n):=\begin{cases}
1, & n=1, \\
0, & \mathrm{otherwise}.
\end{cases}}$$

---

### **幂函数** $\mathrm{Id}_k(n)$

$$\boxed{\mathrm{Id}_k(n):=n^k}$$

特别地，有：

 - 当 $k=1$ 时，为**恒等函数** $\mathrm{Id}(n)$，即 $\boxed{\mathrm{Id}(n):=n}$.
 - 当 $k=0$ 时，为**常数函数** $\mathbf{1}(n)$，即 $\boxed{\mathbf{1}(n):=1}$.

> 这里的常数函数 $\mathbf{1}(n)$ 的函数名是**加粗了**的数字 $1$，不要和 $1$ 弄混了.
> 在某些场合，有人会用大写字母 $I$ 来代替 $\mathbf{1}$，以防混淆，这里还是使用 $\mathbf{1}$.

---

### **除数函数** $\sigma_k(n)$

直观上理解，除数函数就是其所有因数的 $k$ 次方之和.

$$\boxed{\sigma_k(n):=\sum_{d\mid n}d^k\quad (d\in\mathbb{N})}$$

特别地，有：

 - 当 $k=1$ 时，为**因数函数** $\sigma(n)$，即 $\boxed{\sigma(n):=\sum\limits_{d\mid n}d}$.
 - 当 $k=0$ 时，为**个数函数** $d(n)$，即 $\boxed{\mathrm{d}(n):=\sum\limits_{d\mid n}1}$.

> 从“因数函数”和“个数函数”这两个名字就可以看出来，$\sigma(n)$ 表示 $n$ 的因数之和，$\mathrm{d}(n)$ 表示 $n$ 的因数个数. 例如，$\sigma(10)=1+2+5+10=18$，$\mathrm{d}(10)=1+1+1+1=4$.

对于因数函数和个数函数，设 $n=p_1^{c_1}p_2^{c_2}\dots p_m^{c_m}$，其中 $c_i\in\mathbb{N}^*,p_i\in\mathbb{P}$，可以得到这两个计算式（不是重点，证明从略）：

$$\begin{aligned}
\sigma(n)=&(1+p_1+\cdots+p_1^{c_1})\times\cdots\times(1+p_m+\cdots+p_m^{c_m})=\prod^m_{i=1}\biggl[\sum^{c_i}_{j=0}(p_i^j)\biggr],\\
\mathrm{d}(n)=&(c_1+1)\times(c_2+1)\times\cdots\times(c_m+1)=\prod_{i=1}^{m}(c_i+1).
\end{aligned}$$

---

### **欧拉函数** $\varphi(n)$

欧拉函数博大精深，这里只介绍一些内容.

$\varphi(n)$ 表示小于 $n$ 的正整数中与 $n$ 互质的数的个数.

可以不难推知（证明从略）：

$$\boxed{\varphi(n):=n\prod_{p\mid n}\biggl(1-\dfrac{1}{p}\biggr)\quad(p\in\mathbb{P})}$$

---

总共（提及的）有：**单位函数** $\varepsilon$、**幂函数** $\mathrm{Id}_k$（含**恒等函数** $\mathrm{Id}$ 和**常数函数** $\mathbf{1}$）、**除数函数** $\sigma_k$（含**因数函数** $\sigma$ 和**个数函数** $\mathrm{d}$）、**欧拉函数** $\varphi$.

上面提到的**所有**函数都是**积性函数**，其中**单位函数**和**幂函数**是**完全积性函数**（证明从略）.

> **积性函数**是指对**所有互质的整数** $a$ 和 $b$ 都有 $f(ab)=f(a)f(b)$ 的数论函数.
> **完全积性函数**是指对**所有整数** $a$ 和 $b$ 都有 $f(ab)=f(a)f(b)$ 的数论函数.
> 
> 在 $f(ab)=f(a)f(b)$ 式中令 $a = 1$，得到 $f(1)=1$，这也是积性函数一重要特点.

---

## 狄利克雷卷积相关定理

读者不妨先不看证明，自己试着证一下.

---

**[1] 若 $f$，$g$ 为积性函数，则 $f\ast g$ 也是积性函数.**

设 $(a,b)=1$（即 $a$ 和 $b$ 互质）则：

$$\begin{aligned}
&\Bigl(f*g\Bigr)(a)\cdot\Bigl(f*g\Bigr)(b) \\
=& \sum_{d_1\mid a}f(d_1)g\biggl(\dfrac{a}{d_1}\biggr)\cdot\sum_{d_2\mid b}f(d_2)g\biggl(\dfrac{b}{d_2}\biggr) \\
=& \sum_{d_1\mid a}\sum_{d_2\mid b}f(d_1)g\biggl(\dfrac{a}{d_1}\biggr)\cdot f(d_2)g\biggl(\dfrac{b}{d_2}\biggr) \\
=& \sum_{d_1d_2\mid ab}f(d_1d_2)g\biggl(\dfrac{ab}{d_1d_2}\biggr) \\
=& \sum_{d\mid ab}f(d)g\biggl(\dfrac{ab}{d}\biggr) \\
=& \Bigl(f*g\Bigr)(ab)
\end{aligned}$$

在将 $\large\sum\limits_{d_1\mid a}\sum\limits_{d_2\mid b}$ 合并成 $\large\sum\limits_{d_1d_2\mid ab}$ 的操作中，用到了由 $a$、$b$ 互质推导出来的结论：$ab$ 的因数唯一表示为 $a$ 的因数与 $b$ 的因数的乘积，因此 $d_1\mid a,\;d_2\mid b$ 和 $d_1d_2\mid ab$ 是完全等价的.

---

**[2] 狄利克雷卷积满足交换律，即 $f\ast g=g\ast f$.**

$$\begin{aligned}
&\Bigl(f*g\Bigr)(n) \\
=& \sum_{xy=n}f(x)g(y) \\
=& \sum_{yx=n}g(x)f(y)\quad(\ast) \\
=&\Bigl(g*f\Bigr)(n)
\end{aligned}$$

在 $(\ast)$ 中，我将 $x$ 和 $y$ 换了个位置（也就是 $x$ 写成 $y$，$y$ 写成 $x$. 实际上这不是必须的），然后把 $g$ 挪到了 $f$ 的前面.

这里我用的是第二个定义式，它的优点是对称性好，用来证明交换律很直观.

---

**[3] 狄利克雷卷积满足结合律，即 $(f\ast g)\ast h=f\ast(g\ast h)$.**

$$\begin{aligned}
&\Bigl((f\ast g)\ast h\Bigr)(n) \\
=& \sum_{xy=n}\Bigl(f*g\Bigr)(x)h(y) \\
=& \sum_{xy=n}\biggl(\sum_{zw=x}f(z)g(w)\biggr)h(y) \\
=& \sum_{xy=n}\sum_{zw=x}f(z)g(w)h(y) \\
=& \sum_{zwy=n}f(z)g(w)h(y) \\
=& \sum_{abc=n}f(a)g(b)h(c) \\
\end{aligned}$$

从 $f\ast(g\ast h)$ 开始，类似地也可以得到 $\large\sum\limits_{abc=n}\normalsize f(a)g(b)h(c)$，因此它们相等，结合律成立.

---

**[4] 狄利克雷卷积满足分配律，即 $f\ast(g+h)=f\ast g+f\ast h$.**

$$\begin{aligned}
&\Bigl(f\ast(g+h)\Bigr)(n) \\
=& \sum_{xy=n}f(x)\Bigl(g+h\Bigr)(y) \\
=& \sum_{xy=n}f(x)[g(y)+h(y)] \\
=& \sum_{xy=n}f(x)g(y)+f(x)h(y) \\
=& \sum_{xy=n}f(x)g(y)+\sum_{xy=n}f(x)h(y) \\
=& \Bigl(f\ast g+f\ast h\Bigr)(n)
\end{aligned}$$

---

这里总结一下我们证了的式子：

1. 若 $f$，$g$ 为积性函数，则 $f\ast g$ 也是积性函数.
2. 狄利克雷卷积满足**交换律**，即 $f\ast g=g\ast f$.
3. 狄利克雷卷积满足**结合律**，即 $(f\ast g)\ast h=f\ast(g\ast h)$.
4. 狄利克雷卷积满足**分配律**，即 $f\ast(g+h)=f\ast g+f\ast h$.

这些结论十分重要，后文中我可能会在不说明的情况下直接使用这些结论.

> **为什么是“积”？**
> 
> 现在我们可以得出原因了，狄利克雷卷积满足**交换律**、**结合律**和**分配律**，其运算法则和普通算数乘法完全类似（在小学的时候我们就已经学过乘法的三定律了）. 实际上，狄利克雷卷积和普通函数加法可以构成一个**阿贝尔环**，你甚至可以在它的基础上构建以函数为自变量的多项式，并解它的根.

---

## 一些特殊的卷积

看到这里，前文提到的数论函数才能真正地起作用.

---

**[1] $\mathrm{Id}_k\ast\mathbf{1}=\sigma_k$**

$$\begin{aligned}
\Bigl(\mathrm{Id}_k*\mathbf{1}\Bigr)(n) =& \sum_{d\mid n}\mathrm{Id}_k(d)\mathbf{1}\biggl(\dfrac{n}{d}\biggr) \\
=& \sum_{d\mid n}\mathrm{Id}_k(d) \\
=& \sum_{d\mid n}d^k \\
=& \sigma_k(n) \\
\end{aligned}$$

在证明的过程中，我们发现：如果一个函数和 $\mathbf{1}$ 作狄利克雷卷积，就相当于把其参数的所有因子枚举出来并代入原函数，然后求和. 也就是说：

$$\Bigl(f*\mathbf{1}\Bigr)(n)=\sum_{d\mid n}f(d)$$

无论是正向操作还是反向操作，这个式子都很重要.

---

**[2] $\varphi\ast\mathbf{1}=\mathrm{Id}$**

> 再提醒一下，$\varphi(n)$ 的定义是这样的：
> $$\varphi(n):=n\prod_{p\mid n}\biggl(1-\dfrac{1}{p}\biggr)\quad(p\in\mathbb{P})$$

首先有：

$$\Bigl(\varphi\ast\mathbf{1}\Bigr)(n)=\sum_{d\mid n}\varphi(d)$$

尝试对 $n$ 进行拆分，当 $n=p^m\;(p\in\mathbb{P})$ 时，有：

$$\begin{aligned}
\sum_{d\mid n}\varphi(d) =& \varphi(1)+\sum_{d=1}^{m}\varphi(p^d) \\
=& 1+\sum_{d=1}^{m}p^d\biggl(1-\dfrac{1}{p}\biggr) \\
=& 1+\sum_{d=1}^{m}(p^d-p^{d-1}) \\
=& p^m \\
=& n
\end{aligned}$$

考虑更普遍的情况，当 $n$ 为任意正整数，分解 $n=\prod p^m$，因为 $\varphi*\mathbf{1}$ 是积性函数，所以：

$$\begin{aligned}
\Bigl(\varphi*\mathbf{1}\Bigr)(n) =& \Bigl(\varphi*\mathbf{1}\Bigr)\biggl(\prod p^m\biggr)\\
=& \prod\Bigl(\varphi*\mathbf{1}\Bigr)({p_i}^{m_i}) \\
=& \prod p^m \\
=& n
\end{aligned}$$

综上，$\varphi*\mathbf{1}=\mathrm{Id}$.

---

**[3] $\mathbf{1}\ast\mathbf{1}=\mathrm{d}$**

这个证明相对更简单.

$$\begin{aligned}
\Bigl(\mathbf{1}*\mathbf{1}\Bigr)(n) =& \sum_{d\mid n}\mathbf{1}(d)\mathbf{1}\biggl(\dfrac{n}{d}\biggr) \\
=& \sum_{d\mid n}1 \\
=& \mathrm{d}(n) \\
\end{aligned}$$

---

上面我们只列举出了三个常用的狄利克雷卷积结果，分别是：

1. $\mathrm{Id}_k*\mathbf{1}=\sigma_k$;
2. $\varphi*\mathbf{1}=\mathrm{Id}$;
3. $\mathbf{1}*\mathbf{1}=\mathrm{d}$.

实际上，通过这几个运算我们可以得到更多的运算，例如：

$$\sigma=\mathrm{Id}*\mathbf{1}=\varphi*\mathbf{1}*\mathbf{1}=\varphi*\mathrm{d}$$

---

## 单位元

> 乘法的**单位元**是指乘上它后值不改变的数（对狄利克雷卷积来说，是“函数”）. 例如，普通乘法的单位元是数字 $1$，因为 $n\times1=n$. 因此，在狄利克雷卷积中，它的单位元 $\tau(n)$ 就应该满足 $f*\tau=f$.

我们注意到这样一个事实：

$$\Bigl(f*\varepsilon\Bigr)(n)=\sum_{d\mid n}\varepsilon(d)f\biggl(\dfrac{n}{d}\biggr)=f(n)$$

因此，狄利克雷卷积的单位元就是**单位函数** $\varepsilon(n)$，它在狄利克雷卷积中的作用和 1 在普通乘法中的作用是类似的. 任何函数（**包括 $\varepsilon$**）和 $\varepsilon$ 进行狄利克雷卷积，都得到该函数本身.

> 还记得到吗？$\varepsilon(n)$ 的定义是这样的：
> $$\varepsilon(n):=\begin{cases}
1, & n=1, \\
0, & \mathrm{otherwise}.
\end{cases}$$

---

## 狄利克雷逆（Dirichlet Inverse）

> 我们可以把这里的“**逆**”和“**逆元**”作类比. 例如，在普通运算中，一个数的“逆元”就是这个数的倒数；在同余运算中，一个数的“逆元”在同个模的意义下，能使得它与这个数相乘的结果与 $1$ 同余. 分别而言，如果我们规定 $n$ 的逆元是 $n^{-1}$（这个符号是作为整体引入的，**大多数情况下不能简单地理解为 $\dfrac{1}{n}$**），那么就有这样两个式子：
>
> $$\begin{aligned}
\text{普通运算中：}& n\times n^{-1}=1,\\
\text{同余运算中：}& n\times n^{-1}\equiv1\;(\mathrm{mod}\; r).
\end{aligned}$$
>
> 数字 $1$ 是两种运算中的单位元，所以说，逆元在类似乘法的运算中起着“倒数”的地位.

在狄利克雷卷积中，单位元是 $\varepsilon$，我们定义狄利克雷逆如下：

$$\boxed{f*f^{-1}=\varepsilon}$$

函数 $f^{-1}$ 就被称为 $f$ 的**狄利克雷逆**.

---

对于狄利克雷逆公式的推导，可以使用**合情推理**的方法（列出 $n=1,2,3\cdots$，然后找规律），得到狄利克雷逆的计算式：

$$\boxed{f^{-1}(n):=\begin{cases}
\dfrac{1}{f(1)},&n=1, \\
-\dfrac{1}{f(1)}\large\sum\limits_{d\mid n,\;d\neq n}\normalsize f\biggl(\dfrac{n}{d}\biggr)f^{-1}(d),&\mathrm{otherwise}.
\end{cases}}$$

这个式子我们不推导，仅证明它是成立的:

当 $n=1$ 时，$\Bigl(f*f^{-1}\Bigr)(1)=\large\sum\limits_{d\mid1}\normalsize f(d)f^{-1}\biggl(\dfrac{1}{d}\biggr)=f(1)f^{-1}(1)=1$.

当 $n\neq1$ 时，

$$\begin{aligned}
&\Bigl(f*f^{-1}\Bigr)(n) \\
&= \sum_{d\mid n}f\biggl(\dfrac{n}{d}\biggr)f^{-1}(d) \\
&= f(1)f^{-1}(n)+\sum_{d\mid n,\;d\neq n}f\biggl(\dfrac{n}{d}\biggr)f^{-1}(d) \\
&= -\dfrac{f(1)}{f(1)}\sum_{d\mid n,\;d\neq n}f\biggl(\dfrac{n}{d}\biggr)f^{-1}(d)+\sum_{d\mid n,\;d\neq n}f\biggl(\dfrac{n}{d}\biggr)f^{-1}(d) \\
&= 0.
\end{aligned}$$

也就是说，$f*f^{-1}=\varepsilon$. 因此这个计算式是成立的.

---

值得注意的是，狄利克雷逆的计算式中包含了自身，也就是说它是个**递归形式的定义**. 若将其展开，则过于复杂，（一般）没有实际意义.

一个数论函数 $f(n)$ 存在狄利克雷逆的**充要条件**是 $f(1)\neq0$，在狄利克雷逆的推导过程中，我们知道 **$f(n)$ 的逆是唯一的**.

需要指出，**积性函数一定有狄利克雷逆，且它也是积性函数**，该证明从略（请参见芝加哥大学 Mark Schachner 的 [Paper](http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf)）.

当 $f(1)\neq0$ 且 $g(1)\neq0$ 时，有 $\boxed{(f\ast g)^{-1}=f^{-1}*g^{-1}}$，证明如下：

$$\begin{aligned}
&(f*g)^{-1}*(f*g) \\
&=\varepsilon \\
&=(f^{-1}*f)*(g^{-1}*g) \\
&=(f^{-1}*g^{-1})*(f*g)
\end{aligned}$$

由狄利克雷逆的唯一性，$f\ast g$ 的狄利克雷逆是唯一的，所以 $(f\ast g)^{-1}=f^{-1}*g^{-1}$.

---

## 莫比乌斯反演

说了这么多，终于到莫比乌斯反演了. 了解了狄利克雷卷积和狄利克雷逆，莫比乌斯反演就不在话下了.

我们定义单位函数 $\mathbf{1}(n)$ 的狄利克雷逆为**莫比乌斯函数 $\mu(n)$**（或译作“默比乌斯函数”）：

$$\boxed{\mu:=\mathbf{1}^{-1}}$$

上面这个式子就是莫比乌斯函数的狄利克雷逆定义式，如果用普通写法，莫比乌斯函数的普通定义式为：

$$\boxed{\mu(n):=\begin{cases}
1 &n=1 \\
(-1)^m &n=p_1p_2\dots p_m,\;p_i\in\mathbb{P} \\
0 &\mathrm{otherwise}
\end{cases}}$$

其证明请参见 Mark Schachner 的 [Paper](http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf) 中的 Theorem 4.3.

> 互联网上不少介绍莫比乌斯反演的文章只给第二种定义，是因为莫比乌斯反演的讲解可以绕过狄利克雷卷积独立进行，但这样做会让一些读者不明白为什么这样定义，平添了许多麻烦. 我认为，在理解狄利克雷卷积的基础上谈论莫比乌斯反演是事半功倍的.

使用狄利克雷卷积来推导莫比乌斯反演公式就易如反掌了：

$$\boxed{g=f*\mathbf{1}\Leftrightarrow f=g*\mu}\quad(*)$$

将其展开，也就是：

$$\boxed{g(n)=\sum_{d\mid n}f(d)\Leftrightarrow f(n)=\sum_{d\mid n}\mu(d)g\biggl(\dfrac{n}{d}\biggr)}$$

莫比乌斯反演公式的证明十分简单，在 $(*)$ 式的左式中同时卷积 $\mu$ 即可.

---

## 参考文献

1. [芝加哥大学 Mark Schachner 的论文：*Algebraic and Analytic Properties of Arithmetic Functions*](http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf);
2. [Wikipedia *Dirichlet Convolution* 条目](https://en.wikipedia.org/wiki/Dirichlet_convolution);
3. [Pecco 知乎专栏《狄利克雷卷积》](https://zhuanlan.zhihu.com/p/137619492);
4. [Wikipedia *Arithmetic Function* 条目](https://en.wikipedia.org/wiki/Arithmetic_function).

---

感谢阅读，如果发现有误或不当的地方，我诚恳地希望您在下方评论区指出.

关于莫比乌斯反演公式的应用及延伸，我会在下一篇文章中提及，敬请期待.
