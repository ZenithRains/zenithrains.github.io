---
title: "Proof or Obstruction：PDE 能量估计的验证与诊断"
date: 2026-07-20
slug: proof-or-obstruction
translationKey: proof-or-obstruction
description: "Ruiyi Zhang · 研究手稿 v2。区分能量估计的类型、参数、耗散预算与规则相对障碍。"
researchShowcase: true
tags: [数学, PDE, AI, 证明验证]
math: false
draft: false
pdf: /files/proof-or-obstruction-v2.pdf
---

**Proof or Obstruction: Verifier-Guided Diagnosis of PDE Energy Estimates**  
Ruiyi Zhang · 2026年7月20日 · Draft v2

这份研究手稿讨论一个具体问题：当 PDE 的能量估计无法闭合时，怎样判断问题出在哪一步，并留下可以复查的依据？

## 核心思路

手稿把诊断分成四层：抽象估计能否实例化到当前解析对象，多步估计的参数能否同时满足要求，非线性项能否在耗散预算内被吸收，以及目标是否能由给定规则库到达。不同层次的失败需要不同的证据和修复方式。

原型在有限、无环、预先枚举的规则契约内返回可回放的证明或障碍证书。超出这一范围，或仍有未解决的解析义务时，保留 `UNKNOWN`。规则相对障碍只说明当前规则库的限制，不能据此排除新的能量泛函或不等式。

## 实验与边界

- 从八篇已发表论文中提取八条成功估计路线，并分别加入一个受控扰动。失败记录来自人工扰动，不代表原论文存在错误。
- 使用24个合成任务考察诊断反馈，并在四个文献路线任务上进行八次模型调用，比较两种提示条件。
- 两种提示条件各通过四题；确定性有理代数与来源检索基线也通过相同四题。这些结果不足以说明模型优于经典方法。

当前工作展示的是受限规则下的推理检查与失败诊断，没有声称发现新的 PDE 定理。本文为研究手稿，尚未经独立专家完整审核；PDE 内容及每项形式编码与原始文献的对应关系仍需独立核对。

## 手稿全文

英文 PDF，7页。下方提供在线查看与下载。

{{< pdf src="/files/proof-or-obstruction-v2.pdf" title="Proof or Obstruction, Draft v2" >}}
