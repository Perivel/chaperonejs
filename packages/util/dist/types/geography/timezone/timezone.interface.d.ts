export interface TimezoneInterface {
    /**
     * TimezoneInterface
     */
    readonly abbreviation: string;
    /**
     * id()
     *
     * gets the timezone id.
     */
    readonly id: string;
    /**
     * utcOffset()
     *
     * gets the UTC offset.
     */
    readonly utcOffset: number;
}
