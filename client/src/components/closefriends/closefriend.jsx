import React from "react";
import "./closefriend.css";
export default function Closef({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarfriend">
      <img src={PF+user.profilePicture} alt="" className="friendlistimg" />
      <span className="freind">{user.username}</span>
    </li>
  );
}
