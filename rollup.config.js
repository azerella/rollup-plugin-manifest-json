import manifestPlugin from "./lib/plugin";

export default{
    input: "test/input.js",
    output: {
        format: "esm",
        dir: "dist"
    },
    plugins: [
        manifestPlugin({
            input: "test/mock.manifest.json",
            minify: false,
            manifest: {
                name: "replaced",
                short_name: "abs",
                display: "asd"
            }
        })
    ]
}