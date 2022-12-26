import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../../components/online/online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setfriends] = useState([]);
  const [onf,setonf] = useState(false);
  const {user:currentUser} = useContext(AuthContext);
  
  const loader = (e)=>{
    window.location.reload();
  }


  useEffect(()=>{
    const getFriends = async()=>{
      try{
        const friendlist = await axios.get("/users/friends/"+user._id);
        setfriends(friendlist.data);
      }
      catch(err){
       
      }
     
    };
    getFriends();
    

  },[user]);

  const Homerightbar = () => {
    return (
      <>
        <div className="bcontainer">
          <img src={`${PF}gift.png`} alt="" className="bimg" />
          <span className="btext">
            <b>Tony Stark </b> and <b>3 other friens </b>have birthday Today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rad" />
        <h4 style={{ "marginBottom": "1.25rem" }} className="rightbartitle">
          Online Friends
        </h4>
        <ul className="rightbarfriendlist">
          {Users.map((u) => (
            <Online key = {u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const Profilerightbar = () => {
    
    return (
      <>
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarinfo">
          <div className="rightinfoitem">
            <span className="infokey">City: </span>
            <span className="infokeyvalue">{user.city}</span>
          </div>
          <div className="rightinfoitem">
            <span className="infokey">Country: </span>
            <span className="infokeyvalue">{user.from}</span>
          </div>
          <div className="rightinfoitem">
            <span className="infokey">Relationship: </span>
            <span className="infokeyvalue">{user.relationship === 1?"Single":user.relationship===2?"Married":"-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
          <div className="rightbarfollows">
            {friends.map(friend=>(
              <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
                <div className="rbarfollow">
                  <img onClick={(e)=>{setTimeout(loader,100)}} src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"} alt="" className="rbarfollowimg" />
                  <span className="rbarfollowname">{friend.username}</span>
                </div>
              </Link>
            ))}
            
          </div>
       
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
        {user ? <Profilerightbar /> : <Homerightbar />}
      </div>
    </div>
  );
}
