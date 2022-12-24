import { Equatable } from '../common';
import { IsoLanguageInterface } from './iso-language.interface';
/**
 * IsoLanguage
 *
 * A utility class representing ISO Language data.
 */
export declare class IsoLanguage implements IsoLanguageInterface, Equatable {
    private readonly _name;
    private readonly _alpha2;
    private readonly _alpha3b;
    private readonly _alpha3t;
    /**
     * Creates a new instance of IsoLanguage.
     * @param nameOrCode The language name or ISO code.
     */
    constructor(nameOrCode: string);
    /**
     * alpha2
     *
     * Gets the alpha2 value.
     */
    get alpha2(): string | null;
    /**
     * alpha3b
     *
     * gets the alpha3b value.
     */
    get alpha3b(): string | null;
    /**
     * alpha3t()
     *
     * gets the alpha3t value.
     */
    get alpha3t(): string | null;
    /**
     * equals()
     *
     * compares the instance to the subject to determine if they are equal.
     * @param suspect the suspect to compare.
     */
    equals(suspect: any): boolean;
    /**
     * name
     *
     * gets the language name.
     */
    get name(): string;
    toString(): string;
}
