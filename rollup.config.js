import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/plugin.ts',
  output: {
    file: 'lib/rollup-plugin-manifest-json.cjs.js',
    format: 'cjs',
  },
  plugins: [typescript(), terser()],
  external: ['fs', 'path'],
};
