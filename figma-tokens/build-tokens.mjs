#!/usr/bin/env node
/**
 * build-tokens.mjs
 * Run Style Dictionary to transform tokens.json → CSS vars + JS
 *
 * Usage:  npm run tokens:build
 */

import StyleDictionary from 'style-dictionary'
import config          from '../tokens/style-dictionary.config.mjs'

const sd = new StyleDictionary(config)

console.log('🔨  Building tokens...\n')

await sd.buildAllPlatforms()

console.log('\n✅  Output files:')
console.log('    tokens/output/css/variables.css        ← all tokens')
console.log('    tokens/output/css/variables.light.css  ← light mode (semantics)')
console.log('    tokens/output/css/variables.dark.css   ← dark mode  (semantics)')
console.log('    tokens/output/js/tokens.mjs            ← ESM exports')
console.log('    tokens/output/js/tokens.flat.mjs       ← flat ESM exports')
console.log('    tokens/output/tokens.resolved.json     ← resolved JSON\n')

console.log('▶   Next: import tokens/output/css/variables.css in your Next.js app')
