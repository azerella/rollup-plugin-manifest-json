import { readFileSync } from "fs";

import { Plugin } from "rollup";

declare enum DisplayType {
    FULLSCREEN = "fullscreen",
    STANDALONE = "standalone",
    MINIMAL_UI = "minimal-ui",
    BROWSER = "browser"
}

declare enum OrientationType {
    ANY = "any",
    NATURAL = "natural",
    LANDSCAPE = "landscape",
    LANDSCAPE_PRIMARY = "landscape-primray",
    LANDSCAPE_SECONDARY = "landscape-secondary",
    PORTRAIT = "portrait",
    PORTRAIT_PRIMARY = "portrait-primary",
    PORTRAIT_SECONDARY = "portrait-secondary"
}

declare interface ManifestIcon {
    src: string,
    type: string,
    sizes: string
}

declare interface ManifestRelatedApp {
    platform: string,
    url: string
}

declare interface ManifestOptions {
    short_name?: string,
    name?: string,
    start_url?: string,
    display?: DisplayType,
    background_color?: string,
    description?: string,
    icons?: ManifestIcon[],
    related_applications?: ManifestRelatedApp[],
    orientation?: OrientationType
    scope?: string,
    theme_color?: string
}

declare interface PluginOptions {
    input: string,
    minify?: boolean,
    manifest?: ManifestOptions
}

export default function manifestJson(opts: PluginOptions): Plugin  {
    return {
        name: "manifest-json",
        buildStart() {
            if (opts.input == undefined) {
                throw new Error(`Please specifiy an input file`)
            }

            let manifestData: ManifestOptions = JSON.parse(readFileSync(opts.input, `utf-8`));

            for (let key in manifestData) {
                if (Object(opts.manifest).hasOwnProperty(key)){
                    Object(manifestData)[key] = Object(opts.manifest)[key]
                } 
                else {
                    // Add key value to manifestData
                }
            }

            this.emitFile({
                type: "asset",
                source: opts.minify ? JSON.stringify(JSON.parse(manifestData.toString())) : JSON.stringify(manifestData, null, 2),
                fileName: "manifest.json",
            })
        }
    }
}