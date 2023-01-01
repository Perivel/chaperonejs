import { CollectionInterface } from './../collection';
export interface StackInterface<T> extends CollectionInterface<T> {
    /**
     * peek()
     *
     * returns the next value in the stack without removing it.
     */
    peek(): T;
    /**
     * pop()
     *
     * removes the next value in the stack.
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
     */
    remove(): T;
}
