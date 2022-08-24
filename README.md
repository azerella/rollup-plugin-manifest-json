# rollup-plugin-manifest-json

[![CI](https://github.com/azerella/rollup-plugin-manifest-json/actions/workflows/CI.yml/badge.svg)](https://github.com/azerella/rollup-plugin-manifest-json/actions/workflows/CI.yml)


Rollup plugin that generates a [web application manifest](https://w3c.github.io/manifest/#using-a-link-element-to-link-to-a-manifest) file. This file contains the startup parameters and application defaults when a web application is launched.

## Install

```sh
# NPM
npm i --save-dev rollup-plugin-manifest-json

# Yarn
yarn add -D rollup-plugin-manifest-json
```

## Usage

```js
import manifestJSON from "rollup-plugin-manifest-json";

export default {
    input: "main.js",
    plugins: [
        ...
        manifestJSON({
            input: "public/manifest.json", // Required
            // minify: true
            // output: "public/manifest.webmanifest"
            manifest: {
                short_name: "different-short-name"
            }
        })
    ]
}
```

## Options

### input

**Required**

Type: `string`

Default: `""`

The web application manifest file location that will be either cloned or modified and moved into the Rollup build directory.

### minify

_Optional_

Type: `boolean`

Default: `true`

Whether or not to mangle the output file, it's recommended to minify the file as it will reduce the file size.

### manifest

_Optional_

Type: `object`

Default: `{}`

The key values you wish to add or modify given the existing web application manifest file. For a full list of key values to use [see here.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

### output

_Optional_

Type: `string`

Default: `public/manifest.json`

Output directory to write the manifest file to, useful for building your app outside of the root rollup folder.

## Contributors

Don't be scared to raise an issue or a pull request! 

Any contributions, no matter how big or small will land your picture here and be greatly appreciated ❤️

<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="48" height="48" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
  <a href="https://github.com/benmccann"><img width="48" height="48" src="https://avatars1.githubusercontent.com/u/322311?s=460&u=4303e3b2c87b6eab07d258faf5090deedef4550b&v=4" alt="Ben McCann"/></a>
</div>

[npm-version-badge]:https://img.shields.io/npm/v/rollup-plugin-manifest-json