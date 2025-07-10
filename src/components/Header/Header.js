// Header.jsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import "./Header.scss";

const Header = ({ cartCount }) => {
  return (
    <header className="header-nav">
      <span>Bookstore</span>
      <div className="cart-icon">
        <ShoppingCart size={24} />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </header>
  );
};

export default Header;
