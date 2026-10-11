/**
 * Force layout shared by the topic map's build-time pass (TopicMap.astro
 * frontmatter) and its live, draggable client-side simulation.
 *
 * Topics are big nodes, papers small ones. Papers are linked to each of their
 * topics; topics that share papers are linked to each other. Papers covering
 * several topics therefore settle between them.
 */
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
} from 'd3-force';

export const PAPER_R = 4.5;
export const LABEL_FONT = 10;

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

export const labelHalfWidth = (label: string) => label.length * LABEL_FONT * 0.3;

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

// Pushes paper dots out of topic label boxes through the nearest side.
function forceAvoidLabels(nodes: LayoutNode[]) {
  const topics = nodes.filter((n) => n.kind === 'topic');
  const papers = nodes.filter((n) => n.kind === 'paper');
  return () => {
    for (const t of topics) {
      const b = labelBox(t, PAPER_R + 2);
      for (const p of papers) {
        if (p.fx != null) continue;   // being dragged
        if (p.x < b.left || p.x > b.right || p.y < b.top || p.y > b.bottom) continue;
        const exits = [p.x - b.left, b.right - p.x, b.bottom - p.y];
        const i = exits.indexOf(Math.min(...exits));
        if (i === 0) p.x = b.left;
        else if (i === 1) p.x = b.right;
        else p.y = b.bottom;
      }
    }
  };
}

export function createSimulation(nodes: LayoutNode[], links: LayoutLinks) {
  // Link objects are mutated by d3 (ids → node refs), so copy them.
  const paperLinks = links.paper.map((l) => ({ ...l }));
  const topicLinks = links.topic.map((l) => ({ ...l }));

  return forceSimulation<LayoutNode>(nodes)
    .force('avoidLabels', forceAvoidLabels(nodes))
    // Single-topic papers are held tight to their topic; bridging papers are
    // looser so they can settle between their topics.
    .force('paperLink', forceLink<LayoutNode, any>(paperLinks)
      .id((d) => d.id)
      .distance((l) => l.target.r + (l.bridge ? 30 : 14))
      .strength((l) => (l.bridge ? 0.25 : 1)))
    // Overlapping topics are pulled together, unrelated ones drift apart.
    .force('topicLink', forceLink<LayoutNode, any>(topicLinks)
      .id((d) => d.id)
      .distance((l) => l.source.r + l.target.r + 46)
      .strength((l) => Math.min(0.15 * l.n, 0.5)))
    .force('charge', forceManyBody<LayoutNode>()
      .strength((d) => (d.kind === 'topic' ? -380 : -35))
      .distanceMax(160))   // capped so unconnected topics don't get flung away
    // Topics reserve extra room around them for their label.
    .force('collide', forceCollide<LayoutNode>((d) => (d.kind === 'topic' ? d.r + 16 : PAPER_R + 3)).iterations(4))
    .force('x', forceX<LayoutNode>(0).strength(0.06))
    .force('y', forceY<LayoutNode>(0).strength(0.1));   // stronger: keeps the map wider than tall
}
