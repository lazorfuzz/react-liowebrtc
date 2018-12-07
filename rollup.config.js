import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import url from 'rollup-plugin-url'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  external: ['liowebrtc'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    builtins(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      babelrc: false,
      presets: [
        ['env', {
          modules: false
        }],
        'stage-0',
        'react'
      ]
    }),
    resolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
}
