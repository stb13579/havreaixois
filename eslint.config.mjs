// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  // This is the equivalent of "extends": "next/core-web-vitals"
  ...nextVitals,

  // React Compiler rules enabled as errors by eslint-config-next 16.4.
  // Downgraded to warnings until the flagged effects are refactored.
  {
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },

  // Optional: override default ignores from eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
