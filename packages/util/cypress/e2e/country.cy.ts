import { expect } from 'chai';
import {
  Country,
  CountryException
} from './../../lib/core';

describe('Creating country instances', () => {
  it('should be defined', () => {
    expect(new Country('US'))
      .to.be.an('object');
  });
});

describe('Instanciating a contry with invalid parameters', () => {
  it('should throw an exception', () => {
    expect(() => new Country('')).to.throw(CountryException);
  });
})