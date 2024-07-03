import './index.css';

import React, { useEffect, useState } from 'react';

import { API_BASE_URL, API_KEY } from '../../constants/config';

interface VolumeInfo {
  title: string;
  authors?: string[];
  categories?: string[];
  description?: string;
  imageLinks?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    small?: string;
    thumbnail?: string;
    smallThumbnail?: string;
  };
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onAuthorSearch: (author: string) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onBack, onAuthorSearch }) => {
  const [image, setImage] = useState<string | null>(null);
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } = volumeInfo || {};

  const fetchImage = async (bookId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${bookId}?key=${API_KEY}`);
      const data = await response.json();
      if (data.volumeInfo && data.volumeInfo.imageLinks) {
        console.log('Image Links:', data.volumeInfo.imageLinks);
        setImage(
          data.volumeInfo.imageLinks.extraLarge ||
            data.volumeInfo.imageLinks.large ||
            data.volumeInfo.imageLinks.medium ||
            data.volumeInfo.imageLinks.small ||
            data.volumeInfo.imageLinks.thumbnail ||
            data.volumeInfo.imageLinks.smallThumbnail,
        );
      } else {
        console.error('No image links available');
        setImage(null);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImage(null);
    }
  };

  useEffect(() => {
    if (book.id) {
      fetchImage(book.id);
    }
  }, [book]);

  const handleAuthorClick = (author: string) => {
    onAuthorSearch(author);
  };

  return (
    <div className='book-detail'>
      <div className='book-detail__block'>
        <div className='book-detail__block-image'>{image && <img className='book-detail__image-big' src={image} alt={title} />}</div>
      </div>
      <div className='book-detail__block'>
        <div className='book-detail__arrow-align'>
          <i className='fa fa-arrow-left book-detail__arrow' aria-hidden='true' onClick={onBack}></i>
        </div>
        <div className='book-detail__info'>
          {categories && categories.length > 0 && <p className='book-detail__categories'>{categories.join(', ')}</p>}
          <h2 className='book-detail__title'>{title}</h2>
          {authors && authors.length > 0 && (
            <p className='book-detail__authors'>
              {authors.map((author, index) => (
                <span key={index} className='book-detail__author-name' onClick={() => handleAuthorClick(author)}>
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          {description && <p className='book-detail__description'>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
