import { CollectionInterface } from "./collection.interface";
/**
 * Collection
 *
 * A Generic collection class
 */
export declare abstract class Collection<T> implements CollectionInterface<T> {
    private _size;
    constructor();
    get size(): number;
    /**
     * add()
     *
     * adds an item to the collection
     * @param item the item to add.
     */
    abstract add(item: T): void;
    /**
     * contains()
     *
     * determines if the item is contained in the collection.
     * @param item the item to check for
     */
    abstract contains(item: T): boolean;
    /**
     * clear()
     *
     * clears the collection.
     */
    clear(): void;
    /**
     * isEmpty
     *
     * determines if the collection is empty.
     */
    get isEmpty(): boolean;
    /**
     * setSize()
     *
     * sets the size of the collection.
     * @param newSize the new size to set
     */
    protected setSize(newSize: number): void;
    /**
     * toArray()
     *
     * converts the collection to an array.
     */
    abstract toArray(): Array<T>;
}
//# sourceMappingURL=collection.d.ts.map