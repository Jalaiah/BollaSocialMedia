import React,{useRef,useContext} from "react";
import "./login.css";
import  {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/Authcontext";
import {CircularProgress} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const email =useRef();
  const password =useRef();
  const {isFetching,dispatch} = useContext(AuthContext);
  

  const clickhandler =async (e)=>{
    e.preventDefault();
    try{
      await loginCall({email:email.current.value,password:password.current.value},dispatch);
      
    }
    catch(err){
      console.log(err.message);
    }
    
  }
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <div className="loginlogo">BOLLA MEDIA</div>
          <div className="logindesc">
            Connect With Your Friends and the World Around You on #BollaMedia
          </div>
        </div>

        {/* login */}

      <div className="loginright">
        <div className="mainloginbox">
        
            <form className="loginbox" onSubmit={clickhandler}>
            
              <input placeholder="Enter Email" ref={email} type="email" required className="logininput" />
              
              <input
                placeholder="Enter Password"
                type="password"
                ref={password}
                className="logininput"
                required
                minLength={6}
              />
             
              <button type="submit" className="loginbutton" 
              disabled={isFetching}>{isFetching?<CircularProgress 
              color="primary" />:"LogIn"}</button>
            </form>
            <div className="forgotdiv">
              <div className="forgotpasslogin">Forgot password?</div>
              <Link to="/register" style={{textDecoration:"none"}}>
                <button className="loginlogin" 
                disabled={isFetching}>{isFetching?<CircularProgress 
                color="secondary" />:"Create New account"}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
