import { Comparator, ComparisonResult } from '@chaperone/util';
import { Collection } from './../collection';
import { Node } from './../node';
import { StackException } from './stack.exception';
import { StackInterface } from './stack.interfae';

/**
 * Stack
 * 
 * A stack.
 */

export class Stack<T> extends Collection<T> implements StackInterface<T> {

    private top: Node<T>|null;
    private readonly compareFn: Comparator<T>|null;

    constructor(compareFn: Comparator<T>|null = null) {
        super();
        this.top = null;
        this.compareFn = compareFn;
    }

    /**
     * add()
     * 
     * adds the value to the stack.
     * @param value the value to add to the stack.
     */

    public add(value: T): void {
        this.push(value);
    }

    /**
     * contains()
     * 
     * determines if the value is contained in the stack.
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. FALSE otherwise.
     */

    public contains(value: T): boolean {
        return this.containsValue(this.top, value);
    }

    /**
     * containsValue()
     * 
     * recursively determines if the value is in the stack.
     * @param top the top of the stack
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. False otherwise
     */

    private containsValue(top: Node<T>|null, value: T): boolean {
        if (top) {
            if (top.compareTo(value) === ComparisonResult.Same) {
                return true;
            }
            else {
                return this.containsValue(top.next, value);
            }
        }
        else {
            return false;
        }
    }

    /**
     * clear()
     * 
     * clears the stack.
     */

    public clear(): void {
        this.top = null;
        super.clear();
    }

    /**
     * peek()
     * 
     * returns the next value in the stack without removing it.
     * @throws StackException when attempting to peek() when the stack is empty.
     */

    public peek(): T {
        if (!this.isEmpty) {
            return this.top!.value;
        }
        else {
            // nothing to peek.
            throw new StackException();
        }
    }

    /**
     * pop()
     * 
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */

    public pop(): T {
        if (!this.isEmpty) {
            const data = this.top!.value;
            this.top = this.top!.next;
            this.setSize(this.size - 1);
            return data;
        }
        else {
            // nothing to pop
            throw new StackException();
        }
    }

    /**
     * push()
     * 
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */

    public push(item: T): void {
        const newNode = new Node(item, this.top, this.compareFn);
        this.top = newNode;
        this.setSize(this.size + 1);
    }

    /**
     * remove()
     * 
     * alias to pop()
     * @throws StackException when the stack is empty.
     */
    
    public remove(): T {
        return this.pop();
    }

    public toArray(): T[] {
        const arr: T[] = [];
        let node: Node<T> | null = this.top;

        while(node !== null) {
            arr.push(node.value);
            node = node.next;
        }
        return arr;
    }
}