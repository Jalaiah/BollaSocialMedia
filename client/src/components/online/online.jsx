import React from "react";
import "./online.css";

export default function online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rfriendlist">
      <div className="rbpcontainer">
        <img src={PF+user.profilePicture} alt="" className="rightbarimgprofile" />
        <span className="rightbaronline"></span>
      </div>
      <span style={{ "fontWeight": "500" }} className="rbarusername">
        {user.username}
      </span>
    </li>
  );
}
