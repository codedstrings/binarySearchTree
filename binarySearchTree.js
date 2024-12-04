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
}
