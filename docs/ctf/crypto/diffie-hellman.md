---
title: Diffie-Hellman 密钥交换
---

Diffie-Hellman 密钥交换协议（DH）是一种**公钥交换协议**，用于在不安全的通信信道上协商密钥. 该协议的安全性基于**离散对数问题**.

---

## 算法流程

Diffie-Hellman 协议的流程如下：

1. **初始化**：Alice 和 Bob 共享一个**大素数** $p$ 和一个**原根** $g$.
2. **生成密钥**：
    - Alice 选择一个私钥 $a$，计算公钥 $A = g^a \bmod p$.
    - Bob 选择一个私钥 $b$，计算公钥 $B = g^b \bmod p$.
3. **交换公钥**：Alice 将 $A$ 发送给 Bob，Bob 将 $B$ 发送给 Alice. 该步骤可以在不安全的网络中进行.
4. **计算密钥**：Alice 计算 $K = B^a \bmod p$，Bob 计算 $K = A^b \bmod p$，得到相同的密钥 $K$ 用于后续通信.

---

## 攻击

[离散对数求解器](https://www.alpertron.com.ar/DILOG.HTM)

剩下的以后再写.
