import React, { useContext, useState } from "react";
import { useRef } from "react";
import "./share.css";
import axios from "axios";
import {Cancel, PermMedia, Label, EmojiEmotions, Room } from "@material-ui/icons";
import {AuthContext} from "../../context/Authcontext";


export default function Share() {
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file,setfile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId:user._id,
      desc:desc.current.value,
    };
    if(file){
      const data = new FormData();
      const fileName = Date.now();
      data.append("name",fileName);
      data.append("file",file);
      
      newPost.img = fileName;
      try{
        await axios.post("/upload",data);
      }catch(err){
        console.log(err);
      }
    }
    try{
      await axios.post("/posts",newPost);
      window.location.reload(false);
    }catch(err){
      console.log(err.message);
    }

  }
  return (
    <div className="share">
      <div className="sharewrapper">
        <div className="sharetop">
          <img src={user.profilePicture ? PF+ user.profilePicture : PF+"person/noAvatar.png"} alt="" className="shareprofileimg" />
          <textarea style={{width: "90%", height: "2rem"}} ref={desc} placeholder={"What's in your mind "+user.username+"?"} className="shareinput" />
        </div>
        <hr style={{ margin: "1.25rem" }} className="sharehr" />
        {file && (
          <div className="shareimgcontainer">
          <img className="shareimg" src={URL.createObjectURL(file)} alt="" />
          <Cancel className="sharecancelimg" onClick={()=>setfile(null)} />
          </div>
        )}
        <form className="sharebottom" onSubmit={submitHandler}>
          <div className="shareoptions">
            <label htmlFor="file" className="shareoption">
              <PermMedia htmlColor="tomato" className="shareicon" />
              <span className="shareoptiontext">Media</span>
              <input style={{display:"none"}} type="file" id="file" accept=".jpg,.jpeg,.png" 
              onChange={(e)=>{setfile(e.target.files[0])}} />
            </label>
            <div className="shareoption">
              <Label htmlColor="green" className="shareicon" />
              <span className="shareoptiontext">Tag</span>
            </div>
            <div className="shareoption">
              <Room htmlColor="blue" className="shareicon" />
              <span className="shareoptiontext">Location</span>
            </div>
            <div className="shareoption">
              <EmojiEmotions htmlColor="goldenrod" className="shareicon" />
              <span className="shareoptiontext">Feelings</span>
            </div>
          </div>
          <button type="submit" className="sharebutton">share</button>
        </form>
      </div>
    </div>
  );
}
