import{BaseException as e,compare as t,ComparisonResult as s,OutOfBoundsException as i}from"@chaperone/util";
/**
 * Collection
 *
 * A Generic collection class
 */class n{_size;constructor(){this._size=0}get size(){return this._size}
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
     */setSize(e){this._size=e}}
/**
 * CollectionException
 *
 * A generic collection error.
 */class r extends e{constructor(e="Collection error"){super(e)}}
/**
 * Node
 *
 * A Generic Node.
 */class h{value;_next;compare;constructor(e,s=null,i=null){this.value=e,this._next=s,this.compare=i||t}get hasNext(){return null!==this.next}get next(){return this._next}set next(e){this._next=e}compareTo(e){let t;switch(this.compare(this.value,e)){case-1:t=s.Less;break;case 1:t=s.Greater;break;default:t=s.Same}return t}}class a extends n{constructor(){super()}}
/**
 * ListIterator
 *
 * A List Iterator
 */class u{index;done;values;constructor(e){this.values=e,this.index=0,this.done=!1}next(){if(this.done)return{done:this.done,value:void 0};if(this.index===this.values.length)return this.done=!0,{done:this.done,value:void 0};const e=this.values[this.index];return this.index+=1,{done:!1,value:e}}}
/**
 * LinkedList
 *
 * A Linked List.
 */class l extends a{head;comparator;iteratorNode;constructor(e=null){super(),this.head=null,this.comparator=e,this.iteratorNode=null}[Symbol.iterator](){return new u(this.toArray())}
/**
     * add()
     *
     * adds the value to the list.
     * @param value the value to add to the list.
     */add(e){const t=new h(e,null,this.comparator);this.head?this.addToEnd(this.head,t):this.head=t,this.setSize(this.size+1)}
/**
     * addToEnd()
     *
     * adds the newNode to the end of the list.
     * @param node the current node
     * @param newNode the node to insert.
     */addToEnd(e,t){e.next?this.addToEnd(e.next,t):e.next=t}
/**
     * contains()
     *
     * determines if the item is in the list.
     * @param value the item to search for.
     * @returns TRUE if the item is in the list. FALSE if it is not.
     */contains(e){return!this.isEmpty&&this.containsValue(this.head,e)}
/**
     * containsValue()
     *
     * determines if the list ontains the specified value.
     * @param head the head of the list to search.
     * @param value The value to search for.
     * @returns
     */containsValue(e,t){return!!e&&(e.compareTo(t)===s.Same||this.containsValue(e.next,t))}
/**
     * clear()
     *
     * clears the linked list.
     */clear(){this.head=null,super.clear()}find(e){return this.findValue(this.head,e)}
/**
     * findValue(
     *
     * a helper function to recursively find the first list item to satisfy the predicate function.
     * @param head the head of the list to search
     * @param predicate the predicate function
     * @returns the first item on the list to satisfy the predicate function.
     */findValue(e,t){return e?t(e.value)?e.value:this.findValue(e.next,t):null}findAll(e){return this.findAllValues(new l,this.head,e)}
/**
     * findAllVlaues()
     *
     * finds all the values in the list that satisfies the predicate.
     * @param resultlist the linked list containing all the results of the search.
     * @param head the head of the list to search
     * @param predicate the predicate function
     * @returns a linked list containing the items that satisfy the predicate.
     */findAllValues(e,t,s){return t?(s(t.value)&&e.add(t.value),this.findAllValues(e,t.next,s)):e}findLast(e){return this.findLastValue(this.head,null,e)}
/**
     * findLastValue()
     *
     *
     * @param head the head of the list to search
     * @param current the current last value.
     * @param predicate the predicate function.
     * @returns the last value in the list to satisfy the predicate.
     */findLastValue(e,t,s){if(e){let i=t;return s(e.value)&&(i=e.value),this.findLastValue(e.next,i,s)}return t}
/**
     * get()
     *
     * gets the value at the specified index.
     * @param index the index of the value to retrieve.
     * @returns the value at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */get(e){if(!this.isEmpty&&e>=0&&e<=this.size)return this.getValue(this.head,0,e);throw new i}
/**
     * getValue()
     *
     * recursively gets the value at the specified target index.
     * @param head the head of the list.
     * @param index the current index
     * @param target the target index.
     * @returns the value at the specified target index.
     */getValue(e,t,s){return t===s?e.value:this.getValue(e.next,t++,s)}
/**
     * indexOf()
     *
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */indexOf(e){let t=-1;if(!this.isEmpty){let i=0,n=this.head;do{n.compareTo(e)===s.Same?t=i:(i++,n=n.next)}while(t<0&&i<this.size)}return t}
/**
     * lastIndexOf()
     *
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */lastIndexOf(e){let t=-1;if(!this.isEmpty){let i=0,n=this.head;do{n.compareTo(e)===s.Same&&(t=i),i++,n=n.next}while(null!==n)}return t}
/**
     * remove()
     *
     * removes the value at the specified index.
     * @param index the index of the value to remove.
     * @returns the removed items.
     * @throws OutOfBoundsException when the index is out of bounds.
     */remove(e){if(!this.isEmpty&&e>=0&&e<this.size)return this.reemoveValue(this.head,null,0,e);
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
     */reemoveValue(e,t,s,i){return s===i?(
// remove the current node.
t?
// we are in the tail of the list.
t.next=e.next:
// we are at the head of the list.
this.head=e.next,this.setSize(this.size-1),e.value):this.reemoveValue(e.next,e,s++,i)}toArray(){const e=[];let t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}}
/**
 * ArrayList
 *
 * An Array List.
 */class o extends a{items;comparator;_iteratorPos;constructor(e=[],s=t){super(),this.items=e,this.setSize(e.length),this._iteratorPos=0,this.comparator=s}[Symbol.iterator](){return new u(this.toArray())}
/**
     * add()
     *
     * adds an item to the array list.
     * @param item the item to add to the array list.
     */add(e){this.items.push(e),this.setSize(this.size+1)}
/**
     * contains()
     *
     * determines if the item is in the array list.
     * @param item the item to search for.
     * @returns TRUE if the item is in the list. FASLE if it is not.
     */contains(e){return void 0!==this.items.find((t=>0===this.comparator(e,t)))}
/**
     * clear()
     *
     * clears the array list.
     */clear(){this.items=[],super.clear()}find(e){return this.items.find((t=>e(t)))||null}findAll(e){const t=new o;return this.items.forEach((s=>{e(s)&&t.add(s)})),t}findLast(e){let t=null;for(let s=this.size-1;s>=0;s--)if(e(this.items[s])){t=this.items[s];break}return t}
/**
     * get()
     *
     * gets the element at the specified index.
     * @param index the index of the item to get.
     * @returns the element at the specified index.
     * @throws OutOfBoundsException when the index is out of bounds.
     */get(e){if(!this.isEmpty&&e>=0&&e<this.size)return this.items[e];throw new i}
/**
     * indexOf()
     *
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */indexOf(e){let t=-1,s=0;for(s=0;s<this.size;s++)0===this.comparator(this.items[s],e)&&(t=s);return t}
/**
     * lastIndexOf()
     *
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */lastIndexOf(e){let t=-1,s=this.size-1;for(s=this.size-1;s>=0;s--)0===this.comparator(this.items[s],e)&&(t=s);return t}
/**
     * remove()
     *
     * removes the item at the specified index.
     * @param index the index of the item to remove.
     * @returns the item that was removed.
     * @throws OutOfBoundsException when the index is out of bounds.
     */remove(e){if(!this.isEmpty&&e>=0&&e<this.size){const t=this.items.splice(e,1);return this.setSize(this.size-1),t[0]}throw new i}toArray(){return this.items.map((e=>e))}}
/**
 * StackException
 *
 * A stack error.
 */class d extends r{constructor(e="Stack exception"){super(e)}}
/**
 * Stack
 *
 * A stack.
 */class c extends n{top;compareFn;constructor(e=null){super(),this.top=null,this.compareFn=e}
/**
     * add()
     *
     * adds the value to the stack.
     * @param value the value to add to the stack.
     */add(e){this.push(e)}
/**
     * contains()
     *
     * determines if the value is contained in the stack.
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. FALSE otherwise.
     */contains(e){return this.containsValue(this.top,e)}
/**
     * containsValue()
     *
     * recursively determines if the value is in the stack.
     * @param top the top of the stack
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. False otherwise
     */containsValue(e,t){return!!e&&(e.compareTo(t)===s.Same||this.containsValue(e.next,t))}
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
throw new d;return this.top.value}
/**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */pop(){if(this.isEmpty)
// nothing to pop
throw new d;{const e=this.top.value;return this.top=this.top.next,this.setSize(this.size-1),e}}
/**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */push(e){const t=new h(e,this.top,this.compareFn);this.top=t,this.setSize(this.size+1)}
/**
     * remove()
     *
     * alias to pop()
     * @throws StackException when the stack is empty.
     */remove(){return this.pop()}toArray(){const e=[];let t=this.top;for(;null!==t;)e.push(t.value),t=t.next;return e}}
