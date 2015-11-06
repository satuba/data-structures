function LinkedList(){
  this.head = null;
  this.length = 0;//optional, for checking the length of the list
};

//add nodes to the end of the linked list
LinkedList.prototype.addAfter = function(value) {
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
  this.length += 1;//after every addition, increase length by one
  return console.log("added: ", node);
};

//add nodes, see the whole list and check length
var linkedList = new LinkedList();
console.log('add nodes...');
linkedList.addAfter('c');

//add node to the front of the linked list
LinkedList.prototype.addFirst = function(value) {
  var oldHead = this.head;
  var newHead = {
    value: value,
    next: oldHead
  }
  this.length += 1;
  this.head = newHead;
  return console.log('added new head: ', this.head);
};
linkedList.addFirst('a');

//add a node to a wanted index
LinkedList.prototype.addToIndex = function(index, value) {
  var current = this.head;
  var indexCounter = 0;
  var previousIndex = index - 1;
  var temporary;

  if(index > this.length-1 || index < 0) {
    return console.log('last index is ' + (this.length-1) + ' and you wanted to add to index ' + index);
  } else if(index === 0) {
    var oldHead = this.head;
    var newHead = {
      value: value,
      next: oldHead
    }
    this.head = newHead;
    indexCounter += 1;
    return console.log('added a node "' + value + '" to index ' + index);
  } else {
    while(current) {
      if(indexCounter === previousIndex) {
        restOfTheList = current.next;
        current.next = {
          value: value,
          next: restOfTheList
        };
        indexCounter += 1;
        return console.log('added a node "' + value + '" to index ' + index);
      }
      current = current.next;
    }
  }

};

linkedList.addToIndex(1, 'b');
linkedList.addAfter('d');
console.log("whole list: ", linkedList.head);

//peek to see the value a specific index
LinkedList.prototype.peekIndex = function(index) {
  console.log('peeking...');
  if(index > this.length-1 || index < 0) {
    return console.log('last index is ' + (this.length-1) + ' and you wanted to see index ' + index);
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

//check if specific value exists in the list
LinkedList.prototype.checkValue = function(value) {
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
linkedList.checkValue('b');
linkedList.checkValue('x');


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
  var current = this.head;
  var values = [];
  var index;

  //collect values into an array
  while(current){
    values.push(current.value);
    current = current.next;
  }
  index = values.length-1;

  //build linked list from an array
  this.head = {
    value: values[index],
    next: null
  };
  index -= 1;
  current = this.head;
  while(index >= 0) {
    current.next = {
      value: values[index],
      next: null
    };
    current = current.next;
    index -= 1;
  }
  return console.log(this.head);
};
linkedList2.reverse();

//remove a node with wanted value (if found)
