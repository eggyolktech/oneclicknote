chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openGoogleKeep') {
    chrome.tabs.create({ url: 'https://keep.google.com/' }, (tab) => {
      if (chrome.runtime.lastError) {
        console.error('Error creating tab:', chrome.runtime.lastError);
      }
    });
  }
});