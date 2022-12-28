import { RepositoryInterface } from "./repository.interface";
/**
 * Repostory
 *
 * Repository represents a generic repository.
 */
export declare abstract class Repository implements RepositoryInterface {
    constructor();
    /**
     * remove()
     *
     * removes an item from the repository.
     * @param item the item to remove
     */
    abstract remove(item: any): Promise<void>;
    /**
     * save()
     *
     * save() persists an item to the repository.
     * @param item the item to persist.
     */
    abstract save(item: any): Promise<void>;
    /**
     * size()
     *
     * size() gets the number of items in the repository.
     */
    abstract size(): Promise<number>;
}
