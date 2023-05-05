chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'buttonClicked') {
       let data = request;

      chrome.windows.create({
        url: chrome.runtime.getURL("index.html?nav=identitylist"),
        type: "popup",
        top: data.top,
        left: data.left-400,
        width: 400,
        height: 600,
    });
   }
   return true;
  });