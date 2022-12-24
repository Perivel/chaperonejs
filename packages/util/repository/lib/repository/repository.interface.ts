/**
 * RepositoryInterface
 * 
 * RepositoryInterface specifies the requirements for a repository.
 */

export interface RepositoryInterface {

    /**
     * remove()
     * 
     * removes an item from the repository.
     * @param item The item to remove
     */

    remove(item: any): Promise<void>;

    /**
     * save()
     * 
     * save() persists an item to the repository.
     * @param item the item to persist.
     */

    save(item: any): Promise<void>;

    /**
     * size()
     * 
     * size() gets the number of items in the repository.
     */

    size(): Promise<number>;
}