browser.runtime.onMessage.addListener((request, sender, sendResponse) => {

    switch (request.action) {
        case 'numeronymize':
            toNumeronym(document.body);
            break;
    }
});

const ingoringTagNames = ['SCRIPT', 'NOSCRIPT', 'STYLE'];
const numeronymPattern = /\b([a-z])([a-z]+)([a-z])\b/gi;

function toNumeronym(node) {
    
    switch (node.nodeType) {
            
        case Node.TEXT_NODE:
            numeronymize(node);
            break;
            
        default:
            for (const child of node.childNodes) {
                if (ingoringTagNames.includes(child.tagName)) continue;
                toNumeronym(child);
            }
            break;
    }
}

function numeronymize(textNode) {
    
    const text = textNode.textContent;
    
    if (!numeronymPattern.test(text)) return;

    const numeronymedHTML = text.replace(numeronymPattern, (text, first, middles, last) => {
        
        const lengthOfMiddles = middles.length;
        return `<span title="${text}">${first}${lengthOfMiddles}${last}</span>`;
    });
    
    const numeronymedNode = document.createElement('span');
    numeronymedNode.innerHTML = numeronymedHTML;
    
    textNode.parentNode.replaceChild(numeronymedNode, textNode);
}
