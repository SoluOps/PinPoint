import React from 'react';
import './authen.css';

function Register({ onClose }) {

  return(
    <div>
        <button onClick={onClose} className="closeButton">X</button>
        <form className='authenStyle'>
            <input style={{marginTop: "68px"}} placeholder=" Username:"/>
            <input style={{marginTop: "10px"}} placeholder=" Email Address:"/>
            <input style={{marginTop: "10px"}} type="password" placeholder=" Password:"/>
            <button className="registerButton">REGISTER</button>
        </form>  
    </div>
  )
}

export default Register;