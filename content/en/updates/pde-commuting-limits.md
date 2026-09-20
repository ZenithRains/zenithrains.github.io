---
title: PDE approximations and commuting diagrams
date: 2026-09-20
translationKey: update-pde-commuting-limits
---

The various approximation schemes serving different purposes in a PDE proof might be understood through commuting diagrams: can the order of regularization, discretization, or singular limits be changed, and do different paths lead to the same solution? For a degenerate Keller–Segel–Navier–Stokes system, removing regularization and taking the fast-signal limit form a square whose commutativity remains to be verified. This naturally raises further questions: in which topology, under which uniform estimates, and with which notion of weak solution does the diagram commute? If commutativity fails, can the defect be described and controlled? (A common limit is a goal to be proved; subsequential convergence alone does not guarantee path independence.)

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

