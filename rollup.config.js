import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [{
  input: 'src/scroller.js',
  output: {
    name: 'SimpleScroller',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    eslint({
      exclude: [
        'node/modules/**',
        'dist/**'
      ]
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
    uglify()
  ]
}, {
  input: 'src/scroller.js',
  external: ['ms'],
  output: [{
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    babel({
      exclude: ['node_modules/**']
    })
  ]
}];