import{BaseException as t,compare as e,ComparisonResult as s,OutOfBoundsException as i}from"@chaperone/util";
/**
 * Collection
 *
 * A Generic collection class
 */class r{_size;constructor(){this._size=0}get size(){return this._size}
/**
       * clear()
       *
       * clears the collection.
       */clear(){this.setSize(0)}
/**
       * isEmpty
       *
       * determines if the collection is empty.
       */get isEmpty(){return 0===this.size}
/**
     * setSize()
     *
     * sets the size of the collection.
     * @param newSize the new size to set
     */setSize(t){this._size=t}}
/**
 * CollectionException
 *
 * A generic collection error.
 */class n extends t{constructor(t="Collection error"){super(t)}}
/**
 * Node
 *
 * A Generic Node.
 */class h{value;_next;compare;constructor(t,s=null,i=null){this.value=t,this._next=s,this.compare=i||e}get hasNext(){return null!==this.next}get next(){return this._next}set next(t){this._next=t}compareTo(t){let e;switch(this.compare(this.value,t)){case-1:e=s.Less;break;case 1:e=s.Greater;break;default:e=s.Same}return e}}class a extends r{constructor(){super()}}
/**
 * ListIterator
 *
 * A List Iterator
 */class o{index;done;values;constructor(t){this.values=t,this.index=0,this.done=!1}next(){if(this.done)return{done:this.done,value:void 0};if(this.index===this.values.length)return this.done=!0,{done:this.done,value:void 0};const t=this.values[this.index];return this.index+=1,{done:!1,value:t}}}
