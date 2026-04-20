---
title: "The Assistant Axis: Situating and Stabilizing the Default Persona of Language Models"
authors:
  - "Christina Lu"
  - "Jack Gallagher"
  - "Jonathan Michala"
  - "Kyle Fish"
  - "Jack Lindsey"
year: 2026
url: "https://arxiv.org/abs/2601.10387"
tags: ["ai-safety", "alignment", "interpretability", "llm"]
status: "read"
dateRead: 2026-04-19
tldr: "Language models develop a dominant 'Assistant Axis' in persona space during post-training. Steering along it reinforces helpful behaviour; constraining activations to it stabilises models against persona drift and jailbreak-style persona attacks."
---

## Thoughts and learnings
- interesting: steer behaviour of LLM by actively limiting the activation of a given axis (-> to do: see if this can be done with other axes as well!?)
  - is this a general phenomena?
- how to extract role vectors?
  - get the model to roleplay a given persona
  - collect mean post-MLP residual stream activations for each token
  - perform PCA
  -> we get a low-dimensional representation of 4-19 dimensions that can capture >= 70% of the variance in the residual stream activations during roleplay
