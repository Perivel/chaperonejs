import { Comparator, ComparisonResult, OutOfBoundsException } from '@chaperone/util';
import { List } from "../list";
import { ListIterator } from './../list-iterator';
import { Node } from "../../node";
import { LinkedListInterface } from "./linked-list.interface";

/**
 * LinkedList
 * 
 * A Linked List.
 */

export class LinkedList<T> extends List<T> implements LinkedListInterface<T>, Iterable<T> {
  private head: Node<T> | null;
  private readonly comparator: Comparator<T> | null;
  private iteratorNode: Node<T> | null;

  constructor(comparator: Comparator<T> | null = null) {
    super();
    this.head = null;
    this.comparator = comparator;
    this.iteratorNode = null;
  }

  public [Symbol.iterator](): Iterator<T, T | undefined, T | undefined> {
    return new ListIterator(this.toArray());
  }

  /**
   * add()
   * 
   * adds the value to the list.
   * @param value the value to add to the list.
   */

  public add(value: T): void {
    const newNode: Node<T> = new Node(value, null, this.comparator);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.addToEnd(this.head, newNode);
    }
    this.setSize(this.size + 1);
  }

  /**
   * addToEnd()
   * 
   * adds the newNode to the end of the list.
   * @param node the current node
   * @param newNode the node to insert.
   */

  private addToEnd(node: Node<T>, newNode: Node<T>): void {
    if (!node.next) {
      node.next = newNode;
    } else {
      this.addToEnd(node.next, newNode);
    }
  }

  /**
   * contains()
   * 
   * determines if the item is in the list.
   * @param value the item to search for.
   * @returns TRUE if the item is in the list. FALSE if it is not.
   */

  public contains(value: T): boolean {
    if (!this.isEmpty) {
      return this.containsValue(this.head, value);
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

  private containsValue(head: Node<T> | null, value: T): boolean {
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

  /**
   * clear()
   * 
   * clears the linked list.
   */

  public clear(): void {
    this.head = null;
    super.clear();
  }

  /**
   * get()
   * 
   * gets the value at the specified index.
   * @param index the index of the value to retrieve.
   * @returns the value at the specified index.
   * @throws OutOfBoundsException when the index is out of bounds.
   */

  public get(index: number): T {
    if (!this.isEmpty && (index >= 0) && (index <= this.size)) {
      return this.getValue(this.head!, 0, index);
    }
    else {
      throw new OutOfBoundsException();
    }
  }

  /**
   * getValue()
   * 
   * recursively gets the value at the specified target index.
   * @param head the head of the list.
   * @param index the current index
   * @param target the target index.
   * @returns the value at the specified target index.
   */

  private getValue(head: Node<T>, index: number, target: number): T {
    if (index === target) {
      return head.value;
    }
    else {
      return this.getValue(head.next!, index++, target);
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

    if (!this.isEmpty) {
      let current = 0;
      let node = this.head;

      do {
        if (node!.compareTo(suspect) === ComparisonResult.Same) {
          index = current;
        }
        else {
          current++;
          node = node!.next;
        }
      }
      while ((index < 0) && (current < this.size));
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

    if (!this.isEmpty) {
      let current = 0;
      let node = this.head;

      do {
        if (node!.compareTo(suspect) === ComparisonResult.Same) {
          index = current;
        }
        current++;
        node = node!.next;
      }
      while (node !== null)
    }

    return index;
  }

  /**
   * remove()
   * 
   * removes the value at the specified index.
   * @param index the index of the value to remove.
   * @returns the removed items.
   * @throws OutOfBoundsException when the index is out of bounds.
   */

  public remove(index: number): T {
    if (!this.isEmpty && (index >= 0) && (index < this.size)) {
      return this.reemoveValue(this.head!, null, 0, index);
    }
    else {
      // out of bounds 
      throw new OutOfBoundsException();
    }
  }

  /**
   * removeValue()
   * 
   * removes the value at the specified index.
   * @param currentNode the current node
   * @param previousNode the previous node.
   * @param currentIndex the current index.
   * @param targetIndex the index of the item to remove.
   * @returns the removed item.
   */

  private reemoveValue(currentNode: Node<T>, previousNode: Node<T> | null, currentIndex: number, targetIndex: number): T {
    if (currentIndex === targetIndex) {
      // remove the current node.
      if (previousNode) {
        // we are in the tail of the list.
        previousNode.next = currentNode.next;
      }
      else {
        // we are at the head of the list.
        this.head = currentNode.next;
      }
      this.setSize(this.size - 1);
      return currentNode.value;
    }
    else {
      // go to the next node.
      return this.reemoveValue(currentNode.next!, currentNode, currentIndex++, targetIndex);
    }
  }

  public toArray(): T[] {
    const arr: T[] = [];
    let node: Node<T> | null = this.head;

    while (node !== null) {
      arr.push(node.value);
      node = node.next;
    }

    return arr;
  }
}