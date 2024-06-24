import React from 'react';
import BookCard from '../BookCard/BookCard';

// const BookList = ({ books, onBookSelect }) => {
//   return (
//     <div className='book-list'>
//       {Array.isArray(books) &&
//         books.map((book) => (
//           <BookCard key={book.id} book={book} onClick={onBookSelect} />
//         ))}
//     </div>
//   );
// };

const BookList = ({ books, onBookSelect }) => {
  const uniqueBooks = Array.from(new Set(books.map((book) => book.id))).map(
    (id) => books.find((book) => book.id === id),
  );

  const renderedBooks =
    Array.isArray(uniqueBooks) &&
    uniqueBooks.map((book) => (
      <BookCard key={book.id} book={book} onClick={onBookSelect} />
    ));

  return <div className='book-list'>{renderedBooks}</div>;
};

export default BookList;
