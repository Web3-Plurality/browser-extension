import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";


window.addEventListener("message", async function(event) {
    console.info("message received in sandbox: " + event.data.message);  
    console.log("trying eval"+ eval(event.data));  

    const groupId = 1;
    const group = new Group(groupId);
    const identity = new Identity();

    group.addMember(identity.commitment);
    const signal = 1; // this value doesnt matter

    const proof = await generateProof(identity, group, groupId, signal);
    console.log("Generated proof is: "+ proof);

    console.log(event.source);
    console.log(typeof(event.source));
    window.parent.postMessage(proof, event.origin, [])

});