import { Equatable } from './../interfaces';
import { RangeIterator } from './range-iterator';
import { RangeException } from './range.exception';
import { RangeInterface } from './range.interface';

/**
 * Range
 * 
 * A numeric range.
 */

export class Range implements Equatable, RangeInterface, Iterable<number> {

    readonly start: number;
    readonly stop: number;
    readonly step: number;
    private _arr: number[] | null;

    /**
     * Creates a Range instance.
     * @param start the starting point (inclusive)
     * @param stop the stopping point (inclusive)
     * @param step the step. Defaults to 1.
     * @throws RangeException when either start is greater than stop while step is greaer than 0. Or, when step === 0
     */

    constructor(start: number, stop: number, step: number = 1) {
        if (
            ((start > stop) && (step > 0)) ||
            (step === 0.0)
        ) {
            throw new RangeException();
        }

        this.start = start;
        this.stop = stop;
        this.step = step;
        this._arr = null;
    }

    [Symbol.iterator](): Iterator<number, number | undefined, number | undefined> {
        return new RangeIterator(this._createRnageArray());
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Range) {
            const other = suspect as Range;
            isEqual = (
                (this.start === other.start) &&
                (this.stop === other.stop) &&
                (this.step === other.step)
            );
        }

        return isEqual;
    }

    /**
     * _createAscendingRangeArray()
     * 
     * creates an ascending range array.
     * @param start the starting number (inclusive)
     * @param stop the stopping number (inclusive)
     * @param step the amount to increment by.
     * @returns the generated array.
     */

    private _createAscendingRangeArray(start: number, stop: number, step: number): number[] {
        const arr = new Array<number>();
        let i = start;
        stop = Math.abs(stop);

        do {
            arr.push(i);
            i += step;
        }
        while (i <= stop);

        return arr;
    }

    /**
     * _createDescendingRangeArray()
     * 
     * creates a descending range array.
     * @param start the starting number (inclusive)
     * @param stop the stopping number (inclusive)
     * @param step the amount to increment by.
     * @returns the generated array.
     */

    private _createDescendingRangeArray(start: number, stop: number, step: number): number[] {
        const arr = new Array<number>();
        let i = start;
        stop = Math.abs(stop);

        do {
            arr.push(i);
            i -= step;
        }
        while (i >= stop);
        return arr;
    }

    private _createRnageArray(): number[] {
        const ascendingRange = this.step > 0;
        if (this._arr === null) {
            // generate the array.
            this._arr = ascendingRange ? 
                this._createAscendingRangeArray(this.start, this.stop, this.step) 
                : this._createDescendingRangeArray(this.start, this.stop, this.step);
        }

        return this._arr;
    }
}