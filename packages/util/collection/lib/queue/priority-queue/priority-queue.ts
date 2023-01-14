import { Comparator, ComparisonResult } from '@chaperone/util';
import nodeTest from 'node:test';
import { QueueException } from '../queue.exception';
import { Collection } from './../../collection';
import { PriorityNode } from './priority-node';
import { PriorityQueueInterface } from './priority-queue.interface';

/**
 * PriorityQueue
 * 
 * A priorityQueue.
 */

export class PriorityQueue<T> extends Collection<T> implements PriorityQueueInterface<T> {
    
    private head: PriorityNode<T> | null;
    private readonly compareFn: Comparator<T>|null;

    constructor(compareFn: Comparator<T>|null = null) {
        super();
        this.compareFn = compareFn;
        this.head = null;
    }

    /**
     * add()
     * 
     * adds the value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value. Defaults to 0.
     */
    public add(value: T, priority: number = 0): void {
        this.enqueue(value, priority);
    }

    /**
     * clear()
     * 
     * clears the queue.
     */

    public clear(): void {
        this.head = null;
        super.clear();
    }

    /**
     * contains()
     * 
     * determines if the queue contains the value.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the queue. FALSE otherwise.
     */

    public contains(value: T): boolean {
        return this.containsValue(this.head, value);
    }

    private containsValue(node: PriorityNode<T>|null, value: T): boolean {
        if (node) {
            if (node.compareTo(value) === ComparisonResult.Same) {
                return true;
            } 
            else {
                return this.containsValue(node.next, value);
            }
        }
        else {
            return false;
        }
    }

    /**
     * dequeue()
     * 
     * removes the next value from the queue.
     */

    public dequeue(): T {
        if (this.head) {
            let dequeued = this.head;
            this.head = this.head.next;
            this.setSize(this.size - 1);
            return dequeued.value;
        }
        else {
            // nothing to remove.
            throw new QueueException();
        }
    }

    /**
     * enqueue()
     * 
     * adds a value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value.
     */
    
    public enqueue(value: T, priority: number = 0): void {
        const newNode = new PriorityNode(value, priority, null, this.compareFn);

        if (!this.head || (priority > this.head.priority)) {
            newNode.next = this.head;
            this.head = newNode;
        }
        else {
            let current = this.head;
            while (current.next && (current.next.priority > priority)) {
                current = current.next;
              }
              newNode.next = current.next;
              current.next = newNode;
        }
        this.setSize(this.size + 1);
    }

    /**
     * peek()
     * 
     * returns the next value in the queue without removing it.
     */

    public peek(): T {
        if (this.head) {
            return this.head.value;
        }
        else {
            throw new QueueException();
        }
    }

    public remove(): T {
        return this.dequeue();
    }

    public toArray(): T[] {
        const arr: T[] = [];
        let node: PriorityNode<T> | null = this.head;

        while(node !== null) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }
}