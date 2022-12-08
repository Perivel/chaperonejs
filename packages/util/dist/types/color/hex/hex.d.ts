import { Equatable, Serializable } from '../../common';
import { HexInterface } from './hex.interface';
/**
 * Hex
 *
 * A Hex color value.
 */
export declare class Hex implements HexInterface, Equatable, Serializable {
    private readonly _value;
    /**
     * Creates a Hex instance.
     * @param value the hex value.
     * @throws HexException when the hex value is invalid.
     */
    constructor(value: string);
    equals(suspect: any): boolean;
    serialize(): string;
    toString(): string;
    /**
     * value()
     *
     * gets the value.
     */
    value(): string;
}
//# sourceMappingURL=hex.d.ts.map