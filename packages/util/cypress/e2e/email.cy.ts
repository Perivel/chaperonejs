import { EmailAddress, EmailAddressException } from './../../lib/core';

describe("Creating a Valid Email Address.", () => {
  const email = new EmailAddress("example@gmail.com");

  it('should be a valid email object', () => {
    expect(email).to.be.an('object');
    expect(email.domainName()).to.equal("gmail.com");
    expect(email.username()).to.equal('example');
    expect(email.value()).to.equal('example@gmail.com');
  })
});

describe("Creating an invalid email should throw an exception", () => {
  it('should throw an exception', () => {
    expect(() => new EmailAddress("")).to.throw(EmailAddressException);
    expect(() => new EmailAddress("Foo")).to.throw(EmailAddressException);
  });
});

describe("Email address equality.", () => {
  const firstEmail = new EmailAddress("example@example.com");
  const sameEmail = new EmailAddress("example@example.com");
  const sameInstance = firstEmail;
  const secondEmail = new EmailAddress("foo@bar.com");

  it('should get the components of the email address', () => {
    expect(firstEmail.equals(sameEmail)).to.be.true;
    expect(firstEmail.equals(sameInstance)).to.be.true;
    expect(firstEmail.equals(secondEmail)).to.be.false;
  });
});