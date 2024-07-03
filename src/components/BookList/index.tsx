import React from 'react';

import BookCard from '../BookCard';

interface VolumeInfo {
  title: string;
  authors?: string[];
  categories?: string[];
  imageLinks?: {
    thumbnail: string;
  };
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface BookListProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookSelect }) => {
  const uniqueBooks = Array.from(new Set(books.map((book) => book.id))).map((id) => books.find((book) => book.id === id)) as Book[];

  const renderedBooks = uniqueBooks.map((book) => <BookCard key={book.id} book={book} onClick={onBookSelect} />);

  return <div className='book-list'>{renderedBooks}</div>;
};

export default BookList;
