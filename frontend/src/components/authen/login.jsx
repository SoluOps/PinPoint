import React, { useState } from 'react';
import axios from 'axios';
import './authen.css';


function Login({ onClose , setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLogin = {
      username: username, 
      password: password 
    };

    try {
      const res = await axios.post("/users/login", newLogin);

        const userData = res.data;
        setUser(userData); // Update user state of App.js
        onClose();

    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data); // Display "Wrong username or password!"
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div>
      <button onClick={onClose} className="closeButton">X</button>
      <form className="authenStyle" onSubmit={handleSubmit}>
          <input 
            style={{marginTop: "69px"}} 
            placeholder=" Username:" 
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            style={{marginTop: "21px"}} 
            type="password" 
            placeholder=" Password:" 
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="errorMessage">{error}</div>}
          <button className="registerButton">LOGIN</button>
      </form>   
    </div>
  );
}

export default Login;
