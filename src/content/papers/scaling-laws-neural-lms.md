---
title: "Scaling Laws for Neural Language Models"
authors: ["Jared Kaplan", "Sam McCandlish", "Tom Henighan", "Tom B. Brown", "Benjamin Chess", "Rewon Child", "Scott Gray", "Alec Radford", "Jeffrey Wu", "Dario Amodei"]
year: 2020
url: "https://arxiv.org/abs/2001.08361"
tags: ["deep-learning", "nlp", "scaling", "empirical"]
status: "to-read"
dateRead: 2026-04-01
tldr: "Language model loss follows clean power laws in compute, data, and parameters, with compute being the binding constraint — implying you should train larger models for fewer steps than is common practice."
---

This paper feels like the moment someone turned on the lights in a dark room. Before it, model scaling was mostly vibes. After it, there were equations.

## The key empirical findings

Loss L follows a power law in each of the three resources independently when the others are not bottlenecks:

```
L(N) ∝ N^−0.076
L(D) ∝ D^−0.095
L(C) ∝ C^−0.050
```

Where N is non-embedding parameters, D is tokens, and C is total compute. These exponents are remarkably stable across model families and sizes spanning many orders of magnitude.

The most actionable finding is the **compute-optimal frontier**: for a fixed compute budget, you should scale model size and data roughly proportionally. The paper found that in practice most models were being trained too long on too little data relative to their size — a finding that led directly to Chinchilla.

## What I keep thinking about

The power laws are clean enough that I'm suspicious. Real systems rarely follow such tidy relationships across 8+ orders of magnitude. The authors are careful to note that these are fits, not theoretical derivations — but the fit quality is striking. Either there's something deep about the geometry of language that makes this hold, or we're in a regime where the deviations are small enough not to matter practically.

The fact that the loss curves for different model sizes don't cross (larger models are always better at every point during training) is also non-obvious. It suggests you can evaluate model quality from early training checkpoints, which is practically useful.

## Limitations

The paper studies language models trained on WebText2. Whether the same exponents hold for other modalities, other architectures, or other data distributions is not addressed. Subsequent work suggests the exponents shift — sometimes significantly — in different settings.
