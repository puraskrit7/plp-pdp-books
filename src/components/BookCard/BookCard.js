import React, { useState } from "react";
import "./BookCard.scss";

const BookCard = ({ book, onAddToCart }) => {
  const { title, description, price, quantity, availability, type, image } =
    book;
  const [selectedQty, setSelectedQty] = useState(1);
  const handleAdd = () => {
    onAddToCart(selectedQty);
  };
  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>

      {type === "book" ? (
        <p>
          <strong>Quantity Available:</strong> {quantity}
        </p>
      ) : (
        <p>
          <strong>Availability:</strong> {availability}
        </p>
      )}

      <p>
        <em>Type: {type}</em>
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <div className="card-footer">
        {type === "book" && (
          <select
            value={selectedQty}
            onChange={(e) => setSelectedQty(Number(e.target.value))}
          >
            {Array.from({ length: quantity }, (_, i) => i + 1).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        )}
        <button className="add-to-cart" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default BookCard;
