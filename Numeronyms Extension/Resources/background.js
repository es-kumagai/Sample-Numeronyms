browser.action.onClicked.addListener(async (tab) => {
   
    const message = {
        action: 'numeronymize'
    }
    
    const response = await browser.tabs.sendMessage(tab.id, message);
});
