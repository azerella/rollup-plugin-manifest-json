import { readFileSync } from "fs";
import { resolve, basename } from "path";

import { Plugin, OutputBundle, OutputOptions } from "rollup";
import { PluginOptions } from "./index.d";

const PLUGIN_REGEX_PATTERN: string = `MANIFEST_REGEXP`;

export default function manifestJson(opts: PluginOptions): Plugin  {
    let manifestData: string;
    const manifestInput = {};

    return {
        name: "manifest-json",
        buildStart() {
            if (opts.input == undefined) {
                throw new Error(`...Looks like you didn't specify an input file chief`);
            }

            Object.assign(manifestInput, opts.input);
            manifestData = readFileSync(resolve(opts.input), `utf-8`);

            const assetList = findAssets(manifestData);

            // Emit assets
            if (assetList.length > 0){
                assetList.forEach(it => {
                    const refId = this.emitFile({
                        type: "asset",
                        source: readFileSync(resolve(it)),
                        fileName: basename(it)
                    });

                    manifestData = manifestData.replace(it, `${PLUGIN_REGEX_PATTERN}_${refId}`);
                });
            };
        },
        generateBundle(bundleOptions: OutputOptions, bundle: OutputBundle) {
            // Rewrite regex match paths with `this.getFileName(refId)`
            // before we parse.

            manifestData = JSON.parse(manifestData);

            // // Emit manifest.json
            this.emitFile({
                type: "asset",
                source: opts.minify ? JSON.stringify(manifestData) : JSON.stringify(manifestData, null, 2),
                fileName: "manifest.json",
            })
        }
    }
}

/**
 * Return a list of asset file names, more than likely images.
 */
function findAssets(manifestData: string): string[] {
    const result: string[] = [];

    Object.values(JSON.parse(manifestData))
        .forEach(it => {
            if (Array.isArray(it) ) {
                it.forEach(ele => {
                    /**
                     * TODO Handle other assets types from the MDN manifest.json spec.
                     */
                    result.push(ele.src);
                })
            }
        });

    return result;
}