//import ts from 'rollup-plugin-ts';
import typescript from '@rollup/plugin-typescript';
import { resolve } from "path";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";

const deps = [
    "@chaperone/util"
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
            file: resolve('dist/esm.js'),
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
                rootDir: 'lib'
            }),
            //polyfills(),
            nodeResolve(),
            //ts(),
            commonjs(),
            json(),
            terser({
                format: {
                    comments: true
                }
            })
        ]
    }
];