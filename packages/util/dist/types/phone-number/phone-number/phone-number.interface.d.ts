export interface PhoneNumberInterface {
    /**
     * canBeInternationallyDialed
     *
     * determines if the phone number can be internationally dialed.
     *
     * @returns TRUE if the number can be internationally dialed. Otherwise, it returns FALSE.
     */
    readonly canBeInternationallyDialed: boolean;
    /**
     * countryCode
     *
     * gets the phone number's country code.
     */
    readonly countryCode: string;
    /**
     * equals()
     *
     * equals() compares the phone number to the suspect, to determine if they are equal.
     * @param suspect the suspect being confirmed.
     */
    equals(suspect: any): boolean;
    /**
     * e164
     *
     * gets the e164 phone number format.
     */
    readonly e164: string;
    /**
     * international
     *
     * gets the international number.
     */
    readonly international: string;
    /**
     * isMobile
     *
     * determines if a phone number is mobile.
     */
    readonly isMobile: boolean;
    /**
     * national
     *
     * gets the national phone number.
     */
    readonly national: string;
    /**
     * rfc3966
     *
     * gets the rfc3966 number.
     */
    readonly rfc3966: string;
    /**
     * regionCode
     *
     * gets the phone number's region code.
     */
    readonly regionCode: string;
    /**
     * significant
     *
     * gets the significant number of the phone number.
     */
    readonly significant: string;
    /**
     * value
     *
     * gets the raw phone number.
     */
    readonly value: string;
}
