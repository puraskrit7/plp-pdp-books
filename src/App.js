import React, { useState } from "react";
import './App.css';
import BookList from './components/BookList/BookList';
import Header from './components/Header/Header'

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (qty) => {
    setCartCount((prev) => prev + qty);
  };
  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main className="container">
    <BookList handleAddToCart={handleAddToCart} />
  </main>
    </div>
  );
}

export default App;
