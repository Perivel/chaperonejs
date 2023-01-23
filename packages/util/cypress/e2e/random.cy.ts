import { expect } from 'chai';
import { Random } from './../../lib/core';

describe('Generating random numbers', () => {
  expect(Random.Integer(0, 10)).to.be.an('number').above(0).and.below(10);
  expect(Random.Float(10.0, 100.0)).to.be.an('number').above(10.0).and.below(100.0);
});

describe('Generating Random strings', () => {
  let str = Random.Alpha(5);
  expect(str.length).to.equal(5);
  str = Random.AlphaNumeric(3);
  expect(str.length).to.equal(3);
});