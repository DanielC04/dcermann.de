/**
 * generate-paper-coords.mjs
 *
 * Reads src/content/papers/*.md, builds one-hot tag vectors per paper,
 * reduces to 2D via PCA (power iteration, no ML deps), and writes
 * src/data/paper-coords.json.
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root      = path.resolve(__dirname, '..');
const papersDir = path.join(root, 'src/content/papers');
const outFile   = path.join(root, 'src/data/paper-coords.json');

// ── 1. Read papers ────────────────────────────────────────────────────────────

const files = fs.readdirSync(papersDir).filter(f => f.endsWith('.md'));

const papers = files
  .map(file => {
    const raw            = fs.readFileSync(path.join(papersDir, file), 'utf8');
    const { data, content } = matter(raw);
    return {
      title:   data.title  ?? '',
      slug:    file.replace(/\.md$/, ''),
      hasPage: content.trim().length > 0,   // true when reading notes exist
      tags:    Array.isArray(data.tags) ? data.tags : [],
      status:  data.status ?? 'to-read',
      year:    data.year   ?? 0,
      tldr:    data.tldr   ?? '',
      draft:   data.draft  ?? false,
    };
  })
  .filter(p => p.title && !p.draft);

if (papers.length === 0) {
  console.warn('[paper-coords] no papers found — writing empty array');
  fs.writeFileSync(outFile, '[]');
  process.exit(0);
}

// ── 2. One-hot tag vectors ────────────────────────────────────────────────────

const allTags = [...new Set(papers.flatMap(p => p.tags))].sort();

function oneHot(tags) {
  return allTags.map(t => (tags.includes(t) ? 1 : 0));
}

const X = papers.map(p => oneHot(p.tags));   // shape: n_papers × n_tags

// ── 3. PCA — power iteration on the covariance matrix ────────────────────────

function pca3d(data) {
  const n = data.length;
  const d = data[0].length;

  if (n < 2 || d < 2) {
    return data.map((_, i) => ({ x: i / Math.max(n - 1, 1), y: 0, z: 0 }));
  }

  // Centre the data
  const mean = Array(d).fill(0);
  for (const row of data) row.forEach((v, i) => { mean[i] += v; });
  mean.forEach((_, i) => { mean[i] /= n; });
  const Xc = data.map(row => row.map((v, i) => v - mean[i]));

  // Covariance matrix  C = Xc^T Xc / (n-1)   [d × d]
  const C = Array.from({ length: d }, () => Array(d).fill(0));
  for (const row of Xc) {
    for (let i = 0; i < d; i++)
      for (let j = i; j < d; j++) {
        C[i][j] += row[i] * row[j];
        C[j][i] += row[i] * row[j];
      }
  }
  const denom = Math.max(n - 1, 1);
  for (let i = 0; i < d; i++)
    for (let j = 0; j < d; j++)
      C[i][j] /= denom;

  // Helpers
  function matVec(A, v) {
    return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0));
  }
  function normalize(v) {
    const len = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    return len > 1e-10 ? v.map(x => x / len) : v;
  }

  // Power iteration for the k-th eigenvector, deflated against previous ones
  function eigenvector(A, deflate = []) {
    // Deterministic seed to avoid sign flips across runs
    let v = A.map((_, i) => Math.sin(i + 1));
    v = normalize(v);

    for (let iter = 0; iter < 3000; iter++) {
      let Av = matVec(A, v);
      for (const prev of deflate) {
        const dot = prev.reduce((s, x, i) => s + x * Av[i], 0);
        Av = Av.map((x, i) => x - dot * prev[i]);
      }
      v = normalize(Av);
    }
    return v;
  }

  const e1 = eigenvector(C, []);
  const e2 = eigenvector(C, [e1]);
  const e3 = eigenvector(C, [e1, e2]);

  // Project centred data onto the three principal components
  return Xc.map(row => ({
    x: row.reduce((s, v, i) => s + v * e1[i], 0),
    y: row.reduce((s, v, i) => s + v * e2[i], 0),
    z: row.reduce((s, v, i) => s + v * e3[i], 0),
  }));
}

const raw2d = pca3d(X);

// ── 4. Normalise to the range [-0.8, 0.8] ────────────────────────────────────

const xs     = raw2d.map(c => c.x);
const ys     = raw2d.map(c => c.y);
const zs     = raw2d.map(c => c.z);
const xMin   = Math.min(...xs), xMax = Math.max(...xs);
const yMin   = Math.min(...ys), yMax = Math.max(...ys);
const zMin   = Math.min(...zs), zMax = Math.max(...zs);
const xRange = xMax - xMin || 1;
const yRange = yMax - yMin || 1;
const zRange = zMax - zMin || 1;

const result = papers.map((p, i) => ({
  title:   p.title,
  slug:    p.slug,
  hasPage: p.hasPage,
  tags:    p.tags,
  status:  p.status,
  year:    p.year,
  tldr:    p.tldr,
  x: ((raw2d[i].x - xMin) / xRange) * 1.6 - 0.8,
  y: ((raw2d[i].y - yMin) / yRange) * 1.6 - 0.8,
  z: ((raw2d[i].z - zMin) / zRange) * 1.6 - 0.8,
}));

// Shift so the centroid of the paper cloud sits exactly at the origin.
// This ensures the coordinate axes cross at the visual centre of the cluster.
const cx = result.reduce((s, p) => s + p.x, 0) / result.length;
const cy = result.reduce((s, p) => s + p.y, 0) / result.length;
const cz = result.reduce((s, p) => s + p.z, 0) / result.length;
result.forEach(p => { p.x -= cx; p.y -= cy; p.z -= cz; });

// ── 5. Write output ───────────────────────────────────────────────────────────

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(`[paper-coords] wrote ${result.length} papers → src/data/paper-coords.json`);
