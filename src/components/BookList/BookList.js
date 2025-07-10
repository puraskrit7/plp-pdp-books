import React, { useState } from "react";
import BookCard from "../BookCard/BookCard";
import Header from "../Header/Header";
import './BookList.scss';

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    description: "A novel set in the 1920s",
    price: 10.99,
    quantity: 12,
    type: "book",
    image:
      "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?t=st=1752085491~exp=1752089091~hmac=c9c7104b9458b52dfd9b320ae1d05548f032d4bc3d819616fe3acc759ac3074f&w=2000",
  },
  {
    id: 2,
    title: "Atomic Habits",
    description: "A guide to building good habits.",
    price: 14.99,
    availability: "Available",
    type: "audiobook",
    image:
      "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?t=st=1752085491~exp=1752089091~hmac=c9c7104b9458b52dfd9b320ae1d05548f032d4bc3d819616fe3acc759ac3074f&w=2000",
  },
  {
    id: 3,
    title: "1984",
    description: "Dystopian novel by George Orwell.",
    price: 8.99,
    quantity: 5,
    type: "book",
    image:
      "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?t=st=1752085491~exp=1752089091~hmac=c9c7104b9458b52dfd9b320ae1d05548f032d4bc3d819616fe3acc759ac3074f&w=2000",
  },
  {
    id: 4,
    title: "Becoming",
    description: "Memoir by Michelle Obama.",
    price: 12.99,
    availability: "Not Available",
    type: "audiobook",
    image:
      "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?t=st=1752085491~exp=1752089091~hmac=c9c7104b9458b52dfd9b320ae1d05548f032d4bc3d819616fe3acc759ac3074f&w=2000",
  },
  {
    id: 5,
    title: "Becoming",
    description: "Memoir by Michelle Obama.",
    price: 12.99,
    availability: "Not Available",
    type: "audiobook",
    image:
      "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg?t=st=1752085491~exp=1752089091~hmac=c9c7104b9458b52dfd9b320ae1d05548f032d4bc3d819616fe3acc759ac3074f&w=2000",
  },
];

const BookList = ({handleAddToCart}) => {
  

  return (
    <>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </>
  );
};

export default BookList;