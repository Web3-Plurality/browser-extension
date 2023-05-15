// We used a .ts file since all our required packages are npm modules which we need to import
// This .ts file will be converted to a js file after compilation by webpack
// See webpack.config.js to see how this file is handled and copied in output dist 

import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";

window.addEventListener("message", async function(event) {

    console.info("message received in sandbox: " + event.data.message);  
    console.info("identity received in sandbox: " + event.data.identity);
    console.info("groupId received in sandbox: " + event.data.groupId);    
    console.info("merkel proof received in sandbox: " + event.data.merkleProof);  
    console.info("signal received in sandbox: " + event.data.signal);  

    // generate identity in correct format from stored identity 
    const identity = new Identity(event.data.identity);

    // get variables from event source
    const merkleProof = event.data.merkleProof;
    const groupId = event.data.groupId;
    const signal = event.data.signal;

    // generate ZK proof based on the inputs
    const proof = await generateProof(identity, merkleProof, groupId, signal);
    console.log("Generated proof is: "+ proof);

    // send the response back to the caller/originator of the event
    // window.event.source doesn't work in iframes, use window.parent instead
    window.parent.postMessage(proof, event.origin, [])

});