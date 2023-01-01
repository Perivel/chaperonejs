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
     * clear()
     * 
     * clears the collection.
     */

  public clear(): void {
    this.setSize(0);
  }

  /**
     * isEmpty
     * 
     * determines if the collection is empty.
     */
    
  public get isEmpty(): boolean {
    return this.size === 0.0;
  }

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
