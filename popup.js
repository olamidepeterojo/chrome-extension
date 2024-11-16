// Save API keys to Chrome Storage
function saveAPIKeys(googleKey, openaiKey) {
    chrome.storage.local.set({
        GOOGLE_CLOUD_API_KEY: googleKey,
        OPENAI_API_KEY: openaiKey,
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error saving API keys:", chrome.runtime.lastError.message);
        } else {
            alert("API keys saved successfully!");
        }
    });
}

// Retrieve API keys from Chrome Storage
function getAPIKeys() {
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

// Analyze text with Google Cloud API
function analyzeText() {
    const userInput = document.getElementById("user-input").value;

    getAPIKeys().then(({ GOOGLE_CLOUD_API_KEY }) => {
        if (!GOOGLE_CLOUD_API_KEY) {
            alert("Google Cloud API key is missing!");
            return;
        }

        chrome.runtime.sendMessage({ action: "useGoogleCloudAPI", text: userInput }, (response) => {
            document.getElementById("output").innerText = response
                ? JSON.stringify(response, null, 2)
                : "Error analyzing text.";
        });
    });
}

// Ask OpenAI with a prompt
function askOpenAI() {
    const userPrompt = document.getElementById("user-input").value;

    getAPIKeys().then(({ OPENAI_API_KEY }) => {
        if (!OPENAI_API_KEY) {
            alert("OpenAI API key is missing!");
            return;
        }

        chrome.runtime.sendMessage({ action: "useOpenAIAPI", prompt: userPrompt }, (response) => {
            document.getElementById("output").innerText = response || "Error fetching OpenAI response.";
        });
    });
}

// Attach event listeners
document.getElementById("saveKeysButton").addEventListener("click", () => {
    const googleKey = document.getElementById("googleKeyInput").value;
    const openaiKey = document.getElementById("openaiKeyInput").value;

    if (googleKey && openaiKey) {
        saveAPIKeys(googleKey, openaiKey);
    } else {
        alert("Please enter both API keys!");
    }
});

document.getElementById("analyze-button").addEventListener("click", analyzeText);
document.getElementById("openai-button").addEventListener("click", askOpenAI);