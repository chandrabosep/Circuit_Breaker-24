const { ApiSdk } = require("@bandada/api-sdk");

const bandadaApi = new ApiSdk("https://api.bandada.pse.dev");

export async function addMemberByApiKey(
  groupId: any,
  memberId: any,
  apiKey: any
) {
  try {
    await bandadaApi.addMemberByApiKey(groupId, memberId, apiKey);
  } catch (error) {
    console.error(error);
  }
}