/**
 * LinkedList
 *
 * A Linked List.
 */class u extends a{head;comparator;iteratorNode;constructor(t=null){super(),this.head=null,this.comparator=t,this.iteratorNode=null}[Symbol.iterator](){return new o(this.toArray())}
/**
     * add()
     *
     * adds the value to the list.
     * @param value the value to add to the list.
     */add(t){const e=new h(t,null,this.comparator);this.head?this.addToEnd(this.head,e):this.head=e,this.setSize(this.size+1)}
/**
     * addToEnd()
     *
     * adds the newNode to the end of the list.
     * @param node the current node
     * @param newNode the node to insert.
     */addToEnd(t,e){t.next?this.addToEnd(t.next,e):t.next=e}
/**
     * contains()
     *
     * determines if the item is in the list.
     * @param value the item to search for.
     * @returns TRUE if the item is in the list. FALSE if it is not.
     */contains(t){return!this.isEmpty&&this.containsValue(this.head,t)}
/**
     * containsValue()
     *
     * determines if the list ontains the specified value.
     * @param head the head of the list to search.
     * @param value The value to search for.
     * @returns
     */containsValue(t,e){return!!t&&(t.compareTo(e)===s.Same||this.containsValue(t.next,e))}
/**
     * clear()
     *
     * clears the linked list.
     */clear(){this.head=null,super.clear()}
/**
     * get()
     *
     * gets the value at the specified index.
     * @param index the index of the value to retrieve.
     * @returns the value at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */get(t){if(!this.isEmpty&&t>=0&&t<=this.size)return this.getValue(this.head,0,t);throw new i}
/**
     * getValue()
     *
     * recursively gets the value at the specified target index.
     * @param head the head of the list.
     * @param index the current index
     * @param target the target index.
     * @returns the value at the specified target index.
     */getValue(t,e,s){return e===s?t.value:this.getValue(t.next,e++,s)}
/**
    * indexOf()
     *
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */indexOf(t){let e=-1;if(!this.isEmpty){let i=0,r=this.head;do{r.compareTo(t)===s.Same?e=i:(i++,r=r.next)}while(e<0&&i<this.size)}return e}
/**
     * lastIndexOf()
     *
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */lastIndexOf(t){let e=-1;if(!this.isEmpty){let i=0,r=this.head;do{r.compareTo(t)===s.Same&&(e=i),i++,r=r.next}while(null!==r)}return e}
/**
     * remove()
     *
     * removes the value at the specified index.
     * @param index the index of the value to remove.
     * @returns the removed items.
     * @throws OutOfBoundsException when the index is out of bounds.
     */remove(t){if(!this.isEmpty&&t>=0&&t<this.size)return this.reemoveValue(this.head,null,0,t);
// out of bounds 
throw new i}
/**
     * removeValue()
     *
     * removes the value at the specified index.
     * @param currentNode the current node
     * @param previousNode the previous node.
     * @param currentIndex the current index.
     * @param targetIndex the index of the item to remove.
     * @returns the removed item.
     */reemoveValue(t,e,s,i){return s===i?(
// remove the current node.
e?
// we are in the tail of the list.
e.next=t.next:
// we are at the head of the list.
this.head=t.next,this.setSize(this.size-1),t.value):this.reemoveValue(t.next,t,s++,i)}toArray(){const t=[];let e=this.head;for(;null!==e;)t.push(e.value),e=e.next;return t}}
/**
 * ArrayList
 *
 * An Array List.
 */class l extends a{items;comparator;_iteratorPos;constructor(t=[],s=e){super(),this.items=t,this.setSize(t.length),this._iteratorPos=0,this.comparator=s}[Symbol.iterator](){return new o(this.toArray())}
/**
     * add()
     *
     * adds an item to the array list.
     * @param item the item to add to the array list.
     */add(t){this.items.push(t),this.setSize(this.size+1)}
/**
     * contains()
     *
     * determines if the item is in the array list.
     * @param item the item to search for.
     * @returns TRUE if the item is in the list. FASLE if it is not.
     */contains(t){return void 0!==this.items.find((e=>0===this.comparator(t,e)))}
/**
     * clear()
     *
     * clears the array list.
     */clear(){this.items=[],super.clear()}
/**
     * get()
     *
     * gets the element at the specified index.
     * @param index the index of the item to get.
     * @returns the element at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */get(t){if(!this.isEmpty&&t>=0&&t<this.size)return this.items[t];throw new i}
/**
     * indexOf()
     *
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */indexOf(t){let e=-1,s=0;for(s=0;s<this.size;s++)0===this.comparator(this.items[s],t)&&(e=s);return e}
/**
     * lastIndexOf()
     *
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */lastIndexOf(t){let e=-1,s=this.size-1;for(s=this.size-1;s>=0;s--)0===this.comparator(this.items[s],t)&&(e=s);return e}
/**
     * remove()
     *
     * removes the item at the specified index.
     * @param index the index of the item to remove.
     * @returns the item that was removed.
     * @throws OutOfBoundsException when the index is out of bounds.
     */remove(t){if(!this.isEmpty&&t>=0&&t<this.size){const e=this.items.splice(t,1);return this.setSize(this.size-1),e[0]}throw new i}toArray(){return this.items.map((t=>t))}}
/**
 * StackException
 *
 * A stack error.
 */class c extends n{constructor(t="Stack exception"){super(t)}}
/**
 * Stack
 *
 * A stack.
 */class d extends r{top;compareFn;constructor(t=null){super(),this.top=null,this.compareFn=t}
/**
     * add()
     *
     * adds the value to the stack.
     * @param value the value to add to the stack.
     */add(t){this.push(t)}
/**
     * contains()
     *
     * determines if the value is contained in the stack.
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. FALSE otherwise.
     */contains(t){return this.containsValue(this.top,t)}
/**
     * containsValue()
     *
     * recursively determines if the value is in the stack.
     * @param top the top of the stack
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. False otherwise
     */containsValue(t,e){return!!t&&(t.compareTo(e)===s.Same||this.containsValue(t.next,e))}
/**
     * clear()
     *
     * clears the stack.
     */clear(){this.top=null,super.clear()}
/**
     * peek()
     *
     * returns the next value in the stack without removing it.
     * @throws StackException when attempting to peek() when the stack is empty.
     */peek(){if(this.isEmpty)
// nothing to peek.
throw new c;return this.top.value}
/**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */pop(){if(this.isEmpty)
// nothing to pop
throw new c;{const t=this.top.value;return this.top=this.top.next,this.setSize(this.size-1),t}}
/**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */push(t){const e=new h(t,this.top,this.compareFn);this.top=e,this.setSize(this.size+1)}
/**
     * remove()
     *
     * alias to pop()
     * @throws StackException when the stack is empty.
     */remove(){return this.pop()}toArray(){const t=[];let e=this.top;for(;null!==e;)t.push(e.value),e=e.next;return t}}
