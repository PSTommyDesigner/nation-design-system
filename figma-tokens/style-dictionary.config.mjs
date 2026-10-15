/**
 * style-dictionary.config.mjs
 * Transform tokens/tokens.json → CSS variables + JS exports
 *
 * Usage:  npm run tokens:build
 */

import StyleDictionary from 'style-dictionary'

// ── Custom transform: FLOAT → px string ──────────────────────────────
StyleDictionary.registerTransform({
  name:  'size/px',
  type:  'value',
  filter: (token) =>
    ['fontSize', 'lineHeight', 'letterSpacing', 'spacing',
     'borderRadius', 'dimension', 'number'].includes(token.type) &&
    typeof token.value === 'number',
  transform: (token) => `${token.value}px`,
})

// ── Custom format: flat JS const exports ─────────────────────────────
StyleDictionary.registerFormat({
  name: 'javascript/flat-esm',
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens.map((token) => {
      const key = token.path
        .map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1))
        .join('')
        .replace(/[-/]/g, '')
      return `export const ${key} = ${JSON.stringify(token.value)};`
    })
    return [
      '// Auto-generated do not edit manually',
      '// Source: tokens/tokens.json  (pulled from Figma)',
      '',
      ...lines,
    ].join('\n')
  },
})

// ── Build config ──────────────────────────────────────────────────────
const config = {
  source: ['tokens/tokens.json'],

  platforms: {
    // ── CSS custom properties ─────────────────────────────────────────
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab',
        'size/px',
        'color/css',
      ],
      prefix:    'nation',
      buildPath: 'tokens/output/css/',
      files: [
        {
          // All tokens in one file
          destination: 'variables.css',
          format:      'css/variables',
          options: {
            outputReferences: true,  // keep {alias} references where possible
            selector:         ':root',
          },
        },
        {
          // Light-mode only (semantics)
          destination: 'variables.light.css',
          format:      'css/variables',
          filter:      (token) => token.path[0] === 'light-mode',
          options: {
            outputReferences: true,
            selector:         ':root, [data-theme="light"]',
          },
        },
        {
          // Dark-mode only (semantics)
          destination: 'variables.dark.css',
          format:      'css/variables',
          filter:      (token) => token.path[0] === 'dark-mode',
          options: {
            outputReferences: true,
            selector:         '[data-theme="dark"]',
          },
        },
      ],
    },

    // ── JavaScript ESM exports ────────────────────────────────────────
    js: {
      transforms: [
        'attribute/cti',
        'name/camel',
        'size/px',
        'color/css',
      ],
      buildPath: 'tokens/output/js/',
      files: [
        {
          destination: 'tokens.mjs',
          format:      'javascript/es6',
          options: { outputReferences: false },
        },
        {
          destination: 'tokens.flat.mjs',
          format:      'javascript/flat-esm',
        },
      ],
    },

    // ── JSON (for debugging / other tools) ───────────────────────────
    json: {
      transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css'],
      buildPath: 'tokens/output/',
      files: [
        {
          destination: 'tokens.resolved.json',
          format:      'json/nested',
          options: { outputReferences: false },
        },
      ],
    },
  },
}

export default config
