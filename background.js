async function fetchLeetCodeProblems(topic) {
    try {
        const response = await fetch("http://localhost:4000/leetcode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        const data = await response.json();

        if (!data || !data.questions) {
            console.error("❌ Proxy Server Error: Invalid response", data);
            return [];
        }

        console.log("✅ Problems received:", data.questions);
        return data.questions;
    } catch (error) {
        console.error("❌ Error fetching from proxy:", error);
        return [];
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTopic") {
        chrome.storage.sync.get(["preferredTopic"], async function (result) {
            const topic = result.preferredTopic || "array";
            console.log("📩 Fetching problems for topic:", topic);

            const problems = await fetchLeetCodeProblems(topic);

            if (problems.length > 0) {
                const urls = problems
                    .sort(() => 0.5 - Math.random()) // Shuffle
                    .slice(0, 5) // Pick 5
                    .map(q => `https://leetcode.com/problems/${q}/`);

                console.log("✅ Sending URLs:", urls);
                sendResponse({ urls });
            } else {
                console.error("⚠ No questions found.");
                sendResponse({ urls: [] });
            }
        });

        return true; // Keep message channel open
    }
});
