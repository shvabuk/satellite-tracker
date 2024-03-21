import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { babel } from '@rollup/plugin-babel';
import banner from './banner.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  })
];

const rollupConfig = {
  input: path.resolve(__dirname, `../examples/js/src/index.js`),
  
  output: {
    banner: banner(),
    file: path.resolve(__dirname, `../examples/js/index.js`),
    format: 'umd',
    generatedCode: 'es2015',
    name: 'index',
  },
  plugins,
};

export default rollupConfig;
