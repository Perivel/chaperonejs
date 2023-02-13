import { Equatable } from "../../common";
import { PhoneNumberInterface } from "./phone-number.interface";
/**
 * PhoneNumber
 *
 * PhoneNumber represents a phone number.
 */
export declare class PhoneNumber implements PhoneNumberInterface, Equatable {
    private _phoneParser;
    /**
     * Creates a Phone Number instance.
     * @param value The phone number value.
     * @param regionCode The region code of the phone number.
     * @throws PhoneNumverException when the phone number is not valid.
     */
    constructor(value: string, regionCode: string);
    /**
     * canBeInternationallyDialed
     *
     * determines if the phone number can be internationally dialed.
     * @returns TRUE if the number can be internationally dialed. Otherwise, it returns FALSE.
     */
    get canBeInternationallyDialed(): boolean;
    /**
     * countryCode
     *
     * gets the phone number's country code.
     */
    get countryCode(): string;
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
     * gets the phone number in e164 format.
     */
    get e164(): string;
    /**
     * international
     *
     * gets the international number.
     */
    get international(): string;
    /**
     * isMobile
     *
     * determines if a phone number is mobile.
     */
    get isMobile(): boolean;
    /**
     * national
     *
     * gets the national phone number.
     */
    get national(): string;
    /**
     * rfc3966
     *
     * gets the rfc3966 number.
     */
    get rfc3966(): string;
    /**
     * regionCode
     *
     * gets the phone number's region code.
     */
    get regionCode(): string;
    /**
     * significant
     *
     * gets the significant number of the phone number.
     */
    get significant(): string;
    /**
     * value
     *
     * gets the phone number, in international format.
     */
    get value(): string;
    toString(): string;
}
//# sourceMappingURL=phone-number.d.ts.map