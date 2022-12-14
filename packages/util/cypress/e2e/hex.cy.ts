import { Hex, HexException } from './../../lib/core';

describe('Testing Hex class', () => {
  const redVal = '#FF0000';
  const red = new Hex(redVal);

  it('should be equal', () => {
    expect(red).to.be.an('object');
    expect(red.value()).to.equal(redVal);
  })

  // instanciate short form hex.
  const shortWhiteVal = '#fff';
  const shortWhite = new Hex(shortWhiteVal);
  
  it('should be valid', () => {
    expect(shortWhite).to.be.an('object');
  })

  // create an invalid hex.
  it('should throw an exception', () => {
    expect(() => new Hex('gggg')).throws(HexException);
  });
});