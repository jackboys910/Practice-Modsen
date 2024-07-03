import React from 'react';

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

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, imageLinks } = volumeInfo || {};

  const handleClick = () => {
    onClick(book);
  };

  return (
    <div className='book-list__card' onClick={handleClick}>
      <div className='book-list__card-image'>{imageLinks && <img src={imageLinks.thumbnail} alt={`${title} cover`} />}</div>
      <div className='book-list__card-content'>
        {categories && <p className='book-list__card-categories'>{categories.join(', ')}</p>}
        <h3 className='book-list__card-title'>{title}</h3>
        {authors && <p className='book-list__card-authors'>By {authors.join(', ')}</p>}
      </div>
    </div>
  );
};

export default BookCard;
