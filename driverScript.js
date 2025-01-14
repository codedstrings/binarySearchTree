import { Tree } from "./binarySearchTree.js";
import { prettyPrint, inorder, generateRandomArray } from "./utilityFunctions.js";

// 1. Create a binary search tree from random numbers < 100
console.log("Step 1: Creating tree with random numbers < 100");
const randomArr = generateRandomArray(10, 100);
const tree = new Tree(randomArr);
console.log("Random array:", randomArr);

// 2. Confirm tree is balanced
console.log("\nStep 2: Checking if tree is balanced");
console.log("Tree balanced:", tree.isBalanced());

// 3. Print out all elements
console.log("\nStep 3: Printing all elements");
console.log("Level Order:");
tree.levelOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nPre Order:");
tree.preOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nPost Order:");
tree.postOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nIn Order:");
tree.inOrder((node) => process.stdout.write(node.data + " "));

// 4. Unbalance tree by adding several numbers > 100
console.log("\n\nStep 4: Unbalancing tree with numbers > 100");
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

// 5. Confirm tree is unbalanced
console.log("\nStep 5: Checking if tree is now unbalanced");
console.log("Tree balanced:", tree.isBalanced());

// 6. Balance the tree
console.log("\nStep 6: Rebalancing tree");
tree.rebalance();

// 7. Confirm tree is balanced
console.log("\nStep 7: Confirming tree is balanced again");
console.log("Tree balanced:", tree.isBalanced());

// 8. Print out all elements
console.log("\nStep 8: Printing all elements of balanced tree");
console.log("Level Order:");
tree.levelOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nPre Order:");
tree.preOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nPost Order:");
tree.postOrder((node) => process.stdout.write(node.data + " "));

console.log("\n\nIn Order:");
tree.inOrder((node) => process.stdout.write(node.data + " "));