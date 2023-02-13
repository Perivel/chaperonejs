import typescript from '@rollup/plugin-typescript';
import { resolve } from "path";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import polyfills from "rollup-plugin-polyfill-node";
import terser from "@rollup/plugin-terser";

const deps = [
    'colors-convert'
]

//const deps = Object.keys(dependencies);

export default [
    {
        input: resolve(__dirname, "./lib/index.ts"),
        treeshake: true,
        preserveEntrySignatures: true,
        external: deps,
        output: [{
            format: 'esm',
            file: resolve('dist/esm.mjs'),
        },
        {
            format: 'cjs',
            file: resolve('dist/c.cjs')
        }],
        plugins: [
            del({
                targets: ['./dist']
            }),
            typescript({
                declaration: true,
                declarationDir: 'types/',
                rootDir: 'lib',
                target: 'ESNext',
                module: 'ESNext',
                outDir: './dist',
                rootDir: './lib',
                moduleResolution: 'node',
            }),
            polyfills(),
            nodeResolve(),
            commonjs({
                ignoreDynamicRequires: true
            }),
            json(),
            terser({
                format: {
                    comments: true
                }
            })
        ]
    }
];