/**
 * QueueException
 *
 * A queue error
 */class p extends r{constructor(e="Queue error"){super(e)}}
/**
 * Queue
 *
 * A Queue.
 */class m extends n{head;tail;compareFn;constructor(e=null){super(),this.head=null,this.tail=null,this.compareFn=e}
/**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     */add(e){this.enqueue(e)}
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
     */contains(e){return this.containsValue(this.head,e)}
/**
     * containsValue()
     *
     * recursively determines if the value is contained in the queue.
     * @param node the node to check.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the node. FALSE otherwise.
     */containsValue(e,t){return!!e&&(e.compareTo(t)===s.Same||this.containsValue(e.next,t))}
/**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */dequeue(){if(this.head){const e=this.head.value;return this.head=this.head.next,this.head||(this.tail=null),this.setSize(this.size-1),e}
// nothing to remove.
throw new p}
/**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */enqueue(e){const t=new h(e,null,this.compareFn);this.tail&&(this.tail.next=t),this.tail=t,this.head||(this.head=t),this.setSize(this.size+1)}
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
     */remove(){return this.dequeue()}toArray(){const e=[];let t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}}
/**
 * PriorityNode
 *
 * A node with a priority.
 */class x extends h{priority;constructor(e,t,s=null,i=null){super(e,s,i),this.priority=t}get next(){return super.next}set next(e){super.next=e}}
