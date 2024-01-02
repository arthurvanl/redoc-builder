import { defineConfig } from "tsup";

export default defineConfig({
    // Outputs `dist/a.js` and `dist/b.js`.
    name: 'tsup',
    entry: [
        "src/index.ts",
        "src/builders/info.ts",
        "src/builders/parameter.ts",
        "src/builders/path.ts",
        "src/builders/property.ts",
        "src/builders/redoc.ts",
        "src/builders/request_body.ts",
        "src/builders/response.ts",
        "src/builders/schema.ts",
        "src/builders/server.ts",
        "src/builders/tag.ts",
        "src/builders/utils.ts",
        "src/types/index.ts"
    ],
    // Outputs `dist/foo.js` and `dist/bar.js`
    // entry: {
    //   foo: 'src/a.ts',
    //   bar: 'src/b.ts',
    // },
    dts: {
        resolve: true,
        entry: ['src/index.ts', "src/types/index.ts"]
    },
    splitting: false,
    clean: true,
    // target: /* what tsconfig specifies */,
    // format: ['esm', 'cjs'],
    format: 'esm',
    sourcemap: false,
})
