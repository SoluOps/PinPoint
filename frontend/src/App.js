import React, { useState } from 'react';
import Map from './components/map/map.js';
import './App.css';
import Register from './components/authen/register.jsx';  
import Login from './components/authen/login.jsx';


function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return(
    <div className="App">
      {/* Add buttons here */}

      {user ? (
                <button style={{backgroundColor: 'black', position: 'absolute', top: "17px", right: "77px"}} onClick={() => setUser(null)}>LOG OUT</button>
              ): (
                <div>
                  <button 
                    style={{backgroundColor: 'smokewhite', color: 'black', position: 'absolute', top: "17px", right: "77px"}} 
                    onClick={() => setShowLogin(true)}
                  >
                    LOGIN
                  </button>
                  <button style={{backgroundColor: '#5e17eb', position: 'absolute', top: "17px", right: "141px"}}
                    onClick={() => setShowRegister(true)}
                  >
                    REGISTER
                  </button>

                </div>
              )}

              {showLogin && (
                <div>
                  <Login onClose={() => setShowLogin(false)} setUser={setUser} />
                </div>
              )}
              
              {showRegister && (
                <div>
                  <Register onClose={() => setShowRegister(false)} setUser={setUser} />
                </div>
              )}
      <Map user={user}/>
    </div>
  )
}

export default App;

