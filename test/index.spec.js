const assert = require("assert");
const { existsSync } = require('fs');
const { readFile } = require("fs").promises;
const { resolve, normalize, } = require("path");

const rimraf = require("rimraf");
const { rollup } = require("rollup");

const manifestJson = require("../lib/rollup-plugin-manifest-json.cjs");

describe(`rollup-plugin-manifest-json`, () => {

    after(async () => await rimraf.sync(`./out/`));

    it(`should throw a 'PLUGIN_ERROR' if an input file is not spplied`, async () => {
      try {
        await rollIt({
            input: undefined
        });
        assert.fail();
      } catch (err) {
        assert.strictEqual(err.code, 'PLUGIN_ERROR');
      }
    });

    it(`should preserve existing manifest options.`, async () => {
        await rollIt({
            input: normalize(`./test/fixtures/dummy-manifest.json`)
        });

        let fixtureOutput = JSON.parse(await readFile(resolve(`out/manifest.json`), `utf-8`));

        return await assert.strictEqual(JSON.stringify(fixtureOutput), JSON.stringify({
            name: "my-app",
            short_name: "my-app-name",
            orientation: "portrait"
        }));
    });

    it(`should update key values that are passed to the plugin.`, async () => {
        await rollIt({
            input: resolve(`./test/fixtures/dummy-manifest.json`),
            manifest: {
                short_name: "my-new-app-name",
                orientation: "landscape"
            }
        })

        let fixtureOutput = JSON.parse(await readFile(resolve(`out/manifest.json`), `utf-8`));

        return await assert.strictEqual(JSON.stringify(fixtureOutput), JSON.stringify({
            name: "my-app",
            short_name: "my-new-app-name",
            orientation: "landscape"
        }));
    });

    it(`should minify output when passed the 'minify: true' flag`, async () => {
        await rollIt({
            input: resolve(`./test/fixtures/dummy-manifest.json`),
            minify: true
        })

        let fixtureOutput = await readFile(resolve(`out/manifest.json`), `utf-8`);

        return await assert.strictEqual(fixtureOutput, JSON.stringify({
            name: "my-app",
            short_name: "my-app-name",
            orientation: "portrait"
        }));
    });

    it(`shouldn't minify output when passed the 'minify: false' flag`, async () => {
        await rollIt({
            input: normalize(`./test/fixtures/dummy-manifest.json`),
            minify: false
        })

        let fixtureOutput = await readFile(resolve(`out/manifest.json`), `utf-8`);

        return await assert.deepStrictEqual(JSON.parse(fixtureOutput), {
            name: "my-app",
            short_name: "my-app-name",
            orientation: "portrait"
        });
    });

    it(`should handle assigning deep key values`, async () => {
        await rollIt({
            input: normalize(`./test/fixtures/dummy-manifest.json`),
            minify: false,
            manifest: {
                icons: {
                    48: "icon.png",
                    96: "icon@2x.png"
                }
            }
        })

        let fixtureOutput = await readFile(normalize(`out/manifest.json`), `utf-8`);

        return await assert.deepStrictEqual(JSON.parse(fixtureOutput), {
            name: "my-app",
            short_name: "my-app-name",
            orientation: "portrait",
            icons: {
                48: "icon.png",
                96: "icon@2x.png"
            }
        });
    });

    it(`should emit a manifest file in output directory 'public/'`, async () => {
      await rollIt({
          input: normalize(`./test/fixtures/dummy-manifest.json`),
          output: 'public',
      })

      const fileExists = existsSync(normalize('out/public/manifest.json'));

      assert.ok(fileExists);
  });
});

async function rollIt(manifestOpts = {}) {
    return await rollup({
        input: resolve(`test/fixtures/dummy.js`),
        plugins: [
            manifestJson(manifestOpts)
        ]
    }).then(async bundleOutput => {
        return await bundleOutput.write({
            format: "esm",
            dir: `./out/`
        });
    });
}