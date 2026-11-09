/**
 * Force layout shared by the topic map's build-time pass (TopicMap.astro
 * frontmatter) and its live, draggable client-side simulation.
 *
 * Topics are big nodes, papers small ones. Papers are linked to each of their
 * topics; topics that share papers are linked to each other. Papers covering
 * several topics therefore settle between them.
 *
 * Everything lives in a fixed frame (FRAME), centred on the origin, so the map's
 * on-screen scale — and with it label and dot size — no longer shrinks as the
 * reading list grows. Density is bounded by the caller instead: above a paper
 * threshold only topics (plus the focused topic's papers) are laid out.
 */
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
} from 'd3-force';

/** Fixed viewBox size. Roughly the map's on-screen size in px (340px column). */
export const FRAME = { w: 310, h: 240 } as const;
export const VIEWBOX = `${-FRAME.w / 2} ${-FRAME.h / 2} ${FRAME.w} ${FRAME.h}`;
const EDGE = 3;   // inner margin of the frame

export const PAPER_R = 4.5;
export const LABEL_FONT = 10.5;

export interface LayoutNode {
  id: string;
  kind: 'topic' | 'paper';
  r: number;
  x: number;
  y: number;
  /** Topic label (topics only) — the layout keeps papers out of it. */
  label?: string;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
}

export interface LayoutLinks {
  /** paper → topic */
  paper: { source: string; target: string; bridge: boolean }[];
  /** topic ↔ topic, `n` = number of shared papers */
  topic: { source: string; target: string; n: number }[];
}

export const labelHalfWidth = (label: string) => label.length * LABEL_FONT * 0.29;

/** Box under a topic circle where its label is drawn. */
export function labelBox(t: LayoutNode, margin = 0) {
  const hw = labelHalfWidth(t.label ?? '') + margin;
  return {
    left:   t.x - hw,
    right:  t.x + hw,
    top:    t.y + t.r + 1 - margin,
    bottom: t.y + t.r + LABEL_FONT + 4 + margin,
  };
}

/** Stable pseudo-random number in [0, 1) for a string (FNV-1a). */
export function hash01(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 2 ** 32;
}

/**
 * Initial offset for a node, seeded by its id rather than its array index, so
 * adding one paper doesn't reshuffle every other node's start position.
 */
export function seedOffset(id: string, spread: number) {
  const a = hash01(id) * Math.PI * 2;
  const d = (0.35 + 0.65 * hash01(`${id}#r`)) * spread;
  return { x: Math.cos(a) * d, y: Math.sin(a) * d };
}

/** Keeps a node (and a topic's label) inside the frame. */
export function clampToFrame(n: LayoutNode) {
  const hw = n.kind === 'topic' ? Math.max(n.r, labelHalfWidth(n.label ?? '')) : n.r;
  const below = n.kind === 'topic' ? n.r + LABEL_FONT + 4 : n.r;
  const minX = -FRAME.w / 2 + EDGE + hw, maxX = FRAME.w / 2 - EDGE - hw;
  const minY = -FRAME.h / 2 + EDGE + n.r, maxY = FRAME.h / 2 - EDGE - below;
  if (n.x < minX) { n.x = minX; if (n.vx! < 0) n.vx = 0; }
  if (n.x > maxX) { n.x = maxX; if (n.vx! > 0) n.vx = 0; }
  if (n.y < minY) { n.y = minY; if (n.vy! < 0) n.vy = 0; }
  if (n.y > maxY) { n.y = maxY; if (n.vy! > 0) n.vy = 0; }
}

function forceFrame(nodes: LayoutNode[]) {
  return () => nodes.forEach(clampToFrame);
}

// Pushes paper dots out of topic label boxes through the nearest side.
function forceAvoidLabels(nodes: LayoutNode[], paperR: number) {
  const topics = nodes.filter((n) => n.kind === 'topic');
  const papers = nodes.filter((n) => n.kind === 'paper');
  return () => {
    for (const t of topics) {
      const b = labelBox(t, paperR + 2);
      for (const p of papers) {
        if (p.fx != null) continue;   // being dragged
        if (p.x < b.left || p.x > b.right || p.y < b.top || p.y > b.bottom) continue;
        // Exiting below is ruled out where the frame would push the dot back.
        const roomBelow = b.bottom + p.r <= FRAME.h / 2 - EDGE;
        const exits = [p.x - b.left, b.right - p.x, roomBelow ? b.bottom - p.y : Infinity];
        const i = exits.indexOf(Math.min(...exits));
        if (i === 0) p.x = b.left;
        else if (i === 1) p.x = b.right;
        else p.y = b.bottom;
      }
    }
  };
}

