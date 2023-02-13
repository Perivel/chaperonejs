//import ts from 'rollup-plugin-ts';
import typescript from '@rollup/plugin-typescript';
import { resolve } from "path";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import polyfills from "rollup-plugin-polyfill-node";
import terser from "@rollup/plugin-terser";
//import copy from 'rollup-plugin-copy';

const deps = [
    'bcryptjs',
    'awesome-phonenumber',
    'change-case',
    'colors-convert',
    'i18n-iso-countries',
    'luxon',
    'ramda',
    'sanitize-html',
    'uuid'
]

//const deps = Object.keys(dependencies);

export default [
    {
        input: resolve(__dirname, "./lib/core.ts"),
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