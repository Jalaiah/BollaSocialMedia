import React, {useEffect, useState, useContext } from "react";
import "./feed.css";
import Share from "../../components/share/share";
import Post from "../../components/post/post";
import axios from "axios";
import {AuthContext} from "../../context/Authcontext";
export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
        const res = username ? await axios.get("/posts/profile/"+username)
        : await axios.get("posts/timeline/"+user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
    }
    catch(error){
      console.log(error.message);
    }
    
    };
    fetchPosts();
    
  },[user._id,username]);
  
  
  return (
    <div className="feed">
      <div className="feedwrapper">
        {(!username || username===user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
