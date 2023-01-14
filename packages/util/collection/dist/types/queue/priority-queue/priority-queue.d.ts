import { Comparator } from '@chaperone/util';
import { Collection } from './../../collection';
import { PriorityQueueInterface } from './priority-queue.interface';
/**
 * PriorityQueue
 *
 * A priorityQueue.
 */
export declare class PriorityQueue<T> extends Collection<T> implements PriorityQueueInterface<T> {
    private head;
    private readonly compareFn;
    constructor(compareFn?: Comparator<T> | null);
    /**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value. Defaults to 0.
     */
    add(value: T, priority?: number): void;
    /**
     * clear()
     *
     * clears the queue.
     */
    clear(): void;
    /**
     * contains()
     *
     * determines if the queue contains the value.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the queue. FALSE otherwise.
     */
    contains(value: T): boolean;
    private containsValue;
    /**
     * dequeue()
     *
     * removes the next value from the queue.
     */
    dequeue(): T;
    /**
     * enqueue()
     *
     * adds a value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value.
     */
    enqueue(value: T, priority?: number): void;
    /**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */
    peek(): T;
    remove(): T;
    toArray(): T[];
}
