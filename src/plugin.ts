import { readFileSync } from 'fs';
import { resolve, normalize } from 'path';

import type { Plugin } from 'rollup';
import type { PluginOptions, ManifestOptions } from './types';

export default function manifestJSON(opts: PluginOptions): Plugin {
  return {
    name: 'manifest-json',
    buildStart() {
      const { input = '', manifest = {}, minify = true, output = 'public/manifest.json' } = opts;

      if (!input) {
        throw new Error('No manifest input file supplied. Please specify the `input` paramater.');
      }

      const INPUT_FILE_PATH = resolve(input);
      const manifestData: ManifestOptions = JSON.parse(readFileSync(INPUT_FILE_PATH, `utf-8`));

      Object.assign(manifestData, manifest);

      try {
        this.emitFile({
          type: 'asset',
          source: minify ? JSON.stringify(manifestData) : JSON.stringify(manifestData, null, 2),
          fileName: normalize(output),
        });
      } catch (err) {
        throw new Error('Failed to emit asset file, possibly a naming conflict?');
      }
    },
  };
}
