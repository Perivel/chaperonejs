import { Comparator, ComparisonResult } from '@chaperone/util';
import { Collection } from "./../collection";
import { Node } from "./../node";
import { LinkedListInterface } from "./linked-list.interface";

/**
 * LinkedList
 * 
 * A Linked List.
 */

export class LinkedList<T> extends Collection<T> implements LinkedListInterface<T> {
  private head: Node<T> | null;
  private readonly comparator: Comparator<T>|null;

  constructor(comparator: Comparator<T>|null = null) {
    super();
    this.head = null;
    this.comparator = comparator;
  }

  public add(value: T): void {
    const newNode: Node<T> = new Node(value, null, this.comparator);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.addToEnd(this.head, newNode);
    }
    this.setSize(this.size + 1);
  }

  private addToEnd(node: Node<T>, newNode: Node<T>): void {
    if (!node.next) {
      node.next = newNode;
    } else {
      this.addToEnd(node.next, newNode);
    }
  }

  public contains(item: T): boolean {
      if (!this.isEmpty) {
        return this.containsValue(this.head, item);
      }
      else {
        return false;
      }
  }

  /**
   * containsValue()
   * 
   * determines if the list ontains the specified value.
   * @param head the head of the list to search.
   * @param value The value to search for.
   * @returns 
   */

  private containsValue(head: Node<T>|null, value: T): boolean {
    if (head) {
        if (head.compareTo(value) === ComparisonResult.Same) {
          return true;
        }
        else {
          return this.containsValue(head.next, value);
        }
    }
    else {
        return false;
    }
  }

  public remove(): T | null {
    if (!this.head) {
      this.setSize(this.size - 1);
      return null;
    }

    const value = this.head.value;
    this.head = this.head.next;
    this.setSize(this.size - 1);
    return value;
  }
}
