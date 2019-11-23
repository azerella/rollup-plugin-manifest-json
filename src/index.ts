import { readFileSync } from "fs";
import { resolve } from "path";

import { Plugin } from "rollup";
import { PluginOptions, ManifestOptions } from "./index.d";

export default function manifestJson(opts: PluginOptions): Plugin  {
    return {
        name: "manifest-json",
        buildStart() {
            if (opts.input == undefined) {
                throw new Error(`...Looks like you didn't specify an input file chief`);
            }

            let manifestData: ManifestOptions = JSON.parse(readFileSync(resolve(opts.input), `utf-8`));

            Object.assign(manifestData, opts.manifest);

            this.emitFile({
                type: "asset",
                source: opts.minify ? JSON.stringify(manifestData) : JSON.stringify(manifestData, null, 2),
                fileName: "manifest.json",
            })
        }
    }
}