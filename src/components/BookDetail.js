import React from 'react';
import './BookDetail.css';

const BookDetail = ({ book, onBack }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } =
    volumeInfo || {};

  return (
    <div className='book-detail'>
      <div className='book-detail__block-left'>
        <div className='book-detail__block-image'>
          {imageLinks && (
            <img
              className='book-detail__image-big'
              src={imageLinks.thumbnail}
              alt={title}
            />
          )}
        </div>
      </div>
      <div className='book-detail__block-right'>
        {/* <button className='book-detail__back-button' onClick={onBack}>
          Back
        </button> */}
        <div className='book-detail__arrow-align'>
          <i
            className='fa fa-arrow-left book-detail__arrow'
            aria-hidden='true'
            onClick={onBack}
          ></i>
        </div>
        <div className='book-detail__info'>
          {categories && categories.length > 0 && (
            <p className='book-detail__categories'>{categories.join(', ')}</p>
          )}
          <h2 className='book-detail__title'>{title}</h2>
          {authors && authors.length > 0 && (
            <p className='book-detail__authors'>{authors.join(', ')}</p>
          )}
          <div className='book-detail__description'>
            <p className='book-detail__description-text'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
