/**
 * ListIterator
 *
 * A List Iterator
 */
export declare class ListIterator<T> implements Iterator<T> {
    private index;
    private done;
    private values;
    constructor(values: T[]);
    next(): IteratorResult<T, T | undefined>;
}
//# sourceMappingURL=list-iterator.d.ts.map