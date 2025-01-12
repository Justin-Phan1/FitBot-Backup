import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function Fitbot() {
  const [input, setInput] = useState('');           
  const [response, setResponse] = useState('');    

    // 
    const fetchData = async () => {
      try {
        const result = await axios.post("http://127.0.0.1:5000/chat", { message: input });
        
        setResponse(result.data.answer); 
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
  return (
    <div className="app">
      <p>Welcome to FitBot</p>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}  
          placeholder="Type your message"
        />
      </div>
      <button onClick={fetchData}>Send</button> 
      
      {response}
    </div>
  );
}

export default Fitbot;
