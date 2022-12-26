import React from "react";
import "./home.css";
import Topbar from "../../components/topbar/topbar";
import Feed from "../../components/feed/feed";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="homepagecontainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
