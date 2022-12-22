import { DurationInterface } from "../duration";
import { Timezone } from "../../geography";
export interface DateTimeInterface {
    /**
     * add()
     *
     * add() adds the duration to the datetime.
     * @param duration the duration to add.
     */
    add(duration: DurationInterface): DateTimeInterface;
    /**
     * day()
     *
     * day() gets the day of the month of the DateTime.
     * @returns a number between 1 and 31
     */
    day(): number;
    /**
     * hour()
     *
     * gets the hour.
     * @note hours are zero-based (0-23)
     */
    hour(): number;
    /**
     * isAfter()
     *
     * isAfter() compares the Created instance to the suspect, to determine if the suspect is after the instance.
     * @param suspect The suspect to be compared.
     */
    isAfter(suspect: any): boolean;
    /**
     * isBefore()
     *
     * isBefore() compares the instance to the suspect, to determine if the instance is before the suspect.
     * @param suspect The suspect to be compared to.
     */
    isBefore(suspect: any): boolean;
    /**
     * milisecond()
     *
     * gets the milisecond (0-999)
     */
    milisecond(): number;
    /**
     * minute()
     *
     * gets the minute.
     * @note minutes are zero-based (0-59)
     */
    minute(): number;
    /**
     * month()
     *
     * month() gets the month part of the DateTime.
     * @returns A numeric value (Jan = 1, Dec = 12) representing the month of the year.
     */
    month(): number;
    /**
     * second()
     *
     * gets the second
     * @note seconds are zero-based (0-59)
     */
    second(): number;
    /**
     * subtract()
     *
     * subtract() subtracts a duration form the date time.
     * @param duration the duratin to subtract.
     */
    subtract(duration: DurationInterface): DateTimeInterface;
    /**
     * timezone()
     *
     * timezone() gets the timezone of the DateTime.
     */
    timezone(): Timezone;
    /**
     * toTimezone()
     *
     * toTimezone() converts a DateTime to the specified Timezone.
     * @param timezone
     */
    toTimezone(timezone: Timezone): DateTimeInterface;
    /**
     * toUtc()
     *
     * toUtc() converts a DateTime to UTC.
     */
    toUtc(): DateTimeInterface;
    /**
     * isoString()
     *
     * isoString() gets a UTC string for a DateTime.
     */
    isoString(): string;
    /**
     * value()
     *
     * value() gets the value of the DateTime.
     */
    value(): Date;
    /**
     * year()
     *
     * year() gets the year portion of the DateTime.
     *
     * @returns number
     */
    year(): number;
}
