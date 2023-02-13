import { Comparable, Comparator, ComparisonResult } from '@chaperone/util';
import { NodeInterface } from './node.interface';
/**
 * Node
 *
 * A Generic Node.
 */
export declare class Node<T> implements NodeInterface<T>, Comparable<T> {
    readonly value: T;
    private _next;
    private compare;
    constructor(value: T, next?: Node<T> | null, comparatorFn?: Comparator<T> | null);
    get hasNext(): boolean;
    get next(): Node<T> | null;
    set next(value: Node<T> | null);
    compareTo(suspect: T): ComparisonResult;
}
//# sourceMappingURL=node.d.ts.map