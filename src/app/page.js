"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const emotionToEmoji = {
    positive: "😃",
    neutral: "😐",
    negative: "😡",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult([]);
    setError("");
    try {
      const response = await axios.post("/api/analyze", { text });
      setResult(response.data);
    } catch (error) {
      setError("Error analyzing text.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Emotion Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here..."
          rows="4"
          cols="50"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>
          Analyze Emotion
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {result.length > 0 && (
          <div>
            <h2>Analysis Results:</h2>
            {result.map((emotion, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{emotion.label}:</strong> {emotionToEmoji[emotion.label]}{" "}
                <span>({(emotion.score * 100).toFixed(2)}%)</span>
                <br />
                <progress
                  value={emotion.score}
                  max="1"
                  style={{ width: "100%", marginTop: "5px" }}
                ></progress>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
