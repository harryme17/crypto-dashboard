// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Parser = require("rss-parser");

admin.initializeApp();

// Get Gemini API key from secure environment config
const geminiApiKey = functions.config().gemini.key;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Fetches top crypto data and generates a market summary with Gemini.
 */
exports.getMarketSummary = functions.https.onCall(async (data, context) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 },
    });
    const marketData = response.data.map(c =>
      `Name: ${c.name}, Price: $${c.current_price}, 24h Change: ${c.price_change_percentage_24h.toFixed(2)}%`
    ).join("\n");

    const prompt = `Analyze the following crypto market data and provide a brief, one-sentence summary for a dashboard. Mention Bitcoin's trend and one other key coin. State if the overall sentiment is bullish, bearish, or neutral. Data:\n${marketData}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return { summary };
  } catch (error) {
    console.error("Error in getMarketSummary:", error);
    throw new functions.https.HttpsError("internal", "Failed to generate market summary.");
  }
});

/**
 * Fetches crypto news from an RSS feed and generates a summary with Gemini (RAG).
 */
exports.getNewsSummary = functions.https.onCall(async (data, context) => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL("https://www.coindesk.com/arc/outboundfeeds/rss/"); // Example RSS feed

    // Get titles from the latest 5 articles
    const newsHeadlines = feed.items.slice(0, 5).map(item => item.title).join("\n");

    const prompt = `Based on these recent crypto news headlines, what is the most important theme or event happening right now? Summarize it in one or two sentences for a user on a dashboard. Headlines:\n${newsHeadlines}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return { summary };
  } catch (error) {
    console.error("Error in getNewsSummary:", error);
    throw new functions.https.HttpsError("internal", "Failed to generate news summary.");
  }
});