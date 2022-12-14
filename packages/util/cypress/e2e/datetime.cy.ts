import {
  DateTime,
  Timezone,
  Duration,

} from './../../lib/core';
import { DateTime as LuxonDT, Duration as LuxonDuration } from 'luxon';

describe('Create a DateTime from an existing date.', () => {
  it('should create a valid DateTime instance from an existing date', () => {
    const lux = LuxonDT.utc();
    expect(lux.isValid).to.be.true;
    const utcDate = lux.toJSDate();
    expect(utcDate).to.be.an('Date');
    const dt = DateTime.FromDate(utcDate, Timezone.UTC());
    expect(dt).to.be.an('object');
    expect(dt.value()).to.equal(utcDate);
  });
});

describe('Generating a DateTime Object', () => {
  it('should be defined', () => {
    const dt = DateTime.Now();
    expect(dt).to.be.an('object')
  });
});

describe('Adding and Subtracting dates', () => {
  const luxonDate = LuxonDT.fromObject({
    year: 1994,
    month: 10,
    day: 15,
    hour: 14,
    minute: 35,
    second: 0,
    millisecond: 0,
  }, {
    zone: 'utc'
  });
  const initialDate = luxonDate.toJSDate();
  const dt = DateTime.FromDate(initialDate, Timezone.UTC());

  const addedDate = luxonDate.plus(LuxonDuration.fromObject({ days: 1 })).toJSDate();
  const addedDatesDt = dt.add(new Duration({ days: 1 }));

  it('should add one day', () => {
    expect(addedDatesDt.value()).to.equal(addedDate);
  });

  const subtractedDaysDt = addedDatesDt.subtract(new Duration({ days: 1 }));

  it('should subtract one day', () => {
    expect(subtractedDaysDt.value()).to.equal(initialDate);
  });

  const newDate = luxonDate.plus(LuxonDuration.fromObject({ months: 1 })).toJSDate();
  const newMonthDt = dt.add(new Duration({ months: 1 }));

  it('should add a full month', () => {
    expect(newMonthDt.value()).to.equal(newDate);
  });

  const subtractMonthDt = newMonthDt.subtract(new Duration({ months: 1 }));
  it('should subtract a full month', () => {
    expect(subtractMonthDt.value()).to.equal(initialDate);
  });
});

describe("Getting date comonents", () => {
  const luxonDate = LuxonDT.fromObject({
    year: 2020,
    month: 6,
    day: 10,
    hour: 5,
    minute: 30,
    second: 0,
    millisecond: 0,
  }, {
    zone: 'utc'
  });
  const date = luxonDate.toJSDate();
  const dt = DateTime.FromDate(date, Timezone.UTC());

  it('should get the date components', () => {
    expect(dt.month()).to.equal(6);
    expect(dt.day()).to.equal(10);
    expect(dt.year()).to.equal(2020);
    expect(dt.hour()).to.equal(5);
    expect(dt.minute()).to.equal(30);
    expect(dt.second()).to.equal(0);
    expect(dt.milisecond()).to.equal(0);
  });
});

describe('Adding and subtracting months', () => {
  const luxonDate = LuxonDT.fromObject({
    year: 2020,
    month: 3,
    day: 10,
    hour: 5,
    minute: 30,
    second: 0,
    millisecond: 0,
  }, {
    zone: 'utc'
  });
  const initialDate = luxonDate.toJSDate();
  const datetime = DateTime.FromDate(initialDate, Timezone.UTC());
  const futureDate = luxonDate.plus(LuxonDuration.fromObject({ months: 3 })).toJSDate();

  it('should add three months', () => {
    expect(datetime.add(new Duration({ months: 3 })).value()).to.equal(futureDate);
  });

  const pastDate = LuxonDT.fromObject({
    year: 2019,
    month: 12,
    day: 10,
    hour: 5,
    minute: 30,
    second: 0,
    millisecond: 0,
  }, {
    zone: 'utc'
  }).toUTC().toJSDate();

  it('should subtract three months', () => {
    expect(datetime.subtract(new Duration({ months: 3 })).value()).to.equal(pastDate);
  });
});

describe('Adding and subtracting years', () => {
  const luxonDate = LuxonDT.fromObject({
    year: 2019,
    month: 10,
    day: 10,
    hour: 5,
    minute: 30,
    second: 0,
    millisecond: 0,
  }, {
    zone: 'utc'
  });
  const date = luxonDate.toJSDate();
  const dt = DateTime.FromDate(date, Timezone.UTC());
  it('should get the current year', () => {
    expect(dt.year()).to.equal(2019);
  })

  it('should add one year', () => {
    expect(dt.add(new Duration({ years: 1 })).year()).to.equal(2020);
  });

  it('should subtract one year', () => {
    expect(dt.subtract(new Duration({ years: 1 })).year()).to.equal(2018);
  });
});

describe('Date Comparison operations', () => {
  // test equality
  const now = DateTime.Now();
  const alsoNow = DateTime.FromDate(now.value(), now.timezone());
  const yesterday = now.subtract(new Duration({ days: 1 }));
  const tomorrow = now.add(new Duration({ days: 1 }));

  it('test equality', () => {
    expect(now.equals(alsoNow)).to.be.true;
    expect(now.equals(yesterday)).to.be.false;
  });

  //test is after.
  it('tests isAfter()', () => {
    expect(now.isAfter(yesterday)).to.be.true;
    expect(now.isAfter(now)).to.be.false;
    expect(now.isAfter(tomorrow)).to.be.false;
  });

  // test isBefore
  it('should test isBefore()', () => {
    expect(now.isBefore(yesterday)).to.be.false;
    expect(now.isBefore(now)).to.be.false;
    expect(now.isBefore(tomorrow)).to.be.true;
  });
});