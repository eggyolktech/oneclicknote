document.getElementById('copySelectedText').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, (results) => {
            const selectedText = results[0].result;
            if (selectedText) {
                navigator.clipboard.writeText(selectedText).then(() => {
                    console.log('Text copied to clipboard');

                    // Create overlay element
                    const overlay = document.createElement('div');
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.display = 'flex';
                    overlay.style.justifyContent = 'center';
                    overlay.style.alignItems = 'center';
                    overlay.style.zIndex = '9999';

                    // Create timer element
                    const timer = document.createElement('div');
                    timer.style.fontSize = '12px';
                    timer.style.color = 'white';
                    overlay.appendChild(timer);

                    // Add overlay to the body
                    document.body.appendChild(overlay);

                    let secondsLeft = 1;
                    const intervalId = setInterval(() => {
                        timer.textContent = "Opening Keep in " + secondsLeft + " seconds";
                        secondsLeft--;
                        if (secondsLeft < 0) {
                            clearInterval(intervalId);
                            document.body.removeChild(overlay);
                            // Open a new tab to Google Keep
                            chrome.tabs.create({ url: 'https://keep.google.com/' });
                        }
                    }, 1000);

                }).catch((err) => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    });
});

function getSelectedText() {
    return window.getSelection().toString();
}

function getPageContent() {
    const selection = window.getSelection().toString();
    if (selection) return selection;
    return document.title + '\n' + window.location.href;
}