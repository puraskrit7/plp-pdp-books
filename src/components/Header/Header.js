import React, { useState, useEffect } from "react";
import { ShoppingCart, UserCircle2, MessageCircle } from "lucide-react"; // Added MessageCircle
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import LoginPage from "../LoginPage/LoginPage";
import ChatApp from "../ChatApp/ChatApp"; // New ChatApp wrapper
import "./Header.scss";

const Header = ({ cartCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <header className="header-nav">
      <span>Welcome to Puraskrit's Bookstore</span>
      
      <div className="header-actions">
        <div className="cart-icon">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        {/* Chat Icon (only if logged in) */}
        {user && (
          <div className="chat-icon" onClick={() => setShowChat(true)}>
            <MessageCircle size={28} />
          </div>
        )}

        {/* Show Login/Signup if logged out */}
        {!user && (
          <>
            <button onClick={() => setShowModal(true)}>Login / Signup</button>
          </>
        )}

        {/* Avatar dropdown if logged in */}
        {user && (
          <div className="avatar-wrapper">
            <UserCircle2
              size={32}
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="avatar-icon"
            />
            {dropdownOpen && (
              <div className="dropdown">
                <p>{userData?.username || "User"}</p>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for LoginPage */}
      {showModal && !user && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
            <LoginPage />
          </div>
        </div>
      )}

      {/* Modal for Chat */}
      {showChat && (
        <div className="modal-overlay">
          <div className="modal chat-modal">
            <button className="close-btn" onClick={() => setShowChat(false)}>X</button>
            <ChatApp currentUser={user} /> {/* Your chat app */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
