const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/leetcode", async (req, res) => {
    const { topic } = req.body;

    const query = {
        query: `
            query getTopicProblems($categorySlug: String!) {
                topicTag(slug: $categorySlug) {
                    questions {
                        titleSlug
                        isPaidOnly
                        status
                    }
                }
            }
        `,
        variables: { categorySlug: topic }
    };

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });

        const data = await response.json();

        if (!data || !data.data || !data.data.topicTag) {
            return res.status(500).json({ error: "Invalid LeetCode API response" });
        }

        // Filter out premium and solved questions
        const questions = data.data.topicTag.questions
            .filter(q => !q.isPaidOnly && q.status !== "ac") // Remove premium & solved
            .map(q => q.titleSlug);

        if (questions.length === 0) {
            return res.status(404).json({ error: "No unsolved free questions found!" });
        }

        res.json({ questions });
    } catch (error) {
        console.error("❌ Error fetching from LeetCode:", error);
        res.status(500).json({ error: "Failed to fetch LeetCode problems" });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Proxy Server running on https://localhost:${PORT}`));
