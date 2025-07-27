import React, { useState } from "react";
import UserList from "../UserList/UserList";
import PrivateChat from "../PrivateChat/PrivateChat";
import "./ChatPage.scss";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-page">
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && <PrivateChat otherUser={selectedUser} />}
    </div>
  );
}

export default ChatPage;
