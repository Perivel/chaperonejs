import { Comparator } from '@chaperone/util';
import { List } from './../list';
import { ArrayListInterface } from './array-list.interface';
/**
 * ArrayList
 *
 * An Array List.
 */
export declare class ArrayList<T> extends List<T> implements ArrayListInterface<T>, Iterable<T> {
    private items;
    private readonly comparator;
    private _iteratorPos;
    constructor(values?: T[], comparator?: Comparator<T> | null);
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