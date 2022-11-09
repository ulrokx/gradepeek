import "crx-hotreload";
chrome.runtime.onInstalled.addListener((details) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("onboard.html") });
});
