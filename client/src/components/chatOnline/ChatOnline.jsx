import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

 useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/userlist");
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);


  const handleClick = async (user) => {
    try {
      const res = await axios.post(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {friends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/docAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
          <span className="chatOnlinedesc"><br/>{o.desc}</span>
        </div>
      ))}
    </div>
  );
}