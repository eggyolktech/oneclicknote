# OneClickNote Chrome Extension

OneClickNote is a Chrome extension that allows you to quickly add content from a web page to a Google Keep note with a single click.

## Features
- **One - click operation**: Add selected text or page title and URL to a Google Keep note.
- **Simple and intuitive**: Easy to use interface.

## Installation
1. Clone or download this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top - right corner.
4. Click "Load unpacked" and select the directory `<Download_Folder>\oneclicknote`.

## Usage
1. Navigate to a web page.
2. Select the text you want to add to Google Keep. If no text is selected, the page title and URL will be used.
3. Click the OneClickNote extension icon in the Chrome toolbar.
4. A new Google Keep note will be opened with the selected content.

## How it Works
### manifest.json
This file defines the metadata of the extension, including permissions, the popup HTML file, and the background service worker.

### popup.html
It provides the user interface for the extension. When the "Add to Google Keep" button is clicked, it triggers the JavaScript code in `popup.js`.

### popup.js
This script retrieves the selected text or page information and sends it to the background script using `chrome.runtime.sendMessage`.

### background.js
The background script listens for messages from `popup.js`. When it receives a `createNote` action, it either tries to use the Google Keep API (if configured) or opens the Google Keep page and injects a script to fill the note content.

### Finding the Note Input Field
To add the content to the Google Keep note, the extension needs to find the appropriate input field. Since the CSS selector might be dynamic, it uses the `aria - label` attribute to select the input field:
```javascript
const noteInput = document.querySelector('div[aria-label="Take a note…"]');
if (noteInput) {
  noteInput.textContent = content;
}