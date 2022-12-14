import { RGBA, RGBAException } from './../../lib/core';

describe('Creating an RGBA instance.', () => {
  const red = new RGBA(255, 0, 0, 1.0);
  const blue = new RGBA(0, 0, 255, 1.0);
  const anotherRed = new RGBA(red.r(), red.g(), red.b(), red.a());

  // make sure everything successfully.
  it('should be an object', () => {
    expect(red).to.be.an('object');
    expect(blue).to.be.an('object');
  });

  // check equality.
  it('should test equality', () => {
    expect(red.equals(anotherRed)).to.be.true;
    expect(red.equals(blue)).to.be.false;
  })

  // check value.
  it('should get the the hex values', () => {
    expect(red.r()).to.equal(255);
    expect(red.g()).to.equal(0);
    expect(red.b()).to.equal(0);
    expect(red.a()).to.equal(1.0);
    expect(() => new RGBA(-1, 0, 0)).throws(RGBAException);
  });

  // test setters.
  let halfAlpha = red.setA(0.5);

  it('should test setters', () => {
    expect(halfAlpha.r()).to.equal(255);
    expect(halfAlpha.g()).to.equal(0);
    expect(halfAlpha.b()).to.equal(0);
    expect(halfAlpha.a()).to.equal(0.5);
    expect(() => halfAlpha.setA(-5)).throws(RGBAException);
    expect(() => halfAlpha.setA(2)).throw(RGBAException);
  });

  halfAlpha = red.setR(100);

  it('should test changes', () => {
    expect(halfAlpha.r()).to.equal(100);
    expect(halfAlpha.g()).to.equal(0);
    expect(halfAlpha.b()).to.equal(0);
    expect(halfAlpha.a()).to.equal(1.0);
    expect(() => halfAlpha.setR(-5)).throws(RGBAException);
    expect(() => halfAlpha.setR(256)).throws(RGBAException);
  })

  halfAlpha = red.setG(50);

  it(`test changes`, () => {
    expect(halfAlpha.r()).to.equal(255);
    expect(halfAlpha.g()).to.equal(50);
    expect(halfAlpha.b()).to.equal(0);
    expect(halfAlpha.a()).to.equal(1.0);
    expect(() => halfAlpha.setG(-1)).throws(RGBAException);
    expect(() => halfAlpha.setG(300)).throws(RGBAException);
  });

  halfAlpha = red.setB(254);

  it('should test changes', () => {
    expect(halfAlpha.r()).to.equal(255);
    expect(halfAlpha.g()).to.equal(0);
    expect(halfAlpha.b()).to.equal(254);
    expect(halfAlpha.a()).to.equal(1.0);
    expect(() => halfAlpha.setB(-1)).throws(RGBAException);
    expect(() => halfAlpha.setB(666)).throws(RGBAException);
  })
});