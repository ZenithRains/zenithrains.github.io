---
title: "I Suddenly Realized You Can Draw a PDE Energy Estimate as a Graph"
date: 2026-07-20
slug: pde-energy-estimates-categorical-view
description: "I started wondering whether category theory could describe the way PDE analysts use inequalities, reuse estimates, and choose Young parameters."
translationKey: pde-energy-estimates-categorical-view
tags:
  - PDE
  - Energy estimates
  - Category theory
  - Abstract interpretation
math: true
draft: false
---

I once started thinking about PDE energy estimates. An energy estimate is a kind of coarse-graining: it turns a PDE into an ODE problem. When doing an energy estimate, one often runs into the following situation. Every time Young's inequality appears, one says: take a sufficiently small $\varepsilon$. But these $\varepsilon$'s cannot be chosen separately. An intermediate estimate from an earlier step may be needed in two later places. The same nonlinear term may also admit several different routes. Every individual step looks fine, yet the steps may conflict when put together. There is reuse here. There is branching. There are different routes to compare, and there is the global compatibility of local parameters. This ought to have a mathematical structure of its own. One can also notice that analysts sometimes close an estimate by introducing a new inequality. About a year ago, while reading functional analysis, I came across a theorem about the zeros of functions that looked strangely familiar, something like Hilbert's Nullstellensatz. Now I was seeing a similar structure again. Of course, this has a name: a Galois correspondence. Then I thought of category theory. Perhaps the actual moves in a PDE energy estimate can be described categorically.

Consider an ordinary energy inequality. On the time interval $t\in(0,\mathcal T)$, suppose that

\[
\frac{1}{2}E'(t)+\lambda\mathbin{\cdot}D(t)
\leq \sum_{\nu=1}^{m}N_\nu(t).
\]

Here $E$ is the energy, $D=(D_1,\ldots,D_d)$ is a collection of dissipation terms, $\lambda\in(0,\infty)^d$ is the available dissipation budget, and the $N_\nu$ are the nonlinear terms that remain to be handled. At first sight, the next step is simply to estimate the $N_\nu$ one by one. The actual calculation is not linear at all. One first applies Hölder to some $N_\nu$, then interpolation, and then Young. Another term $N_\mu$ may call on the intermediate estimate just obtained. The same target may also admit two approaches. One saves derivatives but produces a bad constant. The other uses a little more regularity but consumes less of the dissipation budget. So what actually exists in a PDE analyst's head is a finite graph of estimates. A box in the graph is an application of Hölder, Sobolev, a commutator, trace, Hardy, Young, or an inequality specific to the problem. A wire records how one estimate enters the next step. A conclusion can branch and be reused later. Two different routes can reach the same target.

At first, I only wanted to write about Galois duality. As I kept writing, a problem appeared. If I only record whether an estimate can be derived, I forget the entire route by which the proof reached it. PDE analysts care a great deal about the route. So the category should come first. Galois duality is the order-theoretic structure left after the route has been forgotten. If I write down, one by one, the things people actually do when closing PDE energy estimates, I get the following table.

| PDE analysis practice | Categorical representation |
|---|---|
| A fully specified estimate | A generating object; the available estimates form a context |
| Using several estimates to derive another estimate | A primitive multi-input box |
| Using several inequalities in succession | Composition of morphisms |
| Carrying out independent estimates at the same time | Monoidal product |
| Reusing an intermediate estimate | Fan-out of a wire |
| Two different estimation routes | Parallel morphisms |
| Extracting part of a calculation as a lemma | Add a generator for an existing composite and declare them equal |
| Reducing the number of intermediate estimates | Find a shorter factorization or proof graph in a fixed presentation |
| Keeping only exponents and derivative orders | A feature functor |
| The exponent calculation works, but the concrete proof does not exist | An abstract morphism with no concrete lift |
| Choosing Young or interpolation parameters | Choosing a point in a constrained lifting space |
| Every step can be realized, but the whole estimate cannot be absorbed | The lifting space is nonempty, but its feasible subspace is empty |
| Moving a method to another class of PDEs | An analytic transport functor |
| Systematically comparing two estimation schemes | A natural transformation satisfying the required compatibility conditions |

Of course, the “estimate” in the first row has to be fully specified. Writing only $\|u\|_p\leq C\|u\|_{H^s}$ is certainly not enough. On what domain? Over what time interval? With which boundary conditions? In what solution class? What are the parameter ranges? On which quantities may the constant depend? Once these data have all been included, the estimate has a definite input and output. Otherwise the object itself has not been defined, and talking about composition is rather empty. Successive applications of Hölder, interpolation, and Young then give composition. Two unrelated estimates can be carried out side by side, giving the monoidal product. If an energy bound already obtained is sent into two nonlinear terms, its wire branches. Two routes reaching the same target give parallel morphisms. We now know how the target was reached, in addition to knowing that it is reachable. The table also contains a row about reducing intermediate estimates. “Shorter” can only mean shorter relative to the chosen generators and the chosen way of drawing the graph. Change the basic lemmas, and the length of the whole graph changes with them. The same applies when a stretch of calculation is named as a lemma. We have to declare that the new box represents the same derivation as the old composite. Otherwise we have quietly added a new rule.

