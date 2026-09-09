---
title: "Proof or Obstruction: Verifier-Guided Diagnosis of PDE Energy Estimates"
date: 2026-07-20
slug: proof-or-obstruction
translationKey: proof-or-obstruction
description: "Ruiyi Zhang · Research manuscript v2. Diagnosing type, parameter, dissipation-budget, and rule-relative failures in energy estimates."
researchShowcase: true
tags: [Mathematics, PDE, AI, Proof verification]
math: false
draft: false
pdf: /files/proof-or-obstruction-v2.pdf
---

Ruiyi Zhang · 20 July 2026 · Draft v2

This research manuscript asks a concrete question: when a PDE energy estimate fails to close, how can we locate the failure and retain evidence that can be checked again?

## Approach

The manuscript separates four diagnostic layers: whether an abstract estimate has a concrete analytic instance, whether parameters across multiple estimates are jointly compatible, whether nonlinear terms fit within the dissipation budget, and whether a target is reachable within a declared rule library. Failures at these layers require different evidence and repairs.

Within a finite, acyclic, explicitly enumerated rule contract, the prototype returns replayable proofs or obstruction certificates. Outside this scope, or when analytic obligations remain unresolved, it preserves `UNKNOWN`. A rule-relative obstruction describes the limits of the current library; it does not exclude a new energy functional or inequality.

## Experiments and limitations

- Eight successful estimate routes are extracted from eight published papers, with one controlled mutation per route. Failed records are benchmark counterfactuals, not alleged errors in the source papers.
- A 24-task synthetic experiment examines diagnostic feedback. A further experiment makes eight model calls across four source-backed tasks under two prompt conditions.
- Both prompt conditions pass all four tasks. Deterministic rational-algebra and source-registry baselines also pass the same four tasks. These results do not establish an advantage over classical methods.

The work demonstrates reasoning checks and failure diagnosis within a restricted rule contract. It does not claim a new PDE theorem. This is a research manuscript, pending full independent expert review, including independent checks of the PDE content and the correspondence between each encoding and its source.

## Full manuscript

English PDF, 7 pages. Read online or download below.

{{< pdf src="/files/proof-or-obstruction-v2.pdf" title="Proof or Obstruction, Draft v2" >}}
