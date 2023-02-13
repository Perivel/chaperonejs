import { Equatable } from "./../interfaces";
import { RangeInterface } from "./range.interface";
/**
 * Range
 *
 * A numeric range.
 */
export declare class Range implements Equatable, RangeInterface, Iterable<number> {
    readonly start: number;
    readonly stop: number;
    readonly step: number;
    private _arr;
    /**
     * Creates a Range instance.
     * @param start the starting point (inclusive)
     * @param stop the stopping point (inclusive)
     * @param step the step. Defaults to 1.
     * @throws RangeException when either start is greater than stop while step is greaer than 0. Or, when step === 0
     */
    constructor(start: number, stop: number, step?: number);
    [Symbol.iterator](): Iterator<number, number | undefined, number | undefined>;
    equals(suspect: any): boolean;
    /**
     * _createAscendingRangeArray()
     *
     * creates an ascending range array.
     * @param start the starting number (inclusive)
     * @param stop the stopping number (inclusive)
     * @param step the amount to increment by.
     * @returns the generated array.
     */
    private _createAscendingRangeArray;
    /**
     * _createDescendingRangeArray()
     *
     * creates a descending range array.
     * @param start the starting number (inclusive)
     * @param stop the stopping number (inclusive)
     * @param step the amount to increment by.
     * @returns the generated array.
     */
    private _createDescendingRangeArray;
    private _createRnageArray;
}
//# sourceMappingURL=range.d.ts.map