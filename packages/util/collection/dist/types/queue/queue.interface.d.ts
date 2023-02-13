import { CollectionInterface } from './../collection';
export interface QueueInterface<T> extends CollectionInterface<T> {
    /**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
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
}
//# sourceMappingURL=queue.interface.d.ts.map