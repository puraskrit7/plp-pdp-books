import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import PrivateChat from "../PrivateChat/PrivateChat";
import "./ChatApp.scss";

export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const allUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.id !== auth.currentUser.uid);
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="chat-app">
      {/* Sidebar (hidden on mobile when a chat is open) */}
      <div className={`sidebar ${selectedUser ? "hidden-mobile" : ""}`}>
        <h3>Chats</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={selectedUser?.id === user.id ? "active" : ""}
              onClick={() => setSelectedUser(user)}
            >
              {user.username || "User"}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat content */}
      <div className="chat-content">
        {selectedUser ? (
          <PrivateChat
            otherUser={selectedUser}
            onBack={() => setSelectedUser(null)} // Back button for mobile
          />
        ) : (
          <p className="placeholder">Select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
}
