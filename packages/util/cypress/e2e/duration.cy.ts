import {
  DateTime,
  Duration
} from './../../lib/core';

describe('Creating a Duration instance', () => {
  const duration = new Duration({
    years: 1,
    months: 6,
  });

  it('should exist', () => {
    expect(duration.years()).to.equal(1);
    expect(duration.quarters()).to.equal(0);
    expect(duration.months()).to.equal(6);
    expect(duration.weeks()).to.equal(0);
    expect(duration.days()).to.equal(0);
    expect(duration.hours()).to.equal(0);
    expect(duration.minutes()).to.equal(0);
    expect(duration.seconds()).to.equal(0);
    expect(duration.miliseconds()).to.equal(0);
    expect(duration.inYears()).to.equal(1.5);
    expect(duration.inQuarters()).to.equal(6);
    expect(duration.inMonths()).to.equal(18);
    expect(duration.inWeeks()).to.equal(78.26625000000001);
    expect(duration.inDays()).to.equal(547.86375);
  });
});

describe('Creating a Duration from two date objects.', () => {
  const firstDate = DateTime.Now();
  const durationToAdd = new Duration({ minutes: 5 });
  const secondDate = firstDate.add(durationToAdd);
  const diff = Duration.FromDateTimeDifference(firstDate, secondDate);

  it('should exist', () => {
    expect(diff.inMinutes()).to.equal(5);
  })
});

describe('converting from one unit to another.', () => {
  const duration = new Duration({
    seconds: 300
  });

  it('should equal 5', () => {
    expect(duration.inMinutes()).to.equal(5);
  });
});