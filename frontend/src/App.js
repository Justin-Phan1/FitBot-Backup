import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function Fitbot() {
  const [input, setInput] = useState('');               // Use state for user input
  const [response, setResponse] = useState('');         // Use state for FitBot's response
  const [error, setError] = useState('');               // Error state for handling failures
  const [submittedMessage, setSubmittedMessage] = useState(''); // State to store submitted message

  const fetchData = async () => {
    setError(''); // Reset previous errors
    setSubmittedMessage(input); // Save the submitted message

    try {
      const result = await axios.post("http://127.0.0.1:5000/chat", { message: input });
      
      setResponse(result.data.answer);  // Set bot response
      setInput(''); // Clear the input field after sending
    } catch (error) {
      console.error("Error:", error);
      setError('Error');
    } 
  }
  
  // Allows "Enter" key to be used to submit input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };
  
  return (
    <div className="app">
      <p>Welcome to FitBot</p>
      
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Message FitBot"
        />
      </div>
      
      <button onClick={fetchData}>Send</button> 
      <div className="user-input">
        {submittedMessage && <p>You: {submittedMessage}</p>} {/* Show submitted message aka user input*/}
      </div>
      <div className = "bot-output">
        {response && <p>{response}</p>} {/* Show FitBot's response */}
      </div>
        {error && <p className="error">{error}</p>} {/* Display error if any */}
    </div>
  );
}

export default Fitbot;