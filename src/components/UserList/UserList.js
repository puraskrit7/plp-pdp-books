import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./UserList.scss";

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDocs(collection(db, "users"));
        const userList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((u) => u.id !== user.uid);

        setUsers(userList);
      } else {
        setUsers([]);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="user-list">
      <h2>Chats</h2>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="user"
            onClick={() => onSelectUser(user)}
          >
            <div className="avatar">{user.username?.[0]?.toUpperCase()}</div>
            <div className="info">
              <p className="name">{user.username}</p>
              <p className="preview">Click to chat</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;
