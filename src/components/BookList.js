import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onBookSelect }) => {
  return (
    <div className='book-list'>
      {Array.isArray(books) &&
        books.map((book) => (
          <BookCard key={book.id} book={book} onClick={onBookSelect} />
        ))}
    </div>
  );
};

export default BookList;
