const assert = require('assert');
const { readFile } = require('fs/promises');
const { resolve, normalize } = require('path');

const rimraf = require('rimraf');
const { rollup } = require('rollup');

const manifestJson = require('../lib/rollup-plugin-manifest-json.cjs');

const FIXTURE_INPUT_PATH = resolve('./test/fixtures/dummy-manifest.json');
const OUTPUT_PATH = resolve('out/public/manifest.json');

describe(`rollup-plugin-manifest-json`, () => {
  after(async () => await rimraf.sync(`./out/`));

  it(`should throw a 'PLUGIN_ERROR' if no "input" option is supplied`, async () => {
    try {
      await rollIt();
    } catch (err) {
      assert.strictEqual(err.code, 'PLUGIN_ERROR');
    }
  });

  it(`should preserve existing manifest options.`, async () => {
    await rollIt({
      input: FIXTURE_INPUT_PATH,
    });

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-app-name',
      orientation: 'portrait',
    };

    const fixtureData = await readFile(OUTPUT_PATH, `utf-8`);
    const fixtureOutput = JSON.parse(fixtureData);

    assert.strictEqual(JSON.stringify(fixtureOutput), JSON.stringify(expectedResult));
  });

  it(`should update key values that are passed to the plugin.`, async () => {
    await rollIt({
      input: resolve(`./test/fixtures/dummy-manifest.json`),
      manifest: {
        short_name: 'my-new-app-name',
        orientation: 'landscape',
      },
    });

    const fixtureData = await readFile(OUTPUT_PATH, `utf-8`);
    const fixtureOutput = JSON.parse(fixtureData);

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-new-app-name',
      orientation: 'landscape',
    };

    assert.strictEqual(JSON.stringify(fixtureOutput), JSON.stringify(expectedResult));
  });

  it(`should minify output by default`, async () => {
    await rollIt({
      input: resolve(`./test/fixtures/dummy-manifest.json`),
    });

    const fixtureData = await readFile(OUTPUT_PATH, `utf-8`);
    const fixtureOutput = fixtureData;

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-app-name',
      orientation: 'portrait',
    };

    assert.strictEqual(fixtureOutput, JSON.stringify(expectedResult));
  });

  it(`shouldn't minify output when passed the 'minify: false' flag`, async () => {
    await rollIt({
      input: FIXTURE_INPUT_PATH,
      minify: false,
    });

    const fixtureData = await readFile(OUTPUT_PATH, `utf-8`);
    const fixtureOutput = JSON.parse(fixtureData);

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-app-name',
      orientation: 'portrait',
    };

    assert.deepStrictEqual(fixtureOutput, expectedResult);
  });

  it(`should write to whatever filename is provided to param "output" with data`, async () => {
    await rollIt({
      input: FIXTURE_INPUT_PATH,
      output: normalize('new_dir/manifest2.webmanifest'),
    });

    const NEW_OUTPUT_FILE_PATH = resolve('out/new_dir/manifest2.webmanifest');

    const fixtureData = await readFile(NEW_OUTPUT_FILE_PATH, `utf-8`);
    const fixtureOutput = JSON.parse(fixtureData);

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-app-name',
      orientation: 'portrait',
    };

    assert.deepStrictEqual(fixtureOutput, expectedResult);
  });

  it(`should handle assigning deep key values`, async () => {
    await rollIt({
      input: FIXTURE_INPUT_PATH,
      manifest: {
        icons: {
          48: 'icon.png',
          96: 'icon@2x.png',
        },
        related_applications: [
          {
            platform: 'ios',
            url: 'http://example.com',
          },
        ],
      },
    });

    const fixtureData = await readFile(OUTPUT_PATH, `utf-8`);
    const fixtureOutput = JSON.parse(fixtureData);

    const expectedResult = {
      name: 'my-app',
      short_name: 'my-app-name',
      orientation: 'portrait',
      icons: {
        48: 'icon.png',
        96: 'icon@2x.png',
      },
      related_applications: [
        {
          platform: 'ios',
          url: 'http://example.com',
        },
      ],
    };

    assert.deepStrictEqual(fixtureOutput, expectedResult);
  });
});

async function rollIt(manifestOpts = {}) {
  return await rollup({
    input: resolve(`test/fixtures/dummy.js`),
    plugins: [manifestJson(manifestOpts)],
  }).then(async (bundleOutput) => {
    return await bundleOutput.write({
      format: 'esm',
      dir: `./out/`,
    });
  });
}
