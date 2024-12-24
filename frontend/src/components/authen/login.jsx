import React from 'react';
import './authen.css';

function Login({ onClose }) {
  return (
    <div>
      <button onClick={onClose} className="closeButton">X</button>
      <form className="authenStyle">
          <input style={{marginTop: "69px"}} placeholder=" Email Address:" />
          <input style={{marginTop: "21px"}} type="password" placeholder=" Password:" />
          <button className="registerButton">LOGIN</button>
      </form>   
    </div>
  );
}

export default Login;
