import { RepositoryInterface } from "./repository.interface";

/**
 * Repostory
 *
 * Repository represents a generic repository.
 */

export abstract class Repository implements RepositoryInterface {
  constructor() {}

  /**
   * remove()
   *
   * removes an item from the repository.
   * @param item the item to remove
   */

  public abstract remove(item: any): Promise<any>;

  /**
   * save()
   *
   * save() persists an item to the repository.
   * @param item the item to persist.
   */

  public abstract save(item: any): Promise<any>;

  /**
   * size()
   *
   * size() gets the number of items in the repository.
   */

  public abstract size(): Promise<number>;
}
