import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default{
    input: "index.ts",
    output: [
        { file: "lib/rollup-plugin-manifest-json.cjs.js", format: "cjs" },
        { file: "lib/rollup-plugin-manifest-json.es.js", format: "esm" }
    ],
    plugins: [
        typescript(),
        babel({
            presets: [
                "@babel/preset-env"
            ]
        }),
        terser()
    ],
    external: [ "fs" ]
}