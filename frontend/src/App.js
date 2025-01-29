import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function Fitbot() {
  const [input, setInput] = useState('');                // User input
  const [messages, setMessages] = useState([]);          // Store all conversation messages
  const [error, setError] = useState('');                // Error state for handling failures

  const fetchData = async () => {
    if (input.trim() === '') return; // Prevent sending empty messages

    setError(''); // Clear any previous errors

    // Add user message to the conversation
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages); // Update state with user message

    try {
      // Send user message to backend (API call)
      const result = await axios.post("http://127.0.0.1:5000/chat", { message: input });

      // Add bot response to the conversation
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: result.data.answer }
      ]);
      setInput(''); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      setError('Something went wrong.');
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="app">
      <p className="text">
        Welcome to FitBot
        <br />
        What would you like to know?
      </p>

      <div>
        <input
          className="input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message FitBot"
        />
        <button className="button" onClick={fetchData}>&#8593; </button>
      </div>

    {/* Render all messages */}
    {messages.map((message, index) => (
      <div key={index} className="message-container">
        {message.sender === 'user' ? (
          <div className="user-message">
            {message.text}
          </div>
        ) : (
          <div className="bot-message">
            {message.text}
          </div>
        )}
      </div>
    ))}

    {error && <p className="error">{error}</p>} {/* Show error if any */}
    </div>
  );
}

export default Fitbot;
