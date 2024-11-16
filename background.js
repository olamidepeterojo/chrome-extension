// Function to retrieve API keys from Chrome Storage
async function getAPIKeys() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['GOOGLE_CLOUD_API_KEY', 'OPENAI_API_KEY'], (result) => {
            if (chrome.runtime.lastError) {
                console.error("Failed to retrieve API keys:", chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                resolve(result);
            }
        });
    });
}

// Function to use Google Cloud API for Sentiment Analysis
async function useGoogleCloudAPI(text) {
    try {
        const { GOOGLE_CLOUD_API_KEY } = await getAPIKeys();
        if (!GOOGLE_CLOUD_API_KEY) throw new Error("Missing Google Cloud API key!");

        const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_CLOUD_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                document: {
                    type: "PLAIN_TEXT",
                    content: text,
                },
                encodingType: "UTF8",
            }),
        });

        if (!response.ok) {
            throw new Error(`Google Cloud API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Google Cloud API Sentiment Analysis:", data);
        return data;
    } catch (error) {
        console.error("Error calling Google Cloud API:", error);
        return null;
    }
}

// Function to use OpenAI API for Text Generation
async function useOpenAIAPI(prompt) {
    try {
        const { OPENAI_API_KEY } = await getAPIKeys();
        if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key!");

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("OpenAI API Response:", data);
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return null;
    }
}

// Example: Listening for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "useGoogleCloudAPI") {
        useGoogleCloudAPI(message.text).then(response => sendResponse(response));
    } else if (message.action === "useOpenAIAPI") {
        useOpenAIAPI(message.prompt).then(response => sendResponse(response));
    }
    return true; // Keep the message channel open for sendResponse
});