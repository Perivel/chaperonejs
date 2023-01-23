import { expect } from 'chai';
import {
  Color,
  Hex,
  RGBA
} from './../../lib/core';

describe('Creating Default Colors', () => {
  it('Should create an instance set to black', () => {
    expect(Color.Black()).to.be.an('object');
  });

  it('Should create an instance set to white', () => {
    expect(Color.White()).to.be.an('object');
  });

  it('Should create an instance set to red', () => {
    expect(Color.Red()).to.be.an('object');
  });

  it('Should create an instance set to blue', () => {
    expect(Color.Blue()).to.be.an('object');
  });

  it('Should create an instance set to green', () => {
    expect(Color.Green()).to.be.an('object');
  });
});

describe('Creating custom colors', () => {
  it('should create a custom color instance.', () => {
    const lightBlue = Color.FromRGBA(0, 0, 255, 0.4);
    expect(lightBlue).to.be.an('object');
  });
});

describe('Creating hex values', () => {
  it('should create a hex value', () => {
    const redHex = new Hex('#FF0000FF');
    const red = Color.Red();
    const blue = Color.Blue();
    expect(red.hex.equals(redHex)).to.be.true;
    expect(red.hex.value).to.equal("#FFOOOOFF");
    expect(red.hex.equals(blue)).to.be.false;
  });
});

describe('Creating RGBA colors', () => {
  it('should create an RGBA value', () => {
    const redRGB = new RGBA(255, 0, 0);
    expect(Color.Red().rgba.equals(redRGB)).to.be.true;
  });
});