import { Comparator } from "@chaperone/util";
import { List } from "./../list";
import { ArrayListInterface } from "./array-list.interface";
import { Findable, FinderFn } from "../../interfaces";
/**
 * ArrayList
 *
 * An Array List.
 */
export declare class ArrayList<T> extends List<T> implements ArrayListInterface<T>, Iterable<T>, Findable<T> {
    private items;
    private readonly comparator;
    private _iteratorPos;
    constructor(values?: T[], comparator?: Comparator<T>);
    [Symbol.iterator](): Iterator<T, T | undefined, T | undefined>;
    /**
     * add()
     *
     * adds an item to the array list.
     * @param item the item to add to the array list.
     */
    add(item: T): void;
    /**
     * contains()
     *
     * determines if the item is in the array list.
     * @param item the item to search for.
     * @returns TRUE if the item is in the list. FASLE if it is not.
     */
    contains(item: T): boolean;
    /**
     * clear()
     *
     * clears the array list.
     */
    clear(): void;
    find(predicate: FinderFn<T>): T | null;
    findAll(predicate: FinderFn<T>): ArrayList<T>;
    findLast(predicate: FinderFn<T>): T | null;
    /**
     * get()
     *
     * gets the element at the specified index.
     * @param index the index of the item to get.
     * @returns the element at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */
    get(index: number): T;
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
     * removes the item at the specified index.
     * @param index the index of the item to remove.
     * @returns the item that was removed.
     * @throws OutOfBoundsException when the index is out of bounds.
     */
    remove(index: number): T;
    toArray(): T[];
}
//# sourceMappingURL=array-list.d.ts.map