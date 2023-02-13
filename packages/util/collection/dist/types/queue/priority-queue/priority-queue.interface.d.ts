export interface PriorityQueueInterface<T> {
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
    enqueue(value: T, priority: number): void;
    /**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */
    peek(): T;
}
//# sourceMappingURL=priority-queue.interface.d.ts.map