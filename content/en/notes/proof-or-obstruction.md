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

Ruiyi Zhang · 20 July 2026 · Research manuscript v2

## Why I started

In PDE energy estimates, I often spend time trying energy functionals, interpolation exponents, and Young parameters, checking whether conditions from different steps can hold together and whether the troublesome terms fit within the dissipation budget. Individual estimates can be valid while the whole chain still fails to close. I wanted a way to organize this repeated search and make both successful routes and failures easier to inspect.

Within suitable finite templates, some exponent, parameter, and budget problems can be translated into linear or convex optimization. Category theory also offers a language for composing estimates, using them in parallel, and reusing their outputs. These observations motivated the manuscript.

## How I approach it

With rules and templates fixed, I express shared parameter conditions as a feasible set and dissipation costs as objectives or constraints. In linear cases, linear programming finds feasible parameters, while Farkas certificates or optimization duals explain parameter conflicts and insufficient budgets.

An estimate chain also carries domains, function spaces, and boundary conditions. I separate abstract exponent calculations, concrete analytic instances, and global compatibility across local choices. The resulting diagnoses distinguish missing conditions, parameter conflicts, insufficient dissipation budgets, and targets unreachable within the rule library. Each points to a different next step: add an assumption, adjust parameters, introduce a cross-energy term, or look for a new inequality.

The prototype's replayable proofs and obstruction certificates apply to a finite, acyclic, explicitly enumerated rule contract. Candidates outside the library and unresolved analytic steps are recorded as `UNKNOWN` for further analysis.

## Prototype and experiments

- I extracted eight estimate routes from eight published PDE papers and constructed eight single-factor perturbations to test route replay and failure diagnosis.
- I compared diagnostic feedback on 24 synthetic tasks and made eight model calls across four source-backed tasks under two prompt conditions.
- Both prompt conditions and deterministic baselines reconstructed all four tasks. Exact solving within fixed templates provides a baseline for the next experiments, where I want to explore new representations, energy terms, and lemmas.

## How models can help

I also want models to attempt complete derivations, search broadly over candidates, and revise their approaches. Models can propose ideas freely; convex optimization and category theory help me organize, check, and explain those candidates.

My next step is to combine broad exploration of energy functionals, variable transformations, and estimate routes with mathematical analysis and executable checks. During an internship, I plan to select analysis and PDE problems relevant to my background from collections such as ICM Conjectures, check the literature, and break them into intermediate propositions. I hope to make meaningful mathematical progress and see where models genuinely help.

## Full manuscript

Research manuscript v2, English PDF, 7 pages. Full independent expert review of the manuscript and source encodings is pending.

{{< pdf src="/files/proof-or-obstruction-v2.pdf" title="Proof or Obstruction, Draft v2" >}}
