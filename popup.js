document.getElementById("save").addEventListener("click", function() {
    const topic = document.getElementById("topic-select").value;
    chrome.storage.sync.set({ preferredTopic: topic }, function() {
        alert("Preferred topic saved!");
    });
});
