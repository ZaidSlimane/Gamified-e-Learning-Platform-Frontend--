import React from 'react';
import './ChatCard.css'


const ChatCard = ({imageUrl, courseName,participantsNumber,onClick}) => {

    return (
        <div className="shadow bg-white mt-4 d-flex align-items-center ps-2 pt-2 pb-2 card-hover2" style={{height: "120px", width: "350px", cursor:"pointer"}}><img
            src={imageUrl} style={{objectFit: "contain", height: "100%", width: "auto"}} className="chat-image-corner-radius" onClick={onClick}/>
            <p className="m-0 ms-3 chatroom-name"><b>{courseName}</b><br/>{participantsNumber} members</p>
        </div>
    )
}

export default ChatCard;