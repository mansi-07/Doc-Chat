import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            message?.byDoc
              ? PF + "person/docAvatar.png"
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        
        {
          message.text ? 
          <p className="messageText">{message.text}</p>
          : null
        }
        {
          message.image ? 
          <img src={message.image} alt="" style={{width: "100px", height: "100px"}}/>
          : null
        }
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
