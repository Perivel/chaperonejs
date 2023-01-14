import { Comparator } from '@chaperone/util';
import { Collection } from './../collection';
import { QueueInterface } from './queue.interface';
/**
 * Queue
 *
 * A Queue.
 */
export declare class Queue<T> extends Collection<T> implements QueueInterface<T> {
    private head;
    private tail;
    private readonly compareFn;
    constructor(compareFn?: Comparator<T> | null);
    /**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     */
    add(value: T): void;
    /**
     * clear()
     *
     * clears the queue.
     */
    clear(): void;
    /**
     * contains()
     *
     * determines if the value is contained in the queue.
     * @param value the value to search for.
     * @returns TRUE if the value is found in the queue. FALSE otherwise.
     */
    contains(value: T): boolean;
    /**
     * containsValue()
     *
     * recursively determines if the value is contained in the queue.
     * @param node the node to check.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the node. FALSE otherwise.
     */
    private containsValue;
    /**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */
    dequeue(): T;
    /**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */
    enqueue(value: T): void;
    /**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */
    peek(): T;
    /**
     * remove()
     *
     * alias to dequeue()
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */
    remove(): T;
    toArray(): T[];
}
