

export class ListIterator<T> implements Iterator<T> {

    private index: number;
    private done: boolean;
    private values: T[];

    constructor(values: T[]) {
        this.values = values;
        this.index = 0;
        this.done = false;
    }

    public next(): IteratorResult<T, T|undefined> {
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