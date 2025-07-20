// Header.jsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, UserCircle2 } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import LoginPage from "../LoginPage/LoginPage";
import "./Header.scss";

const Header = ({ cartCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Listen for login state
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
      <span>Bookstore</span>
      
      <div className="header-actions">
        <div className="cart-icon">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

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
    </header>
  );
};

export default Header;
