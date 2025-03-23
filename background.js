chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTopic") {
        chrome.storage.sync.get(["preferredTopic"], function (result) {
            sendResponse({ preferredTopic: result.preferredTopic || "array" });
        });
        return true; // Required to use async sendResponse
    }
});
