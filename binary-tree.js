'use strict';

//most of these solutions are not optimal quite yet. soon though.

function Tree() {
  this.root = null;
};


//add nodes to a tree
Tree.prototype.add = function(value) {
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

  function iterateTree() {
    if(value > current.value && current.right === null) {
      current.right = node;
      return console.log('added ', current.right);
    } else if(value <= current.value && current.left === null) {
      current.left = node;
      return console.log('added ', current.left);
    } else if(value > current.value && current.right !== null){
      current = current.right;
      iterateTree();
    } else if(value <= current.value && current.left !== null) {
      current = current.left;
      iterateTree();
    } else {
      return console.log('invalid value');
    }
  }
  iterateTree();
};

var tree = new Tree();
tree.add(4);
tree.add(2);
tree.add(3);
tree.add(3);
tree.add(2);
tree.add(1);
tree.add(9);
tree.add(3);
tree.add(15);
console.log(tree.root);



Tree.prototype.traverseTree = function() {
  var current = this.root;

  function traverse(current) {
    if(current.left) {
      traverse(current.left);
    }
    console.log(current.value + " " + current.left + " " + current.right);
    if(current.right) {
      traverse(current.right);
    }
  }

  traverse(current);
};
tree.traverseTree();


//call a function on each node
Tree.prototype.each = function(f) {
  if(!this.root) {
    return console.log('no nodes on tree ', this);
  }

  function traverse(node) {
    if(node.left) {
      traverse(node.left);
    }
    f(node.value);
    if(node.right) {
      traverse(node.right);
    }
  };
  traverse(this.root);

};

tree.each(function(p) {
  console.log(p);
});


//check if value is a part of the tree if isn't, add it
Tree.prototype.checkValue = function(value) {
  var newNode = {
    value: value,
    left: null,
    right: null
  }

  function findValue(node, value) {
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
      } else {
        findValue(node.right, value);
      }
    } else {
      return console.log('nothing happened. fix your shit.');
    }
  }
  findValue(this.root, value);
};
tree.checkValue(13);
console.log(tree.root);


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

tree.isBinary(tree.root);


//closest value to a given value.
//doesn't work yet.
Tree.prototype.closest = function(value) {
  var currentDistance = value - this.root.value;
  currentDistance = (currentDistance < 0) ? currentDistance * -1 : currentDistance;
  var closestDistance = currentDistance;
  var closestValue = this.root.value;
  var value = value;

  console.log(closestDistance);

  function traverse(currentNode) {
    console.log(currentNode);

    //check if value matches
    if(value == currentNode.value) {
      return console.log('closest value: ', currentNode.value);
    }

    //update current distance
    currentDistance = value - currentNode.value;
    currentDistance = (currentDistance < 0) ? currentDistance * -1 : currentDistance;

    //check if current distance is smaller than closest distance
    if(currentDistance < closestDistance) {
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
  return console.log(closestValue);
};
tree.closest(2);
