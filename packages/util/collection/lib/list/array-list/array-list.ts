import { Comparator, OutOfBoundsException } from '@chaperone/util';
import { timeStamp } from 'console';
import { List } from './../list';
import { ArrayListInterface } from './array-list.interface';

/**
 * ArrayList
 * 
 * An Array List.
 */

export class ArrayList<T> extends List<T> implements ArrayListInterface<T>, Iterable<T> {

    private items: Array<T>;
    private readonly comparator: Comparator<T>;
    private _iteratorPos: number;

    constructor(values: T[] = [], comparator: Comparator<T> | null = null) {
        super();
        this.items = values;
        this.setSize(values.length);
        this._iteratorPos = 0;

        if (comparator) {
            this.comparator = comparator;
        }
        else {
            // use default comparator.
            this.comparator = (a, b): number => {
                const aStr = a as String;
                const bStr = b as String;

                if (aStr.length < bStr.length) {
                    return -1;
                }
                else if (aStr.length > bStr.length) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
    }

    public [Symbol.iterator](): Iterator<T, T, T|undefined> {
        return {
            next: (value: T): IteratorResult<T,any> => {
                if (this._iteratorPos < this.size) {
                    return {
                        done: false,
                        value: this.items[this._iteratorPos++]
                    }
                }
                else {
                    this._iteratorPos = 0;
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
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
        const target = this.items.find(suspect => {
            return this.comparator(item,suspect) === 0;
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

    /**
     * get()
     * 
     * gets the element at the specified index.
     * @param index the index of the item to get.
     * @returns the element at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */

    public get(index: number): T {
        if (!this.isEmpty && (index >= 0) && (index < this.size)) {
            return this.items[index];
        }
        else {
            throw new OutOfBoundsException();
        }
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
        if (!this.isEmpty && (index >= 0) && (index < this.size)) {
            const deletedItem = this.items.splice(index, 1);
            this.setSize(this.size - 1);
            return deletedItem[0];
        }
        else {
            throw new OutOfBoundsException();
        }
    }

    public toArray(): T[] {
        return this.items.map(item => item);
    }
}