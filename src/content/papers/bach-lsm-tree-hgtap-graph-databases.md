---
title: "BACH: Bridging Adjacency List and CSR Format Using LSM-Trees for HGTAP Workloads"
authors:
  - Jianfeng Huang
  - Yihao Cao
  - Shubing Ren
  - Baohua Wu
  - Dongjing Miao
year: 2025
url: https://dl.acm.org/doi/10.14778/3718057.3718076
tags:
  - graph-theory
  - network-analysis
  - software
status: reading
tldr: "Proposes BACH, a disk-based graph database storage engine that uses a graph-aware LSM-Tree to progressively transform graph layout from TP-friendly adjacency lists to AP-friendly CSR format across compaction levels. An elastic merge compaction policy handles skewed vertex degree distributions, achieving high throughput, data freshness, and snapshot isolation for hybrid transactional/analytical workloads."
---
