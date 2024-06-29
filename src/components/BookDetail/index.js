import './index.css';

import React, { useEffect, useState } from 'react';

import { API_BASE_URL, API_KEY } from '../../constants/config';

const BookDetail = ({ book, onBack, onAuthorSearch }) => {
  const [image, setImage] = useState(null);
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } = volumeInfo || {};

  const fetchImage = async (bookId) => {
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

  // const getHighQualityImage = (imageLinks) => {
  //   if (imageLinks) {
  //     console.log('Image Links:', imageLinks);
  //     return imageLinks.extraLarge || imageLinks.large || imageLinks.thumbnail;
  //   }
  //   return null;
  // };

  // const highQualityImage = getHighQualityImage(imageLinks);

  const handleAuthorClick = (author) => {
    onAuthorSearch(`"${author}"`);
  };

  return (
    <div className='book-detail'>
      <div className='book-detail__block'>
        <div className='book-detail__block-image'>{image && <img className='book-detail__image-big' src={image} alt={title} />}</div>
      </div>
      <div className='book-detail__block'>
        {/* <button className='book-detail__back-button' onClick={onBack}>
          Back
        </button> */}
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
          <div className='book-detail__description'>
            <p className={description ? 'book-detail__description-text' : ''}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
