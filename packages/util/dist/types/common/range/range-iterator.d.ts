/**
 * RangeIterator
 *
 * A Range Iterator
 */
export declare class RangeIterator implements Iterator<number> {
    private index;
    private done;
    private values;
    constructor(values: number[]);
    next(): IteratorResult<number, number | undefined>;
}
//# sourceMappingURL=range-iterator.d.ts.map