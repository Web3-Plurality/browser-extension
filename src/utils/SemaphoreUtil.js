//import { Group } from "@semaphore-protocol/group"
//import { generateProof } from "@semaphore-protocol/proof"
//import { formatBytes32String } from "ethers/lib/utils"

export const generateFullProof = (identity, group, groupId, signal) => {
    console.log(`HERE ${identity}`);

    // TODO: Need to get current group state and group id from dApp's verifier
    /*const fullProof = await generateProof(identity, window.group, window.groupId, signal);

    console.log(`MerkleTreeRoot: ${fullProof.merkleTreeRoot} \n
    NullifierHash: ${fullProof.nullifierHash} \n
    ExternalNullifier: ${fullProof.externalNullifier} \n
    Proof: ${fullProof.proof}`)*/

   // TODO: Need to send fullProof to dApp

   return "Sample Full Proof";   //TODO: Need to change it to full proof
  };
