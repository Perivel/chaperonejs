import { Comparator } from '@chaperone/util';
import { Collection } from './../collection';
import { StackInterface } from './stack.interfae';
/**
 * Stack
 *
 * A stack.
 */
export declare class Stack<T> extends Collection<T> implements StackInterface<T> {
    private top;
    private readonly compareFn;
    constructor(compareFn?: Comparator<T> | null);
    /**
     * add()
     *
     * adds the value to the stack.
     * @param value the value to add to the stack.
     */
    add(value: T): void;
    /**
     * contains()
     *
     * determines if the value is contained in the stack.
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. FALSE otherwise.
     */
    contains(value: T): boolean;
    /**
     * containsValue()
     *
     * recursively determines if the value is in the stack.
     * @param top the top of the stack
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. False otherwise
     */
    private containsValue;
    /**
     * clear()
     *
     * clears the stack.
     */
    clear(): void;
    /**
     * peek()
     *
     * returns the next value in the stack without removing it.
     * @throws StackException when attempting to peek() when the stack is empty.
     */
    peek(): T;
    /**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */
    pop(): T;
    /**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */
    push(item: T): void;
    /**
     * remove()
     *
     * alias to pop()
     * @throws StackException when the stack is empty.
     */
    remove(): T;
}
