'use strict';

const system = require('..');
const assert = require('assert').strict;

assert.strictEqual(system(), 'Hello from system');
console.info("system tests passed");
