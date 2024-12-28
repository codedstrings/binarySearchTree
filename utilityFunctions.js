//function that shows the binary tree in tree like structure in console
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function inorder(root, inorderArr = []) {
  if(root!=null){
    inorder(root.left, inorderArr);
    inorderArr.push(root.data);
    inorder(root.right, inorderArr);
  }
  return inorderArr;
}
export { prettyPrint, inorder };