When PDE analysts work out an a priori estimate, they often begin by calculating only the exponents. Ignore the boundary for the moment. Ignore endpoints and constants too. Just check the derivative orders, whether the space and time Lebesgue exponents fit, and how many powers of energy and dissipation occur. This is useful. If a route cannot even make the exponents work, there is no point wasting more time on it. Categorically, this step forgets most of the analytic data and keeps only a few features. As long as this forgetting respects judgments, rules, and their input and output types, it can be written as a feature functor. The result is an abstract proof graph. But after the exponents work, all the discarded information has to be put back. Put the boundary conditions back. Put the endpoint restrictions back. Put the regularity requirements and constant dependences back too. This can be viewed as a lifting problem. A familiar kind of failure can now be stated clearly: the abstract graph exists, but it cannot be lifted. Perhaps an endpoint estimate needed at one step is false. Perhaps two places impose incompatible regularity requirements. Perhaps the constant cannot be made uniform in the required parameters. I might once have said only that “this route does not work.” Now the diagnosis can be more precise. The exponent sketch passed, but the concrete lift failed. Then there is the matter of the Young parameters. Writing “take $\varepsilon$ sufficiently small” once is easy. After writing it five times, things are no longer so easy. The five parameters have to be settled together at the end. Every load returned to a dissipation term has to be collected and compared with $\lambda$.

We can therefore separate closure into three levels:

1. First ask whether an abstract proof graph exists.
2. Then ask whether that graph can be lifted to a proof satisfying the concrete analytic conditions.
3. Finally put all parameters together and check the remainders and dissipation budget.

The second level may succeed while the third fails. In set-theoretic language, the lifting space contains points, but the feasible subspace satisfying the final closure condition is empty. Every step may be available, while the full estimate still cannot be absorbed.

Now forget the concrete route and ask only whether an estimate follows from the available rules. All derivable estimates form a reachability closure. Next consider all truth-valued models stable under those rules. They supply the corresponding syntactic obstructions. Judgments and stable models form a Galois polarity. Of course, such an obstruction only says that the target is unreachable in the current rule system. It need not come from an actual PDE solution, and it is not an analytic counterexample. A PDE counterexample would still have to be constructed from the equation and its solutions. Once all the corresponding stable models are included, Galois duality completely describes syntactic reachability. Another Galois connection appears in feature forgetting. A map from concrete judgments to feature judgments naturally induces direct-image and inverse-image maps between the two power sets. These maps form a Galois connection. If the abstract domain contains only feature judgments that actually occur, this becomes a Galois insertion.

By searching for references with a large language model, I found that this connects directly with [Cousot--Cousot's theory of abstract interpretation](https://cs.nyu.edu/~pcousot/COUSOTpapers/POPL77.shtml). They were studying program analysis: how to send concrete semantics into a coarser abstract domain while keeping the abstract computation sound. I found this hilarious. PDE analysts first work out the exponents and then restore the concrete conditions. Are we not doing something very similar? Their later [Galois connection calculus](https://cs.nyu.edu/~pcousot/COUSOTpapers/POPL14.shtml) turns Galois connections themselves into a systematic calculus. There is still a difference here. A set-level closure forgets the proof route. A feature target may indeed be reached by some concrete route, while the particular abstract graph in our hands still has no lift. This is why I still want to retain the proof category. It remembers more than a bare closure does.

Now comes the part I find most fun. If we discover a new inequality, we have added a new primitive box to the proof system. As long as the old rules and relations remain unchanged, all the old routes are still there. The new box may be attached before an old rule or after it. A proof graph that could not be assembled before may suddenly become available. From the other side of the Galois duality, some old syntactic obstructions may cease to work. Adding a new inequality gives the proof graph a new way to move. A place that used to be blocked may now open. The new inequality may also be redundant, in which case nothing changes. But if it fills exactly the missing piece of the graph, the entire argument may suddenly open up. This is what it feels like to read a PDE paper in which the author suddenly closes the whole estimate with a new bound or a new inequality.

Once this graph is available, there are many more questions to ask. For example, we often say, “This method should work for another equation too.” Actually moving it requires moving the premises, primitive inequalities, boundary conditions, parameter restrictions, constant dependences, remainder classes, and dissipation budget together. If this entire package admits a compatible correspondence, the transport can be written as a functor. If there are two transport schemes, one can also ask whether they can be compared compatibly, component by component. This is where a natural transformation appears. Of course, naturality only says that the comparison is coherent. Which method is stronger, which route is shorter, and which one consumes less dissipation still have to be calculated.

This should not be oversold. The present model has not produced a new PDE theorem, and it will not invent estimates for us automatically. What it has done is to turn the problems faced by PDE analysts into mathematical symbols. When a plan fails, we can keep asking questions. Was there no abstract route at all? Did the route exist but fail to lift? Did several local parameters conflict? Or did the argument simply run short of dissipation budget at the end? Honestly, this is already a lot of fun. The concrete inequalities still have to be proved one by one. But we can finally study, as a mathematical object, how these inequalities connect, where they branch, and where they fail. Perhaps the next step is to search for missing rules in the graph, locate the first failing subgraph, or compare two closure schemes and identify the exact step at which they diverge.

The full definitions and proofs are available in the accompanying note: [A Categorical Semantics for PDE Energy Estimates (v1 PDF)](/files/pde-energy-categorical-semantics-v1.pdf).
