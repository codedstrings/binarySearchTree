// import { prettyPrint } from "./utilityFunctions.js";
export class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr = []) {
    if (!Array.isArray(arr)) {
      throw new Error("Input must be an array");
    }
    arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(arr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    console.log(`Building tree for range: ${start} to ${end}`);

    //base condition
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  }

  //#region insert
  insert(value){
    if(!this.root){
      this.root = new Node(value);
      return;
    }
      this.#_recInsert(this.root, value);
  }

  #_recInsert(root, value){
    //base case
    if(root == null){
      return new Node(value);
    }

    // Recursively insert into left or right subtree
    if(value < root.data){
      root.left = this.#_recInsert(root.left, value)
    }
    else if (value > root.data){
      root.right = this.#_recInsert(root.right, value);
    }
    return root; //also ignores duplicates
  }
//#endregion

  //#region find
  find(value){
    let node =  this.#_recFind(this.root, value);
    return node? node : 'Node not found';
  }
  #_recFind(root, value){
    if(root == null) return root;
    if(root.data == value){
      return root //node found
    }
    else if(value < root.data){
      return this.#_recFind(root.left, value);
    } 
    else if(value > root.data){
      return this.#_recFind(root.right, value);
    }
  }
  //#endregion

  //#region delete
  delete(value){
    this.root = this.#_recDelete(this.root, value);
    // prettyPrint(this.root);//for testing
  }
  #_recDelete(root, value){ 
    //base case: tree empty or value not found
    if(root == null) return root;

    // Recursively delete from left or right subtree
    if(value < root.data){
      root.left = this.#_recDelete(root.left, value);
    }
    else if(value > root.data){
      root.right = this.#_recDelete(root.right, value);
    }
    else{
      //node found; handling 3 cases: 

      //1. leaf node
      if(root.left == null && root.right == null){
        return null
      }

      //2. node with one child
      if(root.left == null){
        return root.right;
      }
      if(root.right == null){
        return root.left;
      }

      // 3. node with two children
      // Find the inorder successor of the node
      let succ = this.#_findMin(root.right);
      root.data = succ.data;
      root.right = this.#_recDelete(root.right, succ.data);
    }
    return root;
  }
 
  #_findMin(root){
    let current = root;
    while(current.left != null){
      current = current.left;
    }
    return current
  }
  //#endregion

  //#region levelOrder
  getLevelOrderArr(){
    let result = [];
    let queue = [];

    if(this.root == null) return result; //handle empty tree

    queue.push(this.root);//initialize queue with root
    while(queue.length > 0){
      let node = queue.shift();
      result.push(node.data);
      if(node.left != null) queue.push(node.left);
      if(node.right != null) queue.push(node.right);
    }
    return result;
  }

  levelOrder(callBack){
    if(callBack == null) {
      throw new Error("Callback function is required");
    }
    if(this.root == null) {
      throw new Error("Tree is empty");
    };

    let queue = [];
    queue.push(this.root);//initialize queue with root
    while(queue.length > 0){
      let node = queue.shift();
      callBack(node);
      if(node.left != null) queue.push(node.left);
      if(node.right != null) queue.push(node.right);
    }
  }
  //#endregion

  //#region inorder
  inorder(callBack){
    if(callBack == null) {
      throw new Error("Callback function is required");
    }
    if(this.root == null) {
      throw new Error("Tree is empty");
    };
    const recInorder = (root, callBack) => {
      if(root!=null){
        recInorder(root.left, callBack);
        callBack(root);
        recInorder(root.right, callBack);
      }
    }
    recInorder(this.root, callBack);
  }

  //better code organization example: inorder
  // inorder(callback) {
  //   let result = [];
  //   const recInorder = (root) => {
  //     if (root != null) {
  //       recInorder(root.left);
  //       result.push(root.data);
  //       recInorder(root.right);
  //     }
  //   };
  //   recInorder(this.root);
  //   return callback ? result.forEach(callback) : result;
  // }
  //#endregion

  //#region preOrder
  preOrder(callBack){
    if(callBack == null) {
      throw new Error("Callback function is required");
    }
    if(this.root == null) {
      throw new Error("Tree is empty");
    };
    const recPreorder = (root, callBack) => {
      if(root!=null){
        callBack(root);
        recPreorder(root.left, callBack);
        recPreorder(root.right, callBack);
      }
    }
    recPreorder(this.root, callBack);
  }
  //#endregion

  //#region postOrder
  postOrder(callBack){
    if(callBack == null) {
      throw new Error("Callback function is required");
    }
    if(this.root == null) {
      throw new Error("Tree is empty");
    };
    const recPostorder = (root, callBack) => {
      if(root!=null){
        recPostorder(root.left, callBack);
        recPostorder(root.right, callBack);
        callBack(root);
      }
    }
    recPostorder(this.root, callBack);
  } 
  //#endregion

  //#region height
  height(node){
    if(node == null) return -1;
    if(node.left == null && node.right == null) return 0;

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }
  //#endregion
  
  //#region depth
  depth(node){
    // Handle the case where the input node is null
    if (node == null) return -1;
    
    // iterative implementation
    let depth = 0;
    let current = this.root;
    while(current != null){
      if(current.data == node.data) return depth; //node found 
      if(node.data < current.data){
        current = current.left; //move to left child
      }
      else{
        current = current.right; //move to right child
      }
      depth++;
    }
    return -1; //node not found


    //recursive implementation
    const recSearch = (root, value, depth) => {
      // If we reach a null node, return -1
      if(root == null) return -1; 

      // If we find the node, return the depth
      if(root.data == value) return depth; 

      if(value < root.data){
        return recSearch(root.left, value, depth+1); //search left subtree
      }else if(value > root.data){
        return recSearch(root.right, value, depth+1); //search right subtree
      }
    }
    return recSearch(this.root, node.data, 0);


  }
}
