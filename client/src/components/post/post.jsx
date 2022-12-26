import React, {useContext, useEffect, useState } from "react";
import "./post.css";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {format} from "timeago.js";
import {Link} from "react-router-dom";


export default function Post({ post }) {
  const [like, setlike] = useState(post.likes.length);
  const [isliked, issetliked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setuser] = useState({});
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
    issetliked(post.likes.includes(currentUser._id));
  },[currentUser._id,post.likes]);

  useEffect(()=>{
    const fetchUser = async () =>{
      try{
        const res = await axios.get(`/users?userId=${post.userId}`);
        setuser(res.data);
    }
    catch(error){
      console.log(error.message);
    }
    
    };
    fetchUser();
    
  },[post.userId]);

  function handlerclick() {
    try{
      axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});
    }catch(err){
      console.log(err.message);
    }

    if (!isliked) {
      setlike(like + 1);
      issetliked(true);
    } else if (isliked) {
      setlike(like - 1);
      issetliked(false);
    }
  }

  const handleDeletepost = async (e)=>{
    
    try{
      await axios.delete("/posts/"+post._id,currentUser._id);
    }catch(err){
      console.log(err.message);
    }

  }
 

  return (
    <div className="post">
      <div className="postwrapper">
        <div className="posttop">
          <div className="posttopleft">
            <Link to={`profile/${user.username}`}>
            <img
              src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"}
              alt=""
              className="postprofileimg"
            /></Link>
            <span className="postusername">
              {user.username}
            </span>
            <span style={{ "fontSize": "0.8rem" }} className="postdate">
              {format(post.createdAt)}
            </span>
          </div>
          <button onClick={(e)=>{window.location.reload()}} className="posttopright">
            {currentUser._id===post.userId ?
              <DeleteOutlinedIcon className="delteicond" style={{background:"none",cursor:"pointer"}} onClick={handleDeletepost}/>:null
            }
          </button>
        </div>
        <div className="postcenter">
          <span className="posttext">{post?.desc}</span>
          <img src={PF+post.img} alt="" className="postimg" />
        </div>
        <div className="postbottom">
          <div className="postbottomleft">
            <img
              onClick={handlerclick}
              className="likeicon"
              src={`${PF}like.png`}
              alt=""
            />
            <img className="likeicon" src={`${PF}heart.png`} alt="" />
            <span className="likecounter">{like} People love it</span>
          </div>
          <div className="postbottomright">
            <span className="rightcomment">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
