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

// 如果需要在其他文件中使用这些函数，可以使用 module.exports 进行导出
module.exports = { getGroup, addMemberByApiKey, getMembersGroup };
