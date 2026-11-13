/* ==========================================================================
   Chatbot settings TEMPLATE.

   1. Copy this file and name the copy  config.js   (same folder)
   2. Paste your Groq API key below (it starts with  gsk_ )
   3. NEVER commit config.js — it is listed in .gitignore on purpose.

   Get a key at https://console.groq.com/keys
   ========================================================================== */
window.CHATBOT_CONFIG = {
  apiKey: "PASTE_YOUR_GROQ_API_KEY_HERE",

  // Optional settings (these are the defaults):
  model: "qwen/qwen3.8-27b"
  // Other option: model: "openai/gpt-oss-120b" (a production model) with
  // reasoningEffort: "low"   // gpt-oss models only: "low" = fast and cheap, "high" = deeper thinking
};
