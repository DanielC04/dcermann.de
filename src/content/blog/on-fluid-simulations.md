---
title: "Building a Fluid Simulation in the Browser"
description: "Notes on implementing a real-time fluid simulation using WebGL and Three.js."
pubDate: 2026-03-01
tags: ["graphics", "webgl", "threejs", "simulation"]
---

One of the most satisfying things I've built recently is a real-time fluid simulation that runs entirely in the browser — no server, no native binaries, just WebGL shaders. Here's how it came together.

## The physics

The underlying model is the **incompressible Navier–Stokes equations**:

```
∂u/∂t + (u · ∇)u = −∇p/ρ + ν∇²u
∇ · u = 0
```

In plain terms: fluid velocity changes due to pressure gradients, viscosity, and the constraint that mass is conserved (divergence-free). Solving this in real time requires a clever discretisation.

## Solving on the GPU

The trick is to store the velocity and pressure fields as textures and run each step of the solver as a full-screen fragment shader pass. A single simulation frame looks roughly like:

1. **Advect** the velocity field along itself (semi-Lagrangian advection).
2. **Apply external forces** (mouse interaction, buoyancy).
3. **Diffuse** to simulate viscosity.
4. **Compute pressure** via iterative Jacobi relaxation.
5. **Project** to enforce divergence-free constraint.

Each step reads one or more textures and writes to a framebuffer object. Three.js's `WebGLRenderTarget` makes this straightforward to set up without dropping to raw WebGL.

## Interactivity

Mouse movement feeds a force and colour "splat" into the simulation each frame. It's surprisingly satisfying to drag swirling colour through the fluid.

You can try it at [fluid.dcermann.de](https://fluid.dcermann.de).
