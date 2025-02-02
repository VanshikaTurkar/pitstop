import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en"); // Default to English

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate a chatbot response (or replace with an API call)
    const botResponse = await getChatbotResponse(input, language);
    setMessages((prev) => [...prev, botResponse]);

    setInput(""); // Clear input field
  };

  const getChatbotResponse = async (message, lang) => {
    let responseText = "Thanks for your report! We'll update our system.";
    
    if (message.toLowerCase().includes("road")) {
      responseText = "Thanks for the road condition update!";
    } else if (message.toLowerCase().includes("restroom")) {
      responseText = "Noted! Restroom cleanliness is important.";
    } else if (message.toLowerCase().includes("gas")) {
      responseText = "Thank you for the gas price update!";
    }

    // Translate response if needed
    if (lang !== "en") {
      responseText = await translateText(responseText, lang);
    }

    return { text: responseText, sender: "bot" };
  };

  const translateText = async (text, lang) => {
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}&lang=${lang}`);
      const data = await res.json();
      return data.translatedText || text;
    } catch (error) {
      return text; // Fallback to original text
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">PitStop Chatbot</h2>
      
      {/* Chat Display */}
      <div className="w-full h-64 overflow-y-auto bg-white p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-300 text-right" : "bg-gray-300 text-left"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Language Selection */}
      <select 
        className="mt-2 p-1 border rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value
