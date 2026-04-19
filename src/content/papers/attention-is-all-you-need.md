---
title: "Attention Is All You Need"
authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"]
year: 2017
url: "https://arxiv.org/abs/1706.03762"
tags: ["deep-learning", "nlp", "transformers", "attention"]
status: "read"
dateRead: 2026-03-15
tldr: "Replaces recurrence and convolutions entirely with multi-head self-attention, achieving state-of-the-art translation quality at a fraction of the training cost."
---

The Transformer is one of those papers where the title is the whole thesis. After reading it, what struck me most is how *inevitable* the architecture feels in retrospect — and how much of that feeling is a lie.

## The core idea

The paper introduces self-attention as a replacement for recurrent layers. Instead of processing tokens sequentially (which prevents parallelisation and makes long-range dependencies hard), every token attends to every other token simultaneously. The computational cost is O(n²) in sequence length rather than O(n) in memory, which is a trade-off that turned out to be worth it for most practical sequence lengths.

Multi-head attention runs several attention operations in parallel with different learned projections, then concatenates the outputs. The intuition is that different heads can attend to different kinds of relationships — syntactic vs. semantic, local vs. global.

## What I found underexplained

The positional encodings section felt like an afterthought. Sinusoidal encodings work and the authors give an intuition (the model can easily learn to attend by relative position), but there's no deep analysis of *why* this choice works better or worse than learned embeddings. Later work (RoPE, ALiBi) suggests this was genuinely an open question.

The feed-forward sublayer — two linear transformations with a ReLU — is also curiously unexplained. It's essentially a pointwise MLP applied to each position independently. In hindsight this is where most of the model's "memory" lives, but the paper treats it as a minor detail.

## Why it matters beyond NLP

The Transformer escaped NLP surprisingly fast. Vision Transformers (ViT) showed you can tokenise image patches and the same architecture works. The same story repeated in protein structure (AlphaFold 2), audio, and video. The architecture is more like a general-purpose learnable graph where nodes attend over each other — the "sequence" framing is just one instance of that.

Reading this in 2026, knowing where it leads, the paper almost feels understated.
