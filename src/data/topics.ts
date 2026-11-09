/**
 * Broad research topics for the "What I read about" map on /papers, plus the
 * curated tag vocabulary.
 *
 * `tagToTopic` is the single source of truth for which tags exist: the
 * content schema (src/content/config.ts) rejects any tag that is not a key
 * here, so an unknown or misspelled tag fails the build. Each tag folds into
 * one topic; a paper belongs to every topic any of its tags maps to, and
 * papers that land in several topics are drawn between them on the map.
 *
 * Vocabulary rules:
 * - Prefer the most specific tag that applies. Topic filters already give the
 *   broad view, so umbrella tags (`machine-learning`, `healthcare`, …) are
 *   only for papers no specific tag fits.
 * - Don't add a tag for a single paper unless it's a filter you'd actually use.
 * - New tag → add it here, mapped to a topic (or `null` to keep it as a
 *   tag-only filter that doesn't count toward any topic).
 */

export interface Topic {
  id: string;
  label: string;
  /** Optional parent grouping for related topics (see `topicGroups`). */
  group?: string;
}

export const topics: Topic[] = [
  { id: 'alignment',        label: 'Alignment',               group: 'ai-safety' },
  { id: 'interpretability', label: 'Interpretability',        group: 'ai-safety' },
  { id: 'ai-risk',          label: 'AI Risk & Futures',       group: 'ai-safety' },
  { id: 'ethics',           label: 'Ethics & Governance',     group: 'ai-safety' },
  { id: 'agents',           label: 'Agents & Multi-Agent',    group: 'ai-safety' },
  { id: 'llm',              label: 'LLMs & Transformers' },
  { id: 'ml',               label: 'Machine Learning' },
  { id: 'health',           label: 'Health & Bio' },
  { id: 'networks',         label: 'Graphs & Networks' },
  { id: 'software',         label: 'Software & Data Systems' },
  { id: 'chemistry',        label: 'Chemistry' },
  { id: 'finance',          label: 'Finance' },
  { id: 'fiction',          label: 'Fiction' },
];

/** Labels for `Topic.group`, for UIs that group related topics. */
export const topicGroups: Record<string, string> = {
  'ai-safety': 'AI Safety',
};

export const tagToTopic: Record<string, string | null> = {
  // AI safety
  'alignment':           'alignment',        // oversight, robustness, value learning, alignment failures
  'interpretability':    'interpretability', // understanding model internals
  'ai-risk':             'ai-risk',          // catastrophic/existential risk, misuse, long-term AI futures
  'ethics':              'ethics',           // moral questions, responsibility, policy
  'ai-agents':           'agents',           // autonomous AI agents (incl. automated researchers)
  'multi-agent-systems': 'agents',           // interacting agents, swarms, collusion

  // Language models
  'llm':          'llm',
  'transformers': 'llm',
  'scaling':      'llm',

  // Machine learning
  'machine-learning':       'ml',
  'deep-learning':          'ml',
  'reinforcement-learning': 'ml',
  'federated-learning':     'ml',

  // Health & life sciences
  'healthcare':        'health',
  'clinical-ai':       'health',
  'ehr':               'health',
  'epidemiology':      'health',
  'infection-control': 'health',
  'biosecurity':       'health',
  'protein-design':    'health',

  // Graphs & networks
  'graphs':            'networks',
  'temporal-networks': 'networks',

  // Software & data systems
  'software':     'software',
  'data-systems': 'software', // databases, data platforms, data structures
  'mlops':        'software',

  // Chemistry
  'chemistry':              'chemistry',
  'nanomaterials':          'chemistry',
  'quantum-dots':           'chemistry',
  'nanoparticle-synthesis': 'chemistry',

  // Finance
  'finance':             'finance',
  'options-pricing':     'finance',
  'stochastic-calculus': 'finance',

  // Fiction
  'fiction':            'fiction',
  'historical-fiction': 'fiction',
};

/** The curated tag vocabulary: every tag a paper may use. */
export const knownTags = Object.keys(tagToTopic);

/** How much a paper adds to a topic's interest score, by reading status. */
export const statusWeight = {
  'read':    1,
  'reading': 0.6,
  'to-read': 0.3,
} as const;

/** Topic ids a paper with these tags belongs to, in `topics` order. */
export function topicIdsForTags(tags: string[]): string[] {
  const ids = new Set(tags.map((t) => tagToTopic[t]).filter(Boolean));
  return topics.map((t) => t.id).filter((id) => ids.has(id));
}
