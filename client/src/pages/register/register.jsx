import axios from "axios";
import React from "react";
import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email =useRef();
  const password =useRef();
  const confirmpassword = useRef();
  const navigate  = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== confirmpassword.current.value){
      confirmpassword.current.setCustomValidity("Passwords not matched");
    }

    else{
     const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try{
        await axios.post("/auth/register",user)
        .then(navigate("/login"));
      }
      catch(err){
        console.log(err.message);
      }
      
    }
  }
  return (
    <div className="register">
      <div className="registerwrapper">
        <div className="registerleft">
          <div className="registerlogo">BOLLA MEDIA</div>
          <div className="registerdesc">
            Connect With Your Friends and the World Around You on #BollaMedia
          </div>
        </div>

        {/* register */}

        <div className="registerright">
        <div className="mainregisterbox">
          <form className="registerbox" onSubmit={handleClick}>
            <input
              placeholder="Enter New Username"
              type="text"
              className="registerinput"
              ref={username}
              required
            />
            <input
              placeholder="Enter Email"
              type="email"
              ref={email}
              required
              className="registerinput"
            />

            <input
              placeholder="Enter Password"
              type="password"
              ref={password}
              required
              className="registerinput"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              ref={confirmpassword}
              required
              className="registerinput"
              minLength={6}
            />

            <button type="submit" className="registerregister">Sign Up</button>
            <div className="forgotdiv1">
              <span className="forgotpassaccount">Already have an account ?</span>
              <Link to="/login" style={{textDecoration:"none",width:"80px"}}>
                <span className="forgotpassregister">Login here</span>
              </Link>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
