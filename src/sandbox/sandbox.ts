import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";


window.addEventListener("message", async function(event) {

    console.info("message received in sandbox: " + event.data.message);  
    console.info("identity received in sandbox: " + event.data.identity);
    console.info("groupId received in sandbox: " + event.data.groupId);    
    console.info("merkel proof received in sandbox: " + event.data.merkleProof);  
    console.info("signal received in sandbox: " + event.data.signal);  

    const identity = new Identity(event.data.identity);
    const merkleProof = event.data.merkleProof;
    const groupId = event.data.groupId;
    const signal = event.data.signal;

    const proof = await generateProof(identity, merkleProof, groupId, signal);
    console.log("Generated proof is: "+ proof);

    console.log(event.source);
    console.log(typeof(event.source));
    window.parent.postMessage(proof, event.origin, [])

});