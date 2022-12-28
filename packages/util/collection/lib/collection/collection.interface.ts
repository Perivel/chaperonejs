

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
     * isEmpty
     * 
     * indicates if the collection is empty.
     */
    
    readonly isEmpty: boolean;

    /**
     * remove()
     * 
     * removes the first instance of the item.
     * @param item the item to remove.
     * @returns the item, or null if it was not found.
     */

    remove(item: T): T|null;

    /**
     *  gets the size of the collection.
     */
    
    size: number;
}