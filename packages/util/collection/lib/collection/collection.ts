import { CollectionInterface } from "./collection.interface";

/**
 * Collection
 * 
 * A Generic collection class
 */

export abstract class Collection<T> implements CollectionInterface<T> {
  private _size: number;

  constructor() {
    this._size = 0.0;
  }

  public get size(): number {
    return this._size;
  }

  /**
   * add()
   *
   * adds an item to the collection
   * @param item the item to add.
   */

  public abstract add(item: T): void;

  /**
   * contains()
   *
   * determines if the item is contained in the collection.
   * @param item the item to check for
   */

  public abstract contains(item: T): boolean;

  /**
     * isEmpty
     * 
     * determines if the collection is empty.
     */
    
  public get isEmpty(): boolean {
    return this.size === 0.0;
  }

  /**
   * remove()
   *
   * removes the first instance of the item.
   * @param item the item to remove.
   * @returns the item, or null if it was not found.
   */

  public abstract remove(item: T): T | null;

  /**
   * setSize()
   * 
   * sets the size of the collection.
   * @param newSize the new size to set
   */
  protected setSize(newSize: number): void {
    this._size = newSize;
  }
}
