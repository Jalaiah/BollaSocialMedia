import React from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { loginCall } from "../../apiCalls";

export default function Topbar() {
  const {user} = useContext(AuthContext);
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {isFetching,dispatch} = useContext(AuthContext);
  const logotHandler = (e)=>{
    e.preventDefault();
    try{
      loginCall({email:null,password:null},dispatch);
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="topbarcontainer">
      <div className="topbarleft">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="logo">BollaMedia</span>
        </Link>
      </div>
      <div className="topbarcenter">
        <div className="searchbar">
          <Search className="sicon" />
          <input
            placeholder="search for friends"
            type="text"
            className="searchinput"
          />
        </div>
      </div>
      <div className="topbarright">
        <div className="topbaricons">
          <div className="topbariconitem">
            <Person />
            <span className="topbariconbadge">1</span>
          </div>
          <div className="topbariconitem">
            <Chat />
            <span className="topbariconbadge">2</span>
          </div>
          <div className="topbariconitem">
            <Notifications />
            <span className="topbariconbadge">3</span>
          </div>
        </div>
        <div className="topbarlinks">
          <div className="topbarlink">Homepage</div>
          <div onClick={logotHandler} id="logoutbutton" className="topbarlink">Logout</div>
        </div>
        <Link to={"/profile/"+user.username}>
          <img src={
              user.profilePicture 
              ? PF + user.profilePicture
              : PF+"person/noAvatar.png"
            } 
          alt="" className="topbarimg" />
        </Link>
      </div>
    </div>
  );
}
