import React, { useState } from 'react';

import logo from './img/logo-testio.svg';
import './App.css';

function App() {

  const [username, setUsername] = useState('tesonet');
  const [password, setPassword] = useState('partyanimal');
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    setSubmitted(true);
    try {
      const response = await fetch('http://playground.tesonet.lt/v1/tokens', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
        method: 'POST',
        mode: 'cors',
      });
      const {token} = await response.json();
      setToken(token);
      console.log(token);

    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="App login">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={e=>{setUsername(e.target.value)}}
          />
          <input
            type="password"
            value={password}
            onChange={e=>{setPassword(e.target.value)}}
          />
          <button onClick={handleLogin}>Login</button>
        </form>
      </header>
    </div>
  );
}

export default App;
