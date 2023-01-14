

export interface CollectionInterface<T> {
    /**
     * add()
     * 
     * adds an item to the collection
     * @param item the item to add.
     */

    add(item: T): void;

    /**
     * contains()
     * 
     * determines if the item is contained in the collection.
     * @param item the item to check for
     */

    contains(item: T): boolean;

    /**
     * clear()
     * 
     * clears the collection.
     */

    clear(): void;

    /**
     * isEmpty
     * 
     * indicates if the collection is empty.
     */
    
    readonly isEmpty: boolean;

    /**
     *  gets the size of the collection.
     */
    
    size: number;

    /**
     * toArray()
     * 
     * converts the collection to an array.
     */
    
    toArray(): Array<T>;
}