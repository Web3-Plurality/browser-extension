// A copy of content script is with both the dApp/browser tab and the extension
// However, both copies run in isolation in their own context
// one copy is running in the context of browser
// other copy is running in the context of extension 

// dummy function
window.onload = () => {
    //document.dispatchEvent(new CustomEvent('ContentScriptEvent', {detail: "Hello from Content Script"}));
}

// extension calls this function from identity extension to send a message to the dApp browser
export const sendIdentityCommitment = (identityCommitment: string) => {  
    // query the tab that is open and active and is the current window
    // extension sends the message to the filtered tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // this message will be received in the receive_active_identity event listener in this same content script (see chrome.runtime.onMessage.addListener)
        chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_active_identity", data: identityCommitment}, function(response) {});  
    });
}

// extension calls this function from identity popup window to send a message to the dApp browser
export const sendIdentityCommitmentFromPopup = (identityCommitment: string) => {  
  // query the tab that is open and active in the browser but is not the current window
  // because the current window is the popup itself
  // extension sends the message to the filtered tab
  chrome.tabs.query({active: true, currentWindow: false}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_active_identity", data: identityCommitment}, function(response) {});  
  });
}

// extension calls this function from proof popup window to send a message to the dApp browser
export const sendFullProof = (fullProof: string) => {  
  // query the tab that is open and active in the browser but is not the current window
  // because the current window is the popup itself
  // extension sends the message to the filtered tab
  chrome.tabs.query({active: true, currentWindow: false}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id!!, {action: "receive_full_proof", data: fullProof}, function(response) {});  
  });
}

// receiving the message in the browser that the extension sent using the runtime
chrome.runtime.onMessage.addListener(function(msg: {action: string, data: string}, sender, sendResponse) {
    // if the message is to receive identity, we store the identity
    if (msg.action == 'receive_active_identity') {
      console.log("Message recieved!: "+msg.data);
      // storing the commitment in local storage of browser
      localStorage.setItem("commitment",msg.data);
    }
    // if the message is to receive proof, we store the proof
    else if (msg.action == 'receive_full_proof') {
      console.log("Message recieved!: "+msg.data);
      // storing the proof in local storage of browser
      localStorage.setItem("fullProof",msg.data);
    }
  });


// this event listeners listen to event thrown from browser/dApp
document.addEventListener('receive_identity_request_from_web_page', (event:any) => {
  var data = event.detail;
  console.log(data);
  // we now send a message to the background script where it can open a popup
  chrome.runtime.sendMessage({message: 'identityButtonClicked' , left: window.screenLeft + window.outerWidth,
  top: window.screenTop, proof_request:data},
  function() { 
      //alert ("In send message callback"); 
  });
});

// this event listeners listen to event thrown from browser/dApp
document.addEventListener('receive_proof_request_from_web_page', (event:any) => {
  var data = event.detail;
  console.log(data);
  // we now send a message to the background script where it can open a popup
  chrome.runtime.sendMessage({message: 'proofButtonClicked' , left: window.screenLeft + window.outerWidth,
  top: window.screenTop, proof_request:data},
  function() { 
    //alert ("In send message callback"); 
  });
});