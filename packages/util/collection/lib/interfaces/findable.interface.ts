import { CollectionInterface } from "./../collection";

export type FinderFn<T> = (suspect: T) => boolean;

/**
 * Findable
 *
 * The findable interface enables searching within a collection.
 */

export interface Findable<T> {
  /**
   * find()
   *
   * returns the first instance of the item where the predicate returns true.
   * @param predicate a predicate function which returns true if the suspect meets the search criteria, and false otherwise.
   * @returns the first instance that satisfies the predicate, or null if none of the items satisfy the predicate.
   */

  find(predicate: FinderFn<T>): T | null;

  /**
   * findAll()
   *
   * returns a collection containing all the elements that satisfy the predicate function.
   * @param predicate a predicate function which returns true if the suspect meets the search criteria, and false otherwise.
   * @returns a collection of all the items that satisfy the predicate, or an empty collection if no items satisfy the predicate.
   */

  findAll(predicate: FinderFn<T>): CollectionInterface<T>;

  /**
   * findLast()
   *
   * returns the last instance of the item where the predicate returns true.
   * @param predicate a predicate function which returns true if the suspect meets the search criteria, and false otherwise.
   * @returns the last instance that satisfies the predicate, or null if none of the items satisfy the predicate.
   */

  findLast(predicate: FinderFn<T>): T | null;
}
