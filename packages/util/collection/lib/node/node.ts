import { Comparable, Comparator, ComparisonResult } from '@chaperone/util';
import { comparator } from 'ramda';
import { NodeInterface } from './node.interface';

/**
 * Node
 * 
 * A Generic Node.
 */

export class Node<T> implements NodeInterface<T>, Comparable<T> {

    readonly value: T;
    private _next: Node<T>|null;

    private compare: Comparator<T>;


    constructor(value: T, next: Node<T>|null = null, comparatorFn: Comparator<T>|null = null) {
        this.value = value;
        this._next = next;
        
        if (comparatorFn) {
            this.compare = comparatorFn;
        }
        else {
            this.compare = (a: T, b: T): number => {
                const aLength = (a as String).length;
                const bLength = (b as String).length;

                if (a > b) {
                    return 1;
                }
                else if (a < b) {
                    return -1;
                }
                else {
                    return 0;
                }
            };
        }
    }

    public get hasNext(): boolean {
        return this.next !== null;
    }

    public get next(): Node<T>|null {
        return this._next;
    }

    public set next(value: Node<T>|null) {
        this._next = value;
    }

    public compareTo(suspect: T): ComparisonResult {
        let result: ComparisonResult;
        switch(this.compare(this.value, suspect)) {
            case -1:
                result = ComparisonResult.Less;
                break;
            case 1:
                result = ComparisonResult.Greater;
                break;
            default:
                result = ComparisonResult.Same;
                break;

        }
        return result;
    }
}