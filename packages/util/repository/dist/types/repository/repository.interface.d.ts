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
    remove(item: any): Promise<any>;
    /**
     * save()
     *
     * save() persists an item to the repository.
     * @param item the item to persist.
     * @returns the saved item.
     */
    save(item: any): Promise<any>;
    /**
     * size()
     *
     * size() gets the number of items in the repository.
     */
    size(): Promise<number>;
}
//# sourceMappingURL=repository.interface.d.ts.map