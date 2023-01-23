import { expect } from 'chai';
import { IsoLanguage, IsoLanguageException } from './../../lib/core';

describe("Creating an IsoLanguage instance.", () => {
  const en = new IsoLanguage('en');
  const english = new IsoLanguage("English");

  it('shuld create a valid instance', () => {
    expect(en.alpha2).to.equal('en');
    expect(en.alpha3b).to.equal('eng');
    expect(en.alpha3t).to.be.null;
    expect(en.name).to.equal("English");
    expect(() => new IsoLanguage("xob")).throws(IsoLanguageException);
    expect(en.equals(english));
  });
});