import { CharacterSet } from './../../lib/core';

describe('Generating CharacterSet instances', () => {
  it('generate a UTF8 instance from value', () => {
    expect(new CharacterSet('UTF-8')).to.be.an('object')
  });

  it('should generate a UTF-8 instance from the factory function.', () => {
    expect(CharacterSet.UTF8()).to.be.an('object');
  });

  it('generate a ASCII instance from value', () => {
    expect(new CharacterSet('ASCII')).to.be.an('object')
  });

  it('should generate a ASCII instance from the factory function.', () => {
    expect(CharacterSet.ASCII()).to.be.an('object');
  });

  it('generate a ANSI instance from value', () => {
    expect(new CharacterSet('ANSI')).to.be.an('object')
  });

  it('generate a 8859 instance from value', () => {
    expect(new CharacterSet('8859')).to.be.an('object')
  });
});