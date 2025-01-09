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

  find(value){
    let nodeToDel = this.#_recFind(this.root, value);
    console.log(nodeToDel);
  }
  #_recFind(root, value){
    if(root == null) return 'Node not found';
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

}