/**
 * PriorityQueue
 *
 * A priorityQueue.
 */class f extends n{head;compareFn;constructor(e=null){super(),this.compareFn=e,this.head=null}
/**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value. Defaults to 0.
     */add(e,t=0){this.enqueue(e,t)}
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
     */contains(e){return this.containsValue(this.head,e)}containsValue(e,t){return!!e&&(e.compareTo(t)===s.Same||this.containsValue(e.next,t))}
/**
     * dequeue()
     *
     * removes the next value from the queue.
     */dequeue(){if(this.head){let e=this.head;return this.head=this.head.next,this.setSize(this.size-1),e.value}
// nothing to remove.
throw new p}
/**
     * enqueue()
     *
     * adds a value to the queue.
     * @param value the value to add.
     * @param priority the priority of the value.
     */enqueue(e,t=0){const s=new x(e,t,null,this.compareFn);if(!this.head||t>this.head.priority)s.next=this.head,this.head=s;else{let e=this.head;for(;e.next&&e.next.priority>t;)e=e.next;s.next=e.next,e.next=s}this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new p}remove(){return this.dequeue()}toArray(){const e=[];let t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}}export{o as ArrayList,n as Collection,r as CollectionException,l as LinkedList,a as List,u as ListIterator,h as Node,x as PriorityNode,f as PriorityQueue,m as Queue,p as QueueException,c as Stack,d as StackException};
