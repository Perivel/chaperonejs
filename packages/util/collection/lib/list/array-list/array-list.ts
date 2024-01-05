import { Comparator, compare, OutOfBoundsException } from "@chaperone/util";
import { List } from "./../list";
import { ListIterator } from "./../list-iterator";
import { ArrayListInterface } from "./array-list.interface";
import { Findable, FinderFn } from "../../interfaces";
import { CollectionInterface } from "../../collection";

/**
 * ArrayList
 *
 * An Array List.
 */

export class ArrayList<T>
  extends List<T>
  implements ArrayListInterface<T>, Iterable<T>, Findable<T>
{
  private items: Array<T>;
  private readonly comparator: Comparator<T>;
  private _iteratorPos: number;

  constructor(values: T[] = [], comparator: Comparator<T> = compare) {
    super();
    this.items = values;
    this.setSize(values.length);
    this._iteratorPos = 0;
    this.comparator = comparator;
  }

  public [Symbol.iterator](): Iterator<T, T | undefined, T | undefined> {
    return new ListIterator(this.toArray());
  }

  /**
   * add()
   *
   * adds an item to the array list.
   * @param item the item to add to the array list.
   */

  public add(item: T): void {
    this.items.push(item);
    this.setSize(this.size + 1);
  }

  /**
   * contains()
   *
   * determines if the item is in the array list.
   * @param item the item to search for.
   * @returns TRUE if the item is in the list. FASLE if it is not.
   */

  public contains(item: T): boolean {
    const target = this.items.find((suspect) => {
      return this.comparator(item, suspect) === 0;
    });

    return target !== undefined;
  }

  /**
   * clear()
   *
   * clears the array list.
   */

  public clear(): void {
    this.items = [];
    super.clear();
  }

  public find(predicate: FinderFn<T>): T | null {
    const result = this.items.find((value) => predicate(value));
    return result || null;
  }

  public findAll(predicate: FinderFn<T>): ArrayList<T> {
    const resArr = new ArrayList<T>();

    this.items.forEach((value) => {
      if (predicate(value)) {
        resArr.add(value);
      }
    });

    return resArr;
  }

  public findLast(predicate: FinderFn<T>): T | null {
    let result: T | null = null;
    for (let i = this.size - 1; i >= 0; i--) {
      if (predicate(this.items[i])) {
        result = this.items[i];
        break;
      }
    }

    return result;
  }

  /**
   * get()
   *
   * gets the element at the specified index.
   * @param index the index of the item to get.
   * @returns the element at the specified index.
   * @throws OutOfBoundsException when the index is out of bounds.
   */

  public get(index: number): T {
    if (!this.isEmpty && index >= 0 && index < this.size) {
      return this.items[index];
    } else {
      throw new OutOfBoundsException();
    }
  }

  /**
   * indexOf()
   *
   * gets the index of the first occurance of suspect.
   * @param suspect the suspect to check for.
   * @returns the index of the first occurance of the suspect or -1 if it does not exist.
   */

  public indexOf(suspect: T): number {
    let index = -1;
    let current = 0;

    for (current = 0; current < this.size; current++) {
      if (this.comparator(this.items[current], suspect) === 0) {
        index = current;
      }
    }

    return index;
  }

  /**
   * lastIndexOf()
   *
   * gets the index of the last occurance of suspect.
   * @param suspect the suspect to check for.
   * @returns the index of the last occurance of the suspect or -1 if it does not exist.
   */

  public lastIndexOf(suspect: T): number {
    let index = -1;
    let current = this.size - 1;

    for (current = this.size - 1; current >= 0; current--) {
      if (this.comparator(this.items[current], suspect) === 0) {
        index = current;
      }
    }

    return index;
  }

  /**
   * remove()
   *
   * removes the item at the specified index.
   * @param index the index of the item to remove.
   * @returns the item that was removed.
   * @throws OutOfBoundsException when the index is out of bounds.
   */

  public remove(index: number): T {
    if (!this.isEmpty && index >= 0 && index < this.size) {
      const deletedItem = this.items.splice(index, 1);
      this.setSize(this.size - 1);
      return deletedItem[0];
    } else {
      throw new OutOfBoundsException();
    }
  }

  public toArray(): T[] {
    return this.items.map((item) => item);
  }
}
