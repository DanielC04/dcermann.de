// Strip the trailing slash from BASE_URL so we can append paths cleanly.
// e.g.  BASE_URL="/dcermann.de/"  →  base="/dcermann.de"
//        BASE_URL="/"             →  base=""
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Prefix an absolute-path internal link or public-asset reference with the
 * configured Astro base path so it works under GitHub Pages sub-paths.
 *
 * url('/blog')             → '/dcermann.de/blog'
 * url('/images/foo.jpg')   → '/dcermann.de/images/foo.jpg'
 */
export function url(path: string): string {
  return base + path;
}
