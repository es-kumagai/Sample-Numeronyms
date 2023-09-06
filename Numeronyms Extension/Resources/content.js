browser.runtime.onMessage.addListener((request, sender, sendResponse) => {

    toNumeronym(document.body);
});

function toNumeronym(node) {
    
    if (node.nodeType == Node.TEXT_NODE) {
        
        const text = node.textContent;
        const pattern = /\b([a-z])([a-z]+)([a-z])\b/gi;
        
        if (pattern.test(text)) {
            
            const numeronymedHTML = text.replace(pattern, (text, first, middles, last) => {
                
                const lengthOfMiddles = middles.length;
                return `<span title="${text}">${first}${lengthOfMiddles}${last}</span>`;
            });
            
            const newNode = document.createElement('span');
            newNode.innerHTML = numeronymedHTML;
            
            node.parentNode.replaceChild(newNode, node);
        }
    } else {
        const ingoringTagNames = ['SCRIPT', 'NOSCRIPT', 'STYLE'];
        
        for (const child of node.childNodes) {
            
            if (ingoringTagNames.includes(child.tagName)) continue;
            
            toNumeronym(child);
        }
    }
}
