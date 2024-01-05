import { Comparator } from "@chaperone/util";
import { List } from "../list";
import { LinkedListInterface } from "./linked-list.interface";
import { Findable, FinderFn } from "../../interfaces";
/**
 * LinkedList
 *
 * A Linked List.
 */
export declare class LinkedList<T> extends List<T> implements LinkedListInterface<T>, Iterable<T>, Findable<T> {
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
    find(predicate: FinderFn<T>): T | null;
    /**
     * findValue(
     *
     * a helper function to recursively find the first list item to satisfy the predicate function.
     * @param head the head of the list to search
     * @param predicate the predicate function
     * @returns the first item on the list to satisfy the predicate function.
     */
    private findValue;
    findAll(predicate: FinderFn<T>): LinkedList<T>;
    /**
     * findAllVlaues()
     *
     * finds all the values in the list that satisfies the predicate.
     * @param resultlist the linked list containing all the results of the search.
     * @param head the head of the list to search
     * @param predicate the predicate function
     * @returns a linked list containing the items that satisfy the predicate.
     */
    private findAllValues;
    findLast(predicate: FinderFn<T>): T | null;
    /**
     * findLastValue()
     *
     *
     * @param head the head of the list to search
     * @param current the current last value.
     * @param predicate the predicate function.
     * @returns the last value in the list to satisfy the predicate.
     */
    private findLastValue;
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
     * indexOf()
     *
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */
    indexOf(suspect: T): number;
    /**
     * lastIndexOf()
     *
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */
    lastIndexOf(suspect: T): number;
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