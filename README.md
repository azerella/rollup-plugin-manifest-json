# rollup-plugin-manifest-json

[![Build Status](https://travis-ci.org/adamzerella/rollup-plugin-manifest-json.svg?branch=master)](https://travis-ci.org/adamzerella/rollup-plugin-manifest-json)

> Rollup plugin to generate a manifest.json file used to tell the browser about your web app.

## Install

```
npm i --save-dev rollup-plugin-manifest-json
```

## Usage

```js
import manifestJson from "rollup-plugin-manifest-json";

export default {
    input: "main.js",
    plugins: [
        manifestJson({
            input: "public/manifest.json", // Required
            minify: true,
            manifest: {
                short_name: "custom-short-name"
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

The `manifest.json` file location  that will be modified and copied into the Rollup build directory.

### minify

_Optional_

Type: `boolean`

Default: `false`

Whether or not to mangle the output file, it's recommended to minify the file as it will reduce the file size.

### manifest

Type: `object`

Default: `{}`

The key values you wish to add or modify to the existing `manifest.json` file. For a full list of key values to use [see here.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

## Contributors

Don't be scared to raise an issue or a pull request! Any contributions, no matter how big or small will land your picture here and be greatly appreciated ❤️

<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="48" height="48" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>
