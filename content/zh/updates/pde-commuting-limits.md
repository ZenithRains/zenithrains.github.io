---
title: PDE 逼近与交换图
date: 2026-09-20
translationKey: update-pde-commuting-limits
---

PDE 证明中承担不同任务的多套逼近，也许能通过交换图来理解：正则化、离散化或奇异极限的顺序能否调整，不同路径是否到达同一个解？以退化 Keller–Segel–Navier–Stokes 系统为例，去掉正则化与取快信号极限，就构成一个待验证的方块。自然容易追问，这张图在什么拓扑、什么一致估计和什么弱解概念下交换？如果交换失败，缺陷能否被描述和控制？（共同极限是需要证明的目标，子列收敛本身还不足以保证路径无关。）

\[
\begin{array}{ccc}
(n_{\delta,\varepsilon},c_{\delta,\varepsilon},u_{\delta,\varepsilon})
&\xrightarrow{\ \delta\downarrow0\ }&
(n_{0,\varepsilon},c_{0,\varepsilon},u_{0,\varepsilon}) \\[3mm]
{\scriptstyle\varepsilon\downarrow0}\;\Big\downarrow
&\overset{?}{\circlearrowleft}&
\Big\downarrow\;{\scriptstyle\varepsilon\downarrow0} \\[3mm]
(n_{\delta,0},c_{\delta,0},u_{\delta,0})
&\xrightarrow{\ \delta\downarrow0\ }&
(n_{0,0},c_{0,0},u_{0,0})
\end{array}
\]

