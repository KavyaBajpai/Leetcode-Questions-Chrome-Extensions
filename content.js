(function () {
    if (document.getElementById("leetcode-button")) return;

    const button = document.createElement("button");
    button.id = "leetcode-button";
    button.innerText = "Open 5 Questions";
    button.classList.add("floating-button");
    // button.style.position = "fixed";
    // button.style.bottom = "20px";
    // button.style.right = "20px";
    // button.style.padding = "10px 15px";
    // button.style.background = "#f5f5f5";
    // button.style.color = "#000";
    // button.style.border = "none";
    // button.style.borderRadius = "8px";
    // button.style.cursor = "pointer";
    // button.style.zIndex = "1000";
    // button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    // button.style.opacity = "0.8";
    // button.style.transition = "opacity 0.3s";

    button.onclick = function () {
        console.log("📩 Sending message to background script...");

        chrome.runtime.sendMessage({ action: "getTopic" }, function (response) {
            console.log("📩 Received response:", response);

            if (!response || !response.urls || response.urls.length === 0) {
                console.error("⚠ No URLs received. Possible API issue.");
                alert("Failed to load LeetCode problems. Try again.");
                return;
            }

            response.urls.forEach(url => window.open(url, "_blank"));
        });
    };

    document.body.appendChild(button);
})();
