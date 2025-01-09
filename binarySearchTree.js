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

}
