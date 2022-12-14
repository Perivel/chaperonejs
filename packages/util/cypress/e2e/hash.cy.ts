import { Hash, Salt } from './../../lib/core';

describe("Creatng a hash", async () => {

  const data = "Some Data to Hash";
  const salt = await Salt.Generate();
  const hash = await Hash.Create(data, salt);

  it('should be a valid hash instance', () => {
    expect(hash).to.be.an('object');
  })
});

describe('Hash equality', async () => {

  const data = "Some Data to Hash";
  const salt = await Salt.Generate();
  const hash = await Hash.Create(data, salt);
  const sameHash = new Hash(hash.value());
  const differentHash = Hash.Create("abc", salt);

  it('should be equal', () => {
    expect(hash.equals(sameHash)).to.equal(true);
  });

  it('should not be equal', () => {
    expect(hash.equals(differentHash)).to.equal(false);
  })
});