import { Equatable, Serializable } from '../../common';
import { LocalityInterface } from './locality.interface';
/**
 * Locality
 *
 * Locality represents an Address Locality, or a City or Town.
 */
export declare class Locality implements LocalityInterface, Serializable, Equatable {
    private readonly _name;
    /**
     * Creates a Locality instance.
     * @param name The name of the locality.
     * @throws LocalityException when the locality is invalid.
     */
    constructor(name: string);
    /**
     * Compares the instance to the suspect to determine if they are equal.
     * @param suspect The suspect to compare.
     */
    equals(suspect: any): boolean;
    /**
     * name
     *
     * gets the locality name.
     */
    get name(): string;
    serialize(): string;
    toString(): string;
}
//# sourceMappingURL=locality.d.ts.map