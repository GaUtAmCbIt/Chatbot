import React, { useState } from 'react'; // @rst;
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/Chatform';
import ChatMessage from './components/ChatMessage';

function App() {

  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ contents: history })
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Something went wrong");

      const apiResponse = data.candidates[0].content.parts[0].text;

      // Directly update chat history with bot response
      setChatHistory(prev => [...prev, { role: "model", text: apiResponse }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">

        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Veggie Diagnose AI</h2>
          </div>
          <button className="material-symbols-outlined">
            arrow_downward
          </button>
        </div>

        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br />How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
