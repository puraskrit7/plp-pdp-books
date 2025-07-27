import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./PrivateChat.scss";

function PrivateChat({ otherUser, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const currentUser = auth.currentUser;
  const chatId = [currentUser.uid, otherUser.id].sort().join("_");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input,
      senderId: currentUser.uid,
      receiverId: otherUser.id,
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <div className="avatar">{otherUser.username?.[0]}</div>
        <div className="details">
          <p className="name">{otherUser.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${
              msg.senderId === currentUser.uid ? "sent" : "received"
            }`}
          >
            <p className="text">{msg.text}</p>
            <span className="time">
              {msg.createdAt?.toDate
                ? msg.createdAt
                    .toDate()
                    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : ""}
            </span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default PrivateChat;
