import ts from 'rollup-plugin-ts';
import { resolve } from "path";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import polyfills from "rollup-plugin-polyfill-node";
import { terser } from "rollup-plugin-terser";

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

export default {
    input: resolve(__dirname, "./lib/core.ts"),
    treeshake: true,
    preserveEntrySignatures: true,
    external: deps,
    output: [{
        format: 'esm',
        file: resolve('dist/esm.js'),
    },
    {
        format: 'cjs',
        file: resolve('dist/c.js')
    }],
    plugins: [
        del({
            targets: ['./dist']
        }),
        polyfills(),
        nodeResolve(),
        ts(),
        commonjs(),
        json(),
        terser({
            format: {
                comments: true
            }
        })
    ]
};