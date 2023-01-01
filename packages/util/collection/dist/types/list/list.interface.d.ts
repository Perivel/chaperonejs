import { CollectionInterface } from './../collection';
export interface ListInterface<T> extends CollectionInterface<T> {
    /**
     * get()
     *
     * gets the item at the specified index.
     * @param index the index of the item to get.
     */
    get(index: number): T;
    /**
     * remove()
     *
     * removes the first instance of the item.
     * @param item the item to remove.
     * @returns the item, or null if it was not found.
     */
    remove(index: number): T;
}
