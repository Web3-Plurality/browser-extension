window.onload = () => {
    //document.dispatchEvent(new CustomEvent('ContentScriptEvent', {detail: "Hello from Content Script"}));
}

export const sendIdentityCommitment = (identityCommitment: string) => {  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_active_identity", commitment: identityCommitment}, function(response) {});  
    });
}

chrome.runtime.onMessage.addListener(function(msg: {action: string, commitment: string}, sender, sendResponse) {
    if (msg.action == 'receive_active_identity') {
      console.log("Message recieved!: "+msg.commitment);
      localStorage.setItem("commitment",msg.commitment);
    }
  });


  export const sendIdentityCommitmentFromPopup = (identityCommitment: string) => {  
    chrome.tabs.query({active: true, currentWindow: false}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_active_identity", commitment: identityCommitment}, function(response) {});  
    });
}
  export const sendFullProof = (fullProof: string) => {    
    chrome.tabs.query({active: true, currentWindow: false}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_full_proof", fullProof: fullProof}, function(response) {});  
    });
}

chrome.runtime.onMessage.addListener(function(msg: {action: string, fullProof: string}, sender, sendResponse) {
    if (msg.action == 'receive_full_proof') {
      console.log("Message recieved!: "+msg.fullProof);
      localStorage.setItem("fullProof",msg.fullProof);
    }
  });



  document.addEventListener('receive_identity_request_from_web_page', (event:any) => {
    var data = event.detail;
    console.log(data);
    chrome.runtime.sendMessage({message: 'identityButtonClicked' , left: window.screenLeft + window.outerWidth,
    top: window.screenTop, proof_request:data},
    function() { 
        //alert ("In send message callback"); 
        });
    });

    document.addEventListener('receive_proof_request_from_web_page', (event:any) => {
        var data = event.detail;
        console.log(data);
        chrome.runtime.sendMessage({message: 'proofButtonClicked' , left: window.screenLeft + window.outerWidth,
        top: window.screenTop, proof_request:data},
        function() { 
            //alert ("In send message callback"); 
            });
        });