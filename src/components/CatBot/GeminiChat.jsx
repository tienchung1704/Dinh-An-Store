import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { assets } from "../../assets/assets";
import "./GeminiChat.css";
import ReactMarkdown from "react-markdown";
const GeminiChat = () => {
  const GEMINI_API_KEY = "AIzaSyBlzzFgohvAIS4lXbXZKxrChlr-oUrCvyk";
  const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const result = await model.generateContent({
        contents: [{ parts: [{ text: input }] }],
      });
      const textResponse = result.response.candidates[0].content.parts[0].text;

      setResponse(textResponse);
      const aiMessage = { sender: "ai", text: textResponse };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setInput("");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setResponse("Lỗi khi gọi API.");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <button className="chatbox-toggle" onClick={() => setIsOpen(!isOpen)}>
        {" "}
        <img src={assets.img_12} alt="" />
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <div className="chatbox-header-content">
              <img src={assets.userimg} alt="" />
              <div className="chatbox-header-content-text">
                <p>Chat With Cattie Bot</p>
                <span>We Typically Reply in a few minutes</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbox-close"
              >
                <img id="closeBtn" src={assets.arrow_down} alt="" />
              </button>
            </div>
          </div>
          <div className="chatbox-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                {message.sender === "user" ? (
                  <p>{message.text}</p>
                ) : (
                  <div className="ai-message">
                    <span id="Botreply">Cattie Bot</span>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbox-footer">
            <textarea
              rows="1"
              value={input}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChat;
