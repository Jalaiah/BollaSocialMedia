import React from "react";
import "./sidebar.css";
import { Users } from "../../dummyData";
import Closefriend from "../../components/closefriends/closefriend";
import {
  RssFeed,
  School,
  Event,
  HelpOutline,
  WorkOutline,
  Bookmark,
  Group,
  Chat,
  PlayCircleFilledOutlined as Video
} from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrap">
        <ul className="sidebarlist">
          <li className="sidebarlistitem">
            <RssFeed className="sidebaricon" />
            <span className="sidebarlistitem">Feed</span>
          </li>
          <li className="sidebarlistitem">
            <Chat className="sidebaricon" />
            <span className="sidebarlistitem">Chats</span>
          </li>
          <li className="sidebarlistitem">
            <Video className="sidebaricon" />
            <span className="sidebarlistitem">Videos</span>
          </li>
          <li className="sidebarlistitem">
            <Group className="sidebaricon" />
            <span className="sidebarlistitem">Groups</span>
          </li>
          <li className="sidebarlistitem">
            <Bookmark className="sidebaricon" />
            <span className="sidebarlistitem">Bookmarks</span>
          </li>
          <li className="sidebarlistitem">
            <HelpOutline className="sidebaricon" />
            <span className="sidebarlistitem">Questions</span>
          </li>
          <li className="sidebarlistitem">
            <WorkOutline className="sidebaricon" />
            <span className="sidebarlistitem">Jobs</span>
          </li>
          <li className="sidebarlistitem">
            <Event className="sidebaricon" />
            <span className="sidebarlistitem">Events</span>
          </li>
          <li className="sidebarlistitem">
            <School className="sidebaricon" />
            <span className="sidebarlistitem">Courses</span>
          </li>
        </ul>
        <button className="sidebarbutton">Show More</button>
        <hr className="sidebarhr" />
        <ul className="sidebarfriendlist">
          {Users.filter((k) => k.id % 2 === 0).map((u) => (
            <Closefriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
