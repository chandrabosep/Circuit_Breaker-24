const { ApiSdk } = require("@bandada/api-sdk");

const bandadaApi = new ApiSdk(process.env.BANDADA_API_URL);

async function getGroup(groupId) {
  try {
    return await bandadaApi.getGroup(groupId);
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.statusText);
    } else {
      alert("Some error occurred!");
    }

    return null;
  }
}

async function addMemberByApiKey(groupId, memberId, apiKey) {
  try {
    await bandadaApi.addMemberByApiKey(groupId, memberId, apiKey);
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.statusText);
    } else {
      alert("Some error occurred!");
    }
  }
}

async function getMembersGroup(groupId) {
  try {
    const group = await bandadaApi.getGroup(groupId);
    return group.members;
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.statusText);
    } else {
      alert("Some error occurred!");
    }

    return null;
  }
}

async function isMember(groupId, commitment) {
  const isMember = await bandadaApi.isGroupMember(groupId, commitment); // commitment = memberId
  return isMember; // boolean: true or false
}

module.exports = { getGroup, addMemberByApiKey, getMembersGroup, isMember };
