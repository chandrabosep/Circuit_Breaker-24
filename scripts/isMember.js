const { isMember } = require("../utils/bandadaApi");
require("dotenv").config();

async function isGroupMember() {
  const commitment =
    "16513006464121595619261112871680369687857691438480259642617929946233445421661";
  const groupId = process.env.GROUP_ID;

  const result = await isMember(groupId, commitment);
  console.log("result is:", result);
}
isGroupMember();
