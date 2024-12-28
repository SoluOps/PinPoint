import React, { useState } from 'react';
import axios from 'axios';
import './authen.css';

function Register({ onClose , setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRegister = {
      username: username, 
      password: password,
      email: email
    };

    try {
      const res = await axios.post("/users/register", newRegister);

        const userData = res.data; // use this to set user
        setUser(userData.username); // Update user state of App.js
        onClose();

    } catch (err) {
      console.log(err);
    }
  };

  return(
    <div>
        <button onClick={onClose} className="closeButton">X</button>
        <form className='authenStyle' onSubmit={handleSubmit}>
            <input style={{marginTop: "68px"}} placeholder=" Username:" onChange={(e) => setUsername(e.target.value)}/>
            <input style={{marginTop: "10px"}} placeholder=" Email Address:" onChange={(e) => setEmail(e.target.value)}/>
            <input style={{marginTop: "10px"}} type="password" placeholder=" Password:" onChange={(e) => setPassword(e.target.value)}/>
            <button className="registerButton">REGISTER</button>
        </form>  
    </div>
  )
}

export default Register;