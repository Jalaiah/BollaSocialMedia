import React,{useEffect,useState} from "react";
import "./profile.css";
import Topbar from "../../components/topbar/topbar";
import Feed from "../../components/feed/feed";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setuser] = useState({});
  const username = useParams().username;
  useEffect(()=>{
    const fetchUser = async () =>{
      try{
        const res = await axios.get(`/users/?username=${username}`);
        setuser(res.data);
    }
    catch(error){
      console.log(error.message);
    }
    
    };
    fetchUser();
    
  },[username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileright">
          <div className="profilerighttop">
            <div className="profilecover">
              <img
                className="profilecoverimg"
                src={user.coverPicture? PF+user.coverPicture : PF+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileuserimg"
                src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileinfo">
              <h6 className="profileinfoname">{user.username?user.username :"UNKNOWN"}</h6>
              <span className="profileinfodesc">{user.desc?user.desc : "Hello guys!"}</span>
            </div>
          </div>
          <div className="profilerightbottom">
            <Feed username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
