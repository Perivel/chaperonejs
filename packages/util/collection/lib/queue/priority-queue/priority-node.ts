import { Comparator } from '@chaperone/util';
import { Node } from './../../node';

/**
 * PriorityNode
 * 
 * A node with a priority.
 */
export class PriorityNode<T> extends Node<T> {

    readonly priority: number;

    constructor(value: T, priority: number, next: PriorityNode<T>|null = null, compareFn: Comparator<T>|null = null) {
        super(value, next, compareFn);
        this.priority = priority;
    }

    public get next(): PriorityNode<T>|null {
        return super.next as PriorityNode<T>;
    }

    public set next(value: PriorityNode<T>|null) {
        super.next = value;
    }
}