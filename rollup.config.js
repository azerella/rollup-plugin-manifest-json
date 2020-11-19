import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default{
    input: "src/index.ts",
    output: {
      file: "lib/rollup-plugin-manifest-json.cjs.js",
      format: "cjs"
    },
    plugins: [
        typescript(),
        babel({
            presets: [
                "@babel/preset-env"
            ]
        }),
        terser()
    ],
    external: [ "fs", "path" ]
}