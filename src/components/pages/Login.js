import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../assets/Office_Gossip_Logo.PNG';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  console.log(email);
  console.log(password)

  /// grab these values and throw them into an object
   const userObject = {
    email: {email},
    password: {password},
    timestamp: "",
    title: "",
    location: "",
    session: "",
    start: "",
    end: "",
    confirmed: false
   };
   console.log(userObject);

  useEffect(() => {
    // trying to pass the userObject to the calendar page
    if (user) navigate("/Calendar", userObject);
  }, [user]);
  return (
    <div className="login">
      <div className="login__container">
        <h1>Welcome to Office Gossip</h1>
        <div>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
        </div>
        <div>
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {/* this should pass the userObject */}
        <button className="login__btn"onClick={() => logInWithEmailAndPassword(email, password, userObject)}>
          Login
        </button>
      </div>
      <div className="Logo">
        <img src={logo}/>
      </div>
    </div>
  );
}

export default Login;