// A new extension popup can only be created using background scripts
// background scripts will listen to events from the dApp's content script
// once the event is received, it will create a new extension window

// NOTE: These APIs are not compatible with browsers other than chrome

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("HERE");
  // this script will create a new popup for creation of identity
  if (request.message == 'identityButtonClicked') {
    let data = request;
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html?nav=requestidentitycreation&proof_request="+data.proof_request),
      type: "popup",
      top: data.top,
      left: data.left-400,
      width: 400,
      height: 600,
    });
   }
    // this script will create a new popup for creation of proof
   else if (request.message == 'proofButtonClicked') {
    let data = request;
    //const queryString = new URLSearchParams(data.proof_request).toString();
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html?nav=createproof&proof_request="+JSON.stringify(data.proof_request)),
      type: "popup",
      top: data.top,
      left: data.left-400,
      width: 400,
      height: 600,
    });
  }
  sendResponse();
});