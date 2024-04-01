import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js', // Adjust if your entry file is different
  output: {
    file: 'dist/index.mjs',
    format: 'es',
    banner: '#!/usr/bin/env node', // Preserve the Node shebang
  },
  plugins: [
    // Resolves Node.js modules
    resolve({
      preferBuiltins: true, // Use Node.js built-in modules whenever possible
    }),
    // Converts CommonJS modules to ES6
    commonjs(),
    // Enables importing JSON files
    json(),
    // Optionally minify the output
    terser(),
    // Polyfills for Node.js globals and modules
    globals(),
    builtins(),
  ],
  // Indicate which modules should be treated as external
  external: [
    'fs',
    'path',
    'inquirer', // Node.js builtins and other externals you don't want to bundle
  ],
};