/**
 * QueueException
 *
 * A queue error
 */class p extends n{constructor(t="Queue error"){super(t)}}
/**
 * Queue
 *
 * A Queue.
 */class m extends r{head;tail;compareFn;constructor(t=null){super(),this.head=null,this.tail=null,this.compareFn=t}
/**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     */add(t){this.enqueue(t)}
/**
     * clear()
     *
     * clears the queue.
     */clear(){this.head=null,this.tail=null,super.clear()}
/**
     * contains()
     *
     * determines if the value is contained in the queue.
     * @param value the value to search for.
     * @returns TRUE if the value is found in the queue. FALSE otherwise.
     */contains(t){return this.containsValue(this.head,t)}
/**
     * containsValue()
     *
     * recursively determines if the value is contained in the queue.
     * @param node the node to check.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the node. FALSE otherwise.
     */containsValue(t,e){return!!t&&(t.compareTo(e)===s.Same||this.containsValue(t.next,e))}
/**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */dequeue(){if(this.head){const t=this.head.value;return this.head=this.head.next,this.head||(this.tail=null),this.setSize(this.size-1),t}
// nothing to remove.
throw new p}
/**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */enqueue(t){const e=new h(t,null,this.compareFn);this.tail&&(this.tail.next=e),this.tail=e,this.head||(this.head=e),this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new p}
/**
     * remove()
     *
     * alias to dequeue()
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */remove(){return this.dequeue()}toArray(){const t=[];let e=this.head;for(;null!==e;)t.push(e.value),e=e.next;return t}}
/**
 * PriorityNode
 *
 * A node with a priority.
 */class x extends h{priority;constructor(t,e,s=null,i=null){super(t,s,i),this.priority=e}get next(){return super.next}set next(t){super.next=t}}
/**
 * PriorityQueue
 *
 * A priorityQueue.
 */class z extends r{head;compareFn;constructor(t=null){super(),this.compareFn=t,this.head=null}
/**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value. Defaults to 0.
     */add(t,e=0){this.enqueue(t,e)}
/**
     * clear()
     *
     * clears the queue.
     */clear(){this.head=null,super.clear()}
/**
     * contains()
     *
     * determines if the queue contains the value.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the queue. FALSE otherwise.
     */contains(t){return this.containsValue(this.head,t)}containsValue(t,e){return!!t&&(t.compareTo(e)===s.Same||this.containsValue(t.next,e))}
/**
     * dequeue()
     *
     * removes the next value from the queue.
     */dequeue(){if(this.head){let t=this.head;return this.head=this.head.next,this.setSize(this.size-1),t.value}
// nothing to remove.
throw new p}
/**
     * enqueue()
     *
     * adds a value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value.
     */enqueue(t,e=0){const s=new x(t,e,null,this.compareFn);if(!this.head||e>this.head.priority)s.next=this.head,this.head=s;else{let t=this.head;for(;t.next&&t.next.priority>e;)t=t.next;s.next=t.next,t.next=s}this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new p}remove(){return this.dequeue()}toArray(){const t=[];let e=this.head;for(;null!==e;)t.push(e.value),e=e.next;return t}}export{l as ArrayList,r as Collection,n as CollectionException,u as LinkedList,a as List,o as ListIterator,h as Node,x as PriorityNode,z as PriorityQueue,m as Queue,p as QueueException,d as Stack,c as StackException};
