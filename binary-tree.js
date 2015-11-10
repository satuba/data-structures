'use strict';

function Tree() {
  this.root = null;
};


//add nodes to a tree using a loop
Tree.prototype.add = function(value) {
  var current = this.root;
  var node = {
      value: value,
      left: null,
      right: null
    };

  if(this.root === null) {
    this.root = node;
    return console.log('added the first node ', node);
  }
  while(current) {
    if(value > current.value) {
      if(current.right == null) {
        current.right = node;
        return console.log('added: ', node);
      } else {
        current = current.right;
      }
    } else if(value < current.value) {
      if(current.left == null) {
        current.left = node;
        return console.log('added: ', node);
      } else {
        current = current.left;
      }
    } else {
      return console.log('binary search tree cannot have duplicates');
    }
  }

};

var tree = new Tree();
tree.add(4);
tree.add(2);
tree.add(3);
tree.add(13);
tree.add(3);
tree.add(5);
console.log(tree.root);


//call a function on each node
Tree.prototype.each = function(f) {
  var current = this.root;

  if(!this.root) {
    return console.log('your tree is empty');
  }

  function traverse(current) {
    if(current.left) {
      traverse(current.left);
    }
    f(current);
    if(current.right) {
      traverse(current.right);
    }
  }

  traverse(current);
};

tree.each(function(current){
  console.log('called this! value:', current.value);
});

var tree2 = new Tree();
tree2.each(function() {
  console.log('call this?'); //nope
})


// find out if value is part of the tree
// f is optional function to be called if value found, otherwise just tell that value is found
Tree.prototype.contains = function(value, f) {
  var current = this.root;

  while(current) {
    if(value === current.value) {
      if(f) {
        return f();
      } else {
        return console.log('node found: ', value);
      }
    }
    if(value > current.value) {
      current = current.right;
    } else if(value < current.value) {
      current = current.left;
    }
  }
  return console.log('node not found');
};

var fun = function() {
  console.log('this node was found and this function was called!');
};

tree.contains(4);
tree.contains(4, fun);
tree.contains(22);
tree2.contains(2);


//add nodes to a tree using recursion
Tree.prototype.add2 = function(value) {
  var current = this.root;
  var node = {
      value: value,
      left: null,
      right: null
    };

  if(this.root === null) {
    this.root = node;
    return console.log('added the first node ', node.value);
  }

  function traverse(current) {
    if(value > current.value) {
      if(current.right === null) {
        current.right = node;
        return console.log('added ', current.right);
      }
      traverse(current.right);
    } else if(value < current.value) {
      if(current.left === null) {
        current.left = node;
        return console.log('added ', current.left);
      }
      traverse(current.left);
    } else {
      return console.log('cannot have duplicates in binary search tree');
    }
  };
  traverse(current);
};
tree.add2(14);
tree.add2(15);
console.log(tree.root);


//check if value is a part of the tree if isn't, add it
Tree.prototype.checkValue = function(value) {
  var newNode = {
    value: value,
    left: null,
    right: null
  }

  function findValue(node) {
    if(value == node.value) {
      return console.log('found it!');
    } else if(value < node.value) {
      if(!node.left){
        node.left = newNode;
        return console.log('new node added ', newNode);
      }
      findValue(node.left, value);
    } else if(value > node.value) {
      if(!node.right){
        node.right = newNode;
        return console.log('new node added ', newNode);
      }
      findValue(node.right, value);
    }
  }
  findValue(this.root);
};
tree.checkValue(13);
tree.checkValue(1);
console.log(tree.root);


//function that tells how many nodes the tree has
Tree.prototype.getSize = function() {
  var counter = 0;
  this.each(function() {
    counter ++;
  });
  console.log(counter);
};
tree.getSize();


//turn a tree into an array
Tree.prototype.toArray = function() {
  var array = [];
  this.each(function(node) {
    array.push(node.value);
  });
  console.log(array);
};
tree.toArray();


//remove node from tree if matches given value
Tree.prototype.remove = function(value) {
  var root = this.root;

  function findNode(node) {
    if(value == node.value){
      return console.log('gotta remove this');//remove node
    } else if(value > node.value){
      if(node.right) {
        return findNode(node.right);
      } else {
        return console.log('RIGTHcannot remove something that does not exist');
      }
    } else if (value < node.value){
      if(node.left) {
        return findNode(node.left);
      } else {
        return console.log('cannot remove something that does not exist');
      }
    }
  }
  findNode(root);

}
tree.remove(2);


//check if a tree is a binary search tree
Tree.prototype.isBinary = function(node) {
  var root = this.root;
  if(!root.value) {
    return console.log('No nodes in this tree. Not a binary search tree');
  }

  function traverse2(node) {
    if(node.left != null) {
      traverse2(node.left);
    }
    var keys = Object.keys(node);
    if(keys[3] || (!keys[2] || keys[0] !== 'value')) {
      return console.log('not a binary search tree');
    }
    if(node.right != null) {
      traverse2(node.right);
    }
  }

  traverse2(root);
  return console.log('binary search tree');
};

// tree.isBinary(tree.root);


//closest value to a given value.
//doesn't work yet.
Tree.prototype.closest = function(value) {
  var closestDistance;
  var currentDistance;
  if(value > this.root.value) {
    closestDistance = value - this.root.value;
  } else {
    closestDistance = this.root.value - value;
  }

  closestDistance = (closestDistance < 0) ? closestDistance * -1 : currentDistance;
  var currentDistance = closestDistance;
  var closestValue = this.root.value;
  var value = value;


  function traverse(currentNode) {
    console.log(currentNode);

    //check if value matches
    if(value == currentNode.value) {
      return console.log('closest value: ', currentNode.value);
    }

    //update current distance
    currentDistance = value - currentNode.value;
    currentDistance = (currentDistance < 0) ? currentDistance * -1 : currentDistance;
    console.log(currentDistance);
    //check if current distance is smaller than closest distance
    if(currentDistance < closestDistance) {
      console.log('jajaj');
      closestDistance = currentDistance;
      closestValue = currentNode.value;
    }

    //traverse
    if(value < currentNode.value && currentNode.left != null) {
      traverse(currentNode.left);
    }
    console.log('');
    if(value > currentNode.value && currentDistance.right != null) {
      traverse(currentNode.right);
    }
  };
  traverse(this.root);
  console.log(closestDistance);
  return console.log(closestValue);
};
// tree.closest(8);
