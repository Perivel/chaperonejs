import { UUID, UUIDException } from './../../lib/core';

describe('Generating a UUID', () => {
  it('generates a V1 UUID', () => {
    expect(UUID.V1()).to.be.an('object');
  });

  it('should generate a v3 UUID using a UUID as its namespace', () => {
    expect(UUID.V3('foo', UUID.V4())).to.be.an('object');
  });

  it('should generate a v3 UUID using a string as its namespace', () => {
    expect(UUID.V3('foo', UUID.V4().toString())).to.be.an('object');
  });

  it('should throw an error when the namespace is not a valid UUOD for a V3 UUID.', () => {
    expect(UUID.V3('foo', 'bar')).to.throw(UUIDException);
  });

  it('should generate a V4 UUID', () => {
    expect(UUID.V4()).to.be.an('object');
  });

  it('should generate a V5 UUID', () => {
    expect(UUID.V5('foo', UUID.V4())).to.be.an('object');
  });

  it('should generate a v3 UUID using a string as its namespace', () => {
    expect(UUID.V5('foo', UUID.V4().toString())).to.be.an('object');
  });

  it('should throw an error when the namespace is not a valid UUOD for a V3 UUID.', () => {
    expect(UUID.V5('foo', 'bar')).to.throw(UUIDException);
  });
});

describe('Setting a UUID to an empty string', () => {
  it('should throw an exception', () => {
    expect(new UUID('')).to.throw(UUIDException);
  });
})