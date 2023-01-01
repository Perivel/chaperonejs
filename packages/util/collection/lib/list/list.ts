import { Collection } from './../collection';
import { ListInterface } from './list.interface';

export abstract class List<T> extends Collection<T> implements ListInterface<T> {

    constructor() {
        super();
    }

    /**
     * get()
     * 
     * gets the item at the position specified by the index.
     * @param index the index of the item to get.
     */

    public abstract get(index: number): T;

    /**
     * remove()
     * 
     * removes the first instance of the item.
     * @param item the item to remove.
     * @returns the item, or null if it was not found.
     */

    public abstract remove(index: number): T;
}