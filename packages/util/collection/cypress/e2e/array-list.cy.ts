
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { OutOfBoundsException } from '@chaperone/util';
import { ArrayList } from './../../lib/index';

describe("Creating ArrayList instances", () => {
  const list = new ArrayList<number>();
  expect(list).to.be.an('object');
  expect(list.isEmpty).to.be.true;
  expect(list.size).to.equal(0);
  expect(list.get(0)).throws(OutOfBoundsException);
  expect(list.remove(0)).throws(OutOfBoundsException);
});