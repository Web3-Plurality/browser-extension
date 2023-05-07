import { tab } from "@testing-library/user-event/dist/tab";
import { send } from "process";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'identityButtonClicked') {
       let data = request;
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html?nav=identity&proof_request="+data.proof_request),
        type: "popup",
        top: data.top,
        left: data.left-400,
        width: 400,
        height: 600,
    });
   }
   sendResponse();
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'proofButtonClicked') {
       let data = request;
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html?nav=createproof&proof_request="+data.proof_request),
        type: "popup",
        top: data.top,
        left: data.left-400,
        width: 400,
        height: 600,
    });
   }
   sendResponse();
  });