import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {RollupOptions} from 'rollup';
import {terser} from "rollup-plugin-terser";
import license from "rollup-plugin-license";
import path from 'path';
import sass from 'rollup-plugin-sass';

const isProd = (process.env.BUILD === 'production');

// noinspection JSUnusedGlobalSymbols
export default {
  input: 'main.ts',
  output: {
    dir: './dist',
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'esm',
    exports: 'default'
  },
  external: ['obsidian'],
  plugins: [
    typescript(),
    nodeResolve({browser: true}),
    commonjs(),
    terser({
      format: {comments: false}
    }),
    sass(),
    license({
      thirdParty: {
        includePrivate: true,
        output: {
          file: path.join(__dirname, 'dist', 'license.txt'),
          encoding: 'utf-8', // Default is utf-8.
        },
      },
    })
  ]
} as RollupOptions