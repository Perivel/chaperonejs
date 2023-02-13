import { Equatable } from "../common";
import { CharacterSetInterface } from "./character-set.interface";
import { CharacterSetValue } from "./charset-values.type";
/**
 * CharacterSet
 *
 * A CharacterSet.
 */
export declare class CharacterSet implements CharacterSetInterface, Equatable {
    private readonly _value;
    constructor(value: CharacterSetValue);
    /**
     * ASCII()
     *
     * Creates a CharacterSet instance set to ASCII.
     * @returns A CharacterSet instance set to ASCII.
     */
    static ASCII(): CharacterSet;
    /**
     * UTF8()
     *
     * Creates a CharacterSet instance set to UTF8.
     * @returns A CharacterSet set to UTF-8.
     */
    static UTF8(): CharacterSet;
    /**
     * value
     *
     * gets the value of the Character Set.
     */
    get value(): CharacterSetValue;
    /**
     * equals()
     *
     * determines if the instance and the suspect are equal.
     * @param suspect the suspect to compare.
     * @returns TRUE if the instance and the suspect are equal. FALSE otherwise.
     */
    equals(suspect: any): boolean;
    toString(): string;
}
//# sourceMappingURL=character-set.d.ts.map