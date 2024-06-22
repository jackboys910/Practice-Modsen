import React from 'react';
import BookCard from './BookCard';

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

  return (
    <div className='book-list'>
      {Array.isArray(uniqueBooks) &&
        uniqueBooks.map((book) => (
          <BookCard key={book.id} book={book} onClick={onBookSelect} />
        ))}
    </div>
  );
};

export default BookList;
