browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });
});

browser.action.onClicked.addListener(async (tab) => {
   
    const message = {
        action: 'trigger'
    }
    
    const response = await browser.tabs.sendMessage(tab.id, message);
});
