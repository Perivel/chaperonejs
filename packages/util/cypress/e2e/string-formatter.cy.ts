import { StringFormatter, EmailAddress } from './../../lib/core';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "change-case";

describe("StringFormatter should properly format the input data.", () => {
  const formatter = new StringFormatter();
  const primitiveInput = "I should have Used this_format for the this.method() calls.";
  const stringInstanceInput = new String(primitiveInput);
  const randomObjectInput = new EmailAddress("foo@bar.com");
  const nullInput = null;
  const undefinedInput = undefined;

  // Camel case.
  it('should test camel case.', () => {
    expect(formatter.camelCase(primitiveInput)).to.equal(camelCase(primitiveInput));
    expect(formatter.camelCase(stringInstanceInput)).to.equal(camelCase(primitiveInput));
    expect(formatter.camelCase(randomObjectInput)).to.equal(camelCase(randomObjectInput.toString()));
    expect(formatter.camelCase(nullInput)).to.equal(camelCase(""));
    expect(formatter.camelCase(undefinedInput)).to.equal(camelCase(""));
  });

  // Capital case.
  it('should test capital case', () => {
    expect(formatter.capitalCase(primitiveInput)).to.equal(capitalCase(primitiveInput));
    expect(formatter.capitalCase(stringInstanceInput)).to.equal(capitalCase(primitiveInput));
    expect(formatter.capitalCase(randomObjectInput)).to.equal(capitalCase(randomObjectInput.toString()));
    expect(formatter.capitalCase(nullInput)).to.equal(capitalCase(""));
    expect(formatter.capitalCase(undefinedInput)).to.equal(capitalCase(""));
  });

  // Constant case.
  it('should test constant case', () => {
    expect(formatter.constantCase(primitiveInput)).to.equal(constantCase(primitiveInput));
    expect(formatter.constantCase(stringInstanceInput)).to.equal(constantCase(primitiveInput));
    expect(formatter.constantCase(randomObjectInput)).to.equal(constantCase(randomObjectInput.toString()));
    expect(formatter.constantCase(nullInput)).to.equal(constantCase(""));
    expect(formatter.constantCase(undefinedInput)).to.equal(constantCase(""));
  });

  // dot case.
  it('Should test dot case', () => {
    expect(formatter.dotCase(primitiveInput)).to.equal(dotCase(primitiveInput));
    expect(formatter.dotCase(stringInstanceInput)).to.equal(dotCase(primitiveInput));
    expect(formatter.dotCase(randomObjectInput)).to.equal(dotCase(randomObjectInput.toString()));
    expect(formatter.dotCase(nullInput)).to.equal(dotCase(""));
    expect(formatter.dotCase(undefinedInput)).to.equal(dotCase(""));
  });

  // header case.
  it('should test header case', () => {
    expect(formatter.headerCase(primitiveInput)).to.equal(headerCase(primitiveInput));
    expect(formatter.headerCase(stringInstanceInput)).to.equal(headerCase(primitiveInput));
    expect(formatter.headerCase(randomObjectInput)).to.equal(headerCase(randomObjectInput.toString()));
    expect(formatter.headerCase(nullInput)).to.equal(headerCase(""));
    expect(formatter.headerCase(undefinedInput)).to.equal(headerCase(""));
  });

  // no case.
  it('should test no case', () => {
    expect(formatter.noCase(primitiveInput)).to.equal(noCase(primitiveInput));
    expect(formatter.noCase(stringInstanceInput)).to.equal(noCase(primitiveInput));
    expect(formatter.noCase(randomObjectInput)).to.equal(noCase(randomObjectInput.toString()));
    expect(formatter.noCase(nullInput)).to.equal(noCase(""));
    expect(formatter.noCase(undefinedInput)).to.equal(noCase(""));
  });

  // param case.
  it('should test param case', () => {
    expect(formatter.paramCase(primitiveInput)).to.equal(paramCase(primitiveInput));
    expect(formatter.paramCase(stringInstanceInput)).to.equal(paramCase(primitiveInput));
    expect(formatter.paramCase(randomObjectInput)).to.equal(paramCase(randomObjectInput.toString()));
    expect(formatter.paramCase(nullInput)).to.equal(paramCase(""));
    expect(formatter.paramCase(undefinedInput)).to.equal(paramCase(""));
  });

  // pascal case.
  it('should test pascal case', () => {
    expect(formatter.pascalCase(primitiveInput)).to.equal(pascalCase(primitiveInput));
    expect(formatter.pascalCase(stringInstanceInput)).to.equal(pascalCase(primitiveInput));
    expect(formatter.pascalCase(randomObjectInput)).to.equal(pascalCase(randomObjectInput.toString()));
    expect(formatter.pascalCase(nullInput)).to.equal(pascalCase(""));
    expect(formatter.pascalCase(undefinedInput)).to.equal(pascalCase(""));
  })

  // path case.
  it('should test path case', () => {
    expect(formatter.pathCase(primitiveInput)).to.equal(pathCase(primitiveInput));
    expect(formatter.pathCase(stringInstanceInput)).to.equal(pathCase(primitiveInput));
    expect(formatter.pathCase(randomObjectInput)).to.equal(pathCase(randomObjectInput.toString()));
    expect(formatter.pathCase(nullInput)).to.equal(pathCase(""));
    expect(formatter.pathCase(undefinedInput)).to.equal(pathCase(""));
  })

  // snake case.
  it('should test snake case', () => {
    expect(formatter.snakeCase(primitiveInput)).to.equal(snakeCase(primitiveInput));
    expect(formatter.snakeCase(stringInstanceInput)).to.equal(snakeCase(primitiveInput));
    expect(formatter.snakeCase(randomObjectInput)).to.equal(snakeCase(randomObjectInput.toString()));
    expect(formatter.snakeCase(nullInput)).to.equal(snakeCase(""));
    expect(formatter.snakeCase(undefinedInput)).to.equal(snakeCase(""));
  });
});