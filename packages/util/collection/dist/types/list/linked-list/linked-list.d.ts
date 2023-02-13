import { Comparator } from '@chaperone/util';
import { List } from "../list";
import { LinkedListInterface } from "./linked-list.interface";
/**
 * LinkedList
 *
 * A Linked List.
 */
export declare class LinkedList<T> extends List<T> implements LinkedListInterface<T>, Iterable<T> {
    private head;
    private readonly comparator;
    private iteratorNode;
    constructor(comparator?: Comparator<T> | null);
    [Symbol.iterator](): Iterator<T, T | undefined, T | undefined>;
    /**
     * add()
     *
     * adds the value to the list.
     * @param value the value to add to the list.
     */
    add(value: T): void;
    /**
     * addToEnd()
     *
     * adds the newNode to the end of the list.
     * @param node the current node
     * @param newNode the node to insert.
     */
    private addToEnd;
    /**
     * contains()
     *
     * determines if the item is in the list.
     * @param value the item to search for.
     * @returns TRUE if the item is in the list. FALSE if it is not.
     */
    contains(value: T): boolean;
    /**
     * containsValue()
     *
     * determines if the list ontains the specified value.
     * @param head the head of the list to search.
     * @param value The value to search for.
     * @returns
     */
    private containsValue;
    /**
     * clear()
     *
     * clears the linked list.
     */
    clear(): void;
    /**
     * get()
     *
     * gets the value at the specified index.
     * @param index the index of the value to retrieve.
     * @returns the value at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */
    get(index: number): T;
    /**
     * getValue()
     *
     * recursively gets the value at the specified target index.
     * @param head the head of the list.
     * @param index the current index
     * @param target the target index.
     * @returns the value at the specified target index.
     */
    private getValue;
    /**
     * remove()
     *
     * removes the value at the specified index.
     * @param index the index of the value to remove.
     * @returns the removed items.
     * @throws OutOfBoundsException when the index is out of bounds.
     */
    remove(index: number): T;
    /**
     * removeValue()
     *
     * removes the value at the specified index.
     * @param currentNode the current node
     * @param previousNode the previous node.
     * @param currentIndex the current index.
     * @param targetIndex the index of the item to remove.
     * @returns the removed item.
     */
    private reemoveValue;
    toArray(): T[];
}
//# sourceMappingURL=linked-list.d.ts.map