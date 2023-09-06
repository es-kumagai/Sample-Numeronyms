browser.action.onClicked.addListener(async (tab) => {
   
    const message = {
        action: 'numeronimize'
    }
    
    const response = await browser.tabs.sendMessage(tab.id, message);
});
