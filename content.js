(function() {
    // if (document.getElementById("leetcode-button")) return;

    const button = document.createElement("button");
    button.id = "leetcode-button";
    button.innerText = "Open 5 Questions";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.background = "#FFA500";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";

    button.onclick = function() {
        chrome.fruntime.sendMessage({action: "getTopic"}, function(result) {
            const topic = result.preferredTopic || "array";
            const urls = [
                `https://leetcode.com/problemset/all/?topic=${topic}`,
                `https://leetcode.com/problemset/all/?topic=${topic}&page=2`,
                `https://leetcode.com/problemset/all/?topic=${topic}&page=3`,
                `https://leetcode.com/problemset/all/?topic=${topic}&page=4`,
                `https://leetcode.com/problemset/all/?topic=${topic}&page=5`
            ];

            urls.forEach(url => window.open(url, "_blank"));
        });
    };

    document.body.appendChild(button);
})();
