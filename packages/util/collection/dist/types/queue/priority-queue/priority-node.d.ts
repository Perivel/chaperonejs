import { Comparator } from '@chaperone/util';
import { Node } from './../../node';
/**
 * PriorityNode
 *
 * A node with a priority.
 */
export declare class PriorityNode<T> extends Node<T> {
    readonly priority: number;
    constructor(value: T, priority: number, next?: PriorityNode<T> | null, compareFn?: Comparator<T> | null);
    get next(): PriorityNode<T> | null;
    set next(value: PriorityNode<T> | null);
}
//# sourceMappingURL=priority-node.d.ts.map