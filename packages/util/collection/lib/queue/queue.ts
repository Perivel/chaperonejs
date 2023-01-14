import { Comparator, ComparisonResult } from '@chaperone/util';
import { Collection } from './../collection';
import { Node } from './../node';
import { QueueException } from './queue.exception';
import { QueueInterface } from './queue.interface';

/**
 * Queue
 * 
 * A Queue.
 */

export class Queue<T> extends Collection<T> implements QueueInterface<T> {

    private head: Node<T>|null;
    private tail: Node<T>|null;
    private readonly compareFn: Comparator<T>|null;

    constructor(compareFn: Comparator<T>|null = null) {
        super();
        this.head = null;
        this.tail = null;
        this.compareFn = compareFn;
    }

    /**
     * add()
     * 
     * adds the value to the queue.
     * @param value the value to add.
     */

    public add(value: T): void {
        this.enqueue(value);
    }

    /**
     * clear()
     * 
     * clears the queue.
     */

    public clear(): void {
        this.head = null;
        this.tail = null;
        super.clear();
    }

    /**
     * contains()
     * 
     * determines if the value is contained in the queue.
     * @param value the value to search for.
     * @returns TRUE if the value is found in the queue. FALSE otherwise.
     */

    public contains(value: T): boolean {
        return this.containsValue(this.head, value);
    }

    /**
     * containsValue()
     * 
     * recursively determines if the value is contained in the queue.
     * @param node the node to check.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the node. FALSE otherwise.
     */

    private containsValue(node: Node<T>|null, value: T): boolean {
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
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */

    public dequeue(): T {
        if (this.head) {
            const value = this.head.value;
            this.head = this.head.next;

            if (!this.head) {
                this.tail = null;
            }
            this.setSize(this.size - 1);
            return value;
        }
        else {
            // nothing to remove.
            throw new QueueException();
        }
    }

    /**
     * enqueu()
     * 
     * adds the value to the queue
     * @param value the value to add to the queue.
     */

    public enqueue(value: T): void {
        const newNode = new Node(value, null, this.compareFn);
        
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
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

    /**
     * remove()
     * 
     * alias to dequeue()
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */
    
    public remove(): T {
        return this.dequeue();
    }

    public toArray(): T[] {
        const arr: T[] = [];
        let node: Node<T>|null = this.head;

        while(node !== null) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }
}