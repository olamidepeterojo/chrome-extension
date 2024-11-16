# OP Assistant Chrome Extension
This Chrome Extension leverages cutting-edge AI technologies powered by Google Cloud and OpenAI APIs to provide users with real-time assistance for text summarization, rewriting, and content generation. It is designed to offer intuitive and valuable features that encourage repeated use while ensuring a top-tier user experience.

## Features
 * - Save API keys to Chrome Storage for secure and persistent storage.
 * - Retrieve API keys from Chrome Storage for API usage.
 * - Analyze text using the Google Cloud Natural Language API.
 * - Generate responses using OpenAI's Chat API.
 * - Input validation to ensure required fields are provided.
 * - Modular, event-driven structure to handle user interactions.
 
  ### Prerequisites
- Valid API keys for:
  - Google Cloud Natural Language API
  - OpenAI API
- Chrome browser with Developer Mode enabled for extension installation.

* Notes:
 * - The Chrome Storage API is used for secure handling of API keys, reducing 
 *   the risk of exposing sensitive information.
 * - Ensure you have valid API keys for both Google Cloud and OpenAI before using 
 *   the extension.


## How to run
- Install dependencies `npm install`
* Load the extension into Chrome
- Go to chrome://extensions/ in your Chrome browser.
- Enable Developer Mode.
- Click Load unpacked and select the my-chrome-extension directory.