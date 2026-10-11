/**
 * Broad research topics for the "What I read about" map on /papers.
 *
 * Paper tags are fine-grained and often redundant (`ai-safety` + `alignment`),
 * so each tag is folded into one topic here. A paper belongs to every topic
 * any of its tags maps to; papers that land in several topics are drawn
 * between them, which is how the map shows overlap.
 *
 * When you add a paper with a new tag, map the tag here — unmapped tags are
 * logged as a build warning. Map a tag to `null` to ignore it deliberately.
 */

export interface Topic {
  id: string;
  label: string;
}

export const topics: Topic[] = [
  { id: 'ai-safety', label: 'AI Safety & Ethics' },
  { id: 'ml',        label: 'Machine Learning'   },
  { id: 'health',    label: 'Health & Bio'       },
  { id: 'networks',  label: 'Graphs & Networks'  },
  { id: 'software',  label: 'Software & Systems' },
  { id: 'chemistry', label: 'Chemistry'          },
  { id: 'finance',   label: 'Finance'            },
  { id: 'fiction',   label: 'Fiction'            },
];

export const tagToTopic: Record<string, string | null> = {
  // AI safety & ethics
  'ai-safety':        'ai-safety',
  'alignment':        'ai-safety',
  'ethics':           'ai-safety',
  'interpretability': 'ai-safety',
  'existential-risk': 'ai-safety',

  // Machine learning
  'machine-learning':       'ml',
  'deep-learning':          'ml',
  'nlp':                    'ml',
  'transformers':           'ml',
  'attention':              'ml',
  'scaling':                'ml',
  'llm':                    'ml',
  'reinforcement-learning': 'ml',
  'federated-learning':     'ml',

  // Health & life sciences
  'healthcare':            'health',
  'biomedical':            'health',
  'epidemiology':          'health',
  'ehr':                   'health',
  'clinical-ai':           'health',
  'omop':                  'health',
  'mrsa':                  'health',
  'infection-control':     'health',
  'hospital-epidemiology': 'health',
  'biosecurity':           'health',
  'protein-design':        'health',
  'synthetic-biology':     'health',

  // Graphs & networks
  'graph-theory':     'networks',
  'network-analysis': 'networks',

  // Software & systems
  'software':      'software',
  'python':        'software',
  'mlops':         'software',
  'data-platform': 'software',

  // Chemistry
  'chemistry':     'chemistry',
  'nanomaterials': 'chemistry',
  'quantum-dots':  'chemistry',

  // Finance
  'finance':              'finance',
  'quantitative-finance': 'finance',
  'options-pricing':      'finance',
  'market-efficiency':    'finance',
  'stochastic-calculus':  'finance',

  // Fiction
  'fiction':            'fiction',
  'historical-fiction': 'fiction',

  // Too generic to be a topic
  'empirical': null,
};

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
