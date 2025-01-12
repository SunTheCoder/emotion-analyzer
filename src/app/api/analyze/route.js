import { HfInference } from "@huggingface/inference";

export async function POST(req) {
  try {
    const { text } = await req.json();

    // Validate input
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input: 'text' is required and must be a string." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialize Hugging Face Inference client
    const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

    // Call the text classification model
    const result = await inference.textClassification({
      model: "cardiffnlp/twitter-roberta-base-sentiment-latest",
      inputs: text,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error analyzing text:", error);
    return new Response(JSON.stringify({ error: "Failed to analyze text" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
