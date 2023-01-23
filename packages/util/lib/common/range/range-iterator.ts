/**
 * RangeIterator
 * 
 * A Range Iterator
 */

export class RangeIterator implements Iterator<number> {

    private index: number;
    private done: boolean;
    private values: number[];

    constructor(values: number[]) {
        this.values = values;
        this.index = 0;
        this.done = false;
    }

    public next(): IteratorResult<number, number|undefined> {
        if (this.done) {
            return {
                done: this.done,
                value: undefined
            };
        }

        if (this.index === this.values.length) {
            this.done = true;
            return {
                done: this.done,
                value: undefined
            };
        }
        const value = this.values[this.index];
        this.index += 1;
        return {
            done: false,
            value
        };
    }
}