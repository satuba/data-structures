function LinkedList(){
  this.head = null;
  this.length = 0;//optional, for checking the length of the list
};


//append to the linked list
LinkedList.prototype.append = function(value) {
  var node = {
    value: value,
    next: null
  }
  var current;

  if(this.head === null) {
    this.head = node;
  } else {
    current = this.head;
    while(current.next) {
      current = current.next;
    }
    current.next = node;
  }
  this.length += 1;
  return console.log("added: ", node);
};

var linkedList = new LinkedList();
console.log('add nodes...');
linkedList.append('c');
linkedList.append('d');
linkedList.append('e');


//prepend a node to the linked list
LinkedList.prototype.prepend = function(value) {
  var oldHead = this.head;
  var newHead = {
    value: value,
    next: oldHead
  }
  this.length += 1;
  this.head = newHead;
  return console.log('added new head: ', this.head);
};
linkedList.prepend('a');

//add a node to a wanted index
LinkedList.prototype.addToIndex = function(index, value) {
  var current = this.head;
  var indexCounter = 0;
  var previousIndex = index - 1;
  var listTail;

  if(index > this.length-1 || index < 0) {
    return console.log('Error. Last index is ' + (this.length-1) + ' and you wanted to add to index ' + index);
  } else if(index === 0) {
    var oldHead = this.head;
    this.head = {
      value: value,
      next: oldHead
    }
    indexCounter += 1;
    this.length += 1;
    return console.log('added a node "' + value + '" to index ' + index);
  } else {
    while(current) {
      if(indexCounter === previousIndex) {
        listTail = current.next;
        current.next = {
          value: value,
          next: listTail
        };
        this.length += 1;
        indexCounter += 1;
        return console.log('added a node "' + value + '" to index ' + index);
      }
      current = current.next;
    }
  }

};

linkedList.addToIndex(1, 'b');
console.log("whole list: ", linkedList.head);


//peek to see the value of a specific index
LinkedList.prototype.peekIndex = function(index) {
  console.log('peeking...');
  if(index > this.length-1 || index < 0) {
    return console.log('Error. The last index is ' + (this.length-1) + ' and you wanted to see index ' + index);
  }
  var counter = 0;
  var current = this.head;

  while(current.next != null){
    if(index === counter) {
      return console.log('value of index ' + index + " is", current.value);
    }
    current = current.next;
    counter += 1;
  }
  return console.log('value of index ' + index + " is", current.value + " and it's the last index of the list.");
};
linkedList.peekIndex(1);
linkedList.peekIndex(6);


//check if specific value is included in the list
LinkedList.prototype.includes = function(value) {
  var current = this.head;
  var counter = 0
  while(current){
    if(current.value === value) {
      return console.log("value " + value + " is on the index " + counter);
    }
    current = current.next;
    counter += 1;
  }
  return console.log("value " + value + " is not in the list");
};
linkedList.includes('b');
linkedList.includes('x');


//remove last node
LinkedList.prototype.removeLast = function() {
  var current = this.head;
  console.log(current);

  while(current.next != null) {
    if(current.next.next === null) {
      console.log("removed: ", current.next);
      this.length -= 1;
      return current.next = null;
    }
    current = current.next;
  }
};

console.log("length: " + linkedList.length);
linkedList.removeLast();
console.log("length: " + linkedList.length);
console.log(linkedList.head);


//remove first node
LinkedList.prototype.removeFirst = function() {
  this.head = this.head.next;
  this.length -= 1;
  console.log('first node removed');
};

linkedList.removeFirst();
console.log(linkedList.head);


//remove a node with wanted value (if found)
LinkedList.prototype.removeValue = function(value) {
  var current = this.head;
  var previous;

  if(current.value === value) {
    return this.head = current.next;
  }

  while(current) {
    if(value === current.value) {
      console.log('removed ' + value);
      this.length -= 1;
      return previous.next = current.next;
    }
    previous = current;
    current = current.next;
  }
  console.log('value ' + value + ' is not on the list');
};
linkedList.removeValue('a');
linkedList.removeValue('d');
console.log(linkedList.head);
console.log(linkedList.length);

//turn an array into a linked list
LinkedList.prototype.arrayToLinkedList = function(array) {
  this.head = {
    value: array[0],
    next: null
  };
  this.length += 1;
  var current = this.head;
  while(this.length < array.length) {
    current.next = {
      value: array[this.length],
      next: null
    }
    this.length += 1;
    current = current.next;
  }
};
var linkedList2 = new LinkedList();
linkedList2.arrayToLinkedList([1,2,3]);
console.log(linkedList2.head);
console.log(linkedList2.length);


//reverse a linked list
LinkedList.prototype.reverse = function() {
  console.log('reverssseeee');
  console.log(this.head);
  var current = this.head;
  var previous = null;
  var nextTemp;

  if(this.head.next === null) {
    return console.log('reversed ',this.head);
  }

  while(current != null){
    nextTemp = current.next;
    current.next = previous;
    previous = current;
    current = nextTemp;
  }
  this.head = previous;
  return console.log('reversed ',this.head);
}

linkedList2.reverse();
linkedList.reverse();
