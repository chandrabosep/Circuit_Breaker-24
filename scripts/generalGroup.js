const { Identity } = require("@semaphore-protocol/identity");
const {
  addMemberByApiKey,
  getGroup,
  getMembersGroup,
} = require("../utils/bandadaApi");
const { generateProof, verifyProof } = require("@semaphore-protocol/proof");
const { Group } = require("@semaphore-protocol/group");
const {
  encodeBytes32String,
  toBigInt,
  decodeBytes32String,
  toBeHex,
} = require("ethers");
const supabase = require("../utils/supabaseClient");
require("dotenv").config();
const { getRoot } = require("../utils/useSemaphore");

const groupId = process.env.GENERAL_GROUP_ID;
const groupApiKey = process.env.GENERAL_API_KEY;

async function main() {
  const identity = new Identity("0x8B981ABeCC22ca0aB4DF11A25Cc00722dB2B25b8");
  console.log(identity.toString()); // Trapdoor and nullifier to display identity on frontend

  const commitment = identity.commitment;
  console.log(commitment);
  await addMemberByApiKey(groupId, commitment, groupApiKey);

  const bandadaGroup = await getGroup(groupId);
  const groupRoot = await getRoot(
    groupId,
    bandadaGroup.treeDepth,
    bandadaGroup.members
  );
  await supabase
    .from("root_history(1)")
    .insert([{ root: groupRoot.toString() }]);

  const users = await getMembersGroup(groupId);
  const group = new Group(groupId, 16, users);

  console.log(group);
  const feedback = "Hellow World";
  const signal = toBigInt(encodeBytes32String(feedback)).toString();
  console.log("signal is:", signal);

  const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
    identity,
    group,
    groupId,
    signal,
    {
      zkeyFilePath: "./semaphore.zkey",
      wasmFilePath: "./semaphore.wasm",
    }
  );
  console.log("merkleTreeRoot is:", merkleTreeRoot);

  console.log("supabase is:", supabase);

  const merkleTreeDepth = bandadaGroup.treeDepth;

  const { data: currentMerkleRoot, error: errorRootHistory } = await supabase
    .from("root_history(1)")
    .select()
    .order("created_at", { ascending: false })
    .limit(1);

  if (errorRootHistory) {
    console.log(errorRootHistory);
    res.status(500).end();
    return;
  }

  if (!currentMerkleRoot) {
    errorLog = "Wrong currentMerkleRoot";
    console.error(errorLog);
    return;
  }

  if (merkleTreeRoot !== currentMerkleRoot[0].root) {
    // compare merkle tree roots
    const { data: dataMerkleTreeRoot, error: errorMerkleTreeRoot } =
      await supabase
        .from("root_history(1)")
        .select()
        .eq("root", merkleTreeRoot);

    if (errorMerkleTreeRoot) {
      console.log(errorMerkleTreeRoot);
      res.status(500).end();
      return;
    }

    if (!dataMerkleTreeRoot) {
      errorLog = "Wrong dataMerkleTreeRoot";
      console.error(errorLog);
      return;
    }

    if (dataMerkleTreeRoot.length === 0) {
      errorLog = "Merkle Root is not part of the group";
      console.log(errorLog);
      return;
    }

    console.log("dataMerkleTreeRoot", dataMerkleTreeRoot);

    const merkleTreeRootDuration = group.fingerprintDuration;

    //

    if (
      dataMerkleTreeRoot &&
      Date.now() >
        Date.parse(dataMerkleTreeRoot[0].created_at) + merkleTreeRootDuration
    ) {
      errorLog = "Merkle Tree Root is expired";
      console.log(errorLog);
      return;
    }
  }

  const { data: nullifier, error: errorNullifierHash } = await supabase
    .from("nullifier_hash(1)")
    .select("nullifier")
    .eq("nullifier", nullifierHash);

  if (errorNullifierHash) {
    console.log(errorNullifierHash);
    res.status(500).end();
    return;
  }

  if (!nullifier) {
    errorLog = "Wrong nullifier";
    console.log(errorLog);
    return;
  }

  if (nullifier.length > 0) {
    errorLog = "You are using the same nullifier twice";
    console.log(errorLog);
    return;
  }

  const isVerified = await verifyProof(
    {
      merkleTreeRoot,
      nullifierHash,
      externalNullifier: groupId,
      signal: signal,
      proof,
    },
    merkleTreeDepth
  );

  if (!isVerified) {
    const errorLog = "The proof was not verified successfully";
    console.error(errorLog);
    return;
  }

  const { error: errorNullifier } = await supabase
    .from("nullifier_hash(1)")
    .insert([{ nullifier: nullifierHash }]);

  if (errorNullifier) {
    console.error(errorNullifier);
    res.status(500).end();
    return;
  }

  const { data: dataFeedback, error: errorFeedback } = await supabase
    .from("feedback(1)")
    .insert([{ signal: signal }])
    .select()
    .order("created_at", { ascending: false });

  if (errorFeedback) {
    console.error(errorFeedback);
    return;
  }

  if (!dataFeedback) {
    const errorLog = "Wrong dataFeedback";
    console.error(errorLog);
    return;
  }

  const { data, error } = await supabase
    .from("feedback(1)")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    console.log("Feedbacks:");
    data.forEach((feedbackItem) => {
      const decodedFeedback = decodeBytes32String(toBeHex(feedbackItem.signal));
      console.log(decodedFeedback);
    });
  }
}

main();
