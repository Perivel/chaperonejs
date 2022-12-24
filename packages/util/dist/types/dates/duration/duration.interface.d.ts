/**
 * DurationInterface
 *
 * DurationInterface
 */
export interface DurationInterface {
    /**
     * days
     *
     * gets the number of days in the duration.
     */
    readonly days: number;
    /**
     * hours
     *
     * gets the number of hours in the duration.
     */
    readonly hours: number;
    /**
     * inDays()
     *
     * inDays() converts the duration to days.
     */
    inDays(): number;
    /**
     * inHours()
     *
     * inHours() converts the duration to hours.
     */
    inHours(): number;
    /**
     * inMiliseconds()
     *
     * converts the duration to miliseconds.
     */
    inMiliseconds(): number;
    /**
     * inMinutes()
     *
     * inMinutes() converts the duration to minutes.
     */
    inMinutes(): number;
    /**
     * inMonths()
     *
     * inMonths() converts the duration to months.
     */
    inMonths(): number;
    /**
     * inQuarters()
     *
     * inQuarters() converts the duration to quarters.
     */
    inQuarters(): number;
    /**
     * inSeconds()
     *
     * inSeconds() converts a duration to a second.
     */
    inSeconds(): number;
    /**
     * inWeeks()
     *
     * inWeeks() converts the duration to weeks.
     */
    inWeeks(): number;
    /**
     * inYears()
     *
     * inYears() converts the duration to years.
     */
    inYears(): number;
    /**
     * miliseconds
     *
     * gets the miliseconds of the duration.
     */
    readonly miliseconds: number;
    /**
     * minutes
     *
     * gets the minutes of the duration.
     */
    readonly minutes: number;
    /**
     * months
     *
     * gets the months of the duration.
     */
    readonly months: number;
    /**
     * quarters
     *
     * gets the quarters in the duration.
     */
    readonly quarters: number;
    /**
     * seconds
     *
     * gets the seconds of the duration.
     */
    readonly seconds: number;
    /**
     * weeks
     *
     * gets the weeks.
     */
    readonly weeks: number;
    /**
     * years
     *
     * gets the years in the duration.
     */
    readonly years: number;
}
