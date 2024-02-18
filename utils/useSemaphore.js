const { Group } = require("@semaphore-protocol/group");

async function getRoot(groupId, treeDepth, members) {
  const group = new Group(groupId, treeDepth, members);
  return group.root;
}

module.exports = { getRoot };