// Topic labels are wider than their circles: push topics apart until no label
// overlaps another label or another topic's circle.
function forceTopicLabels(nodes: LayoutNode[]) {
  const topics = nodes.filter((n) => n.kind === 'topic');
  const box = (t: LayoutNode) => {
    const b = labelBox(t, 2);
    return { left: Math.min(b.left, t.x - t.r), right: Math.max(b.right, t.x + t.r), top: t.y - t.r, bottom: b.bottom };
  };
  return () => {
    for (let i = 0; i < topics.length; i++) {
      for (let j = i + 1; j < topics.length; j++) {
        const a = topics[i], b = topics[j];
        const A = box(a), B = box(b);
        const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left);
        const oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
        if (ox <= 0 || oy <= 0) continue;
        // Positional, like forceCollide: each side moves half the overlap.
        const both = a.fx == null && b.fx == null;
        const ka = a.fx != null ? 0 : both ? 0.5 : 1;
        const kb = b.fx != null ? 0 : both ? 0.5 : 1;
        // Resolve along the axis of least overlap.
        if (ox < oy) {
          const s = a.x < b.x ? -ox : ox;
          a.x += s * ka;
          b.x -= s * kb;
        } else {
          const s = a.y < b.y ? -oy : oy;
          a.y += s * ka;
          b.y -= s * kb;
        }
      }
    }
  };
}

export interface SimOptions {
  /** Radius of paper dots (smaller when many are shown at once). */
  paperR?: number;
}

export function createSimulation(nodes: LayoutNode[], links: LayoutLinks, opts: SimOptions = {}) {
  const paperR = opts.paperR ?? PAPER_R;
  const scale = paperR / PAPER_R;
  // Link objects are mutated by d3 (ids → node refs), so copy them.
  const paperLinks = links.paper.map((l) => ({ ...l }));
  const topicLinks = links.topic.map((l) => ({ ...l }));
  const maxShared = Math.max(1, ...topicLinks.map((l) => l.n));

  return forceSimulation<LayoutNode>(nodes)
    .force('avoidLabels', forceAvoidLabels(nodes, paperR))
    .force('topicLabels', forceTopicLabels(nodes))
    // Single-topic papers are held tight to their topic; bridging papers are
    // looser so they can settle between their topics.
    .force('paperLink', forceLink<LayoutNode, any>(paperLinks)
      .id((d) => d.id)
      .distance((l) => l.target.r + (l.bridge ? 30 : 14) * scale)
      .strength((l) => (l.bridge ? 0.25 : 1)))
    // Overlapping topics are pulled together, unrelated ones drift apart.
    // Strength is relative to the largest overlap so it means the same at 30
    // papers and at 1000.
    .force('topicLink', forceLink<LayoutNode, any>(topicLinks)
      .id((d) => d.id)
      .distance((l) => l.source.r + l.target.r + 50)
      .strength((l) => 0.05 + 0.45 * Math.sqrt(l.n / maxShared)))
    .force('charge', forceManyBody<LayoutNode>()
      .strength((d) => (d.kind === 'topic' ? -300 : -35 * scale * scale))
      .distanceMax(140))   // capped so unconnected topics don't get flung away
    // Topics reserve extra room around them for their label.
    .force('collide', forceCollide<LayoutNode>((d) => (d.kind === 'topic' ? d.r + 8 : paperR + 2.5 * scale)).iterations(4))
    .force('x', forceX<LayoutNode>(0).strength(0.05))
    .force('y', forceY<LayoutNode>(0).strength(0.08))   // stronger: keeps the map wider than tall
    .force('frame', forceFrame(nodes));
}

/**
 * Dot radius when `n` papers share the frame with the topics: roughly a
 * third of the frame is given to dots, between 2 and PAPER_R.
 */
export function paperRadiusFor(n: number) {
  if (n <= 0) return PAPER_R;
  const cell = Math.sqrt((FRAME.w * FRAME.h * 0.3) / n);   // side of each dot's share
  return Math.max(2, Math.min(PAPER_R, cell / 2 - 1.5));
}
