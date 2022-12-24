import { Salt } from "./../../lib/core";

describe("Creating a Salt", async () => {
  const manualSalt = new Salt("salt");

  it('should create a valid salt', () => {
    expect(manualSalt.toString()).to.equal('salt');
    expect(manualSalt.value).to.equal("salt");
    expect(manualSalt.equals(new Salt("salt"))).to.equal(true);
  })

  const generatedSalt = await Salt.Generate();
  it('should be equal', () => {
    expect(generatedSalt.equals(manualSalt)).to.be.true
  })
});