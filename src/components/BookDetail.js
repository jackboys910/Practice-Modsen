import React from 'react';
import './BookDetail.css';

const BookDetail = ({ book, onBack, onAuthorSearch }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } =
    volumeInfo || {};

  const getHighQualityImage = (imageLinks) => {
    if (imageLinks) {
      console.log('Image Links:', imageLinks);
      return imageLinks.extraLarge || imageLinks.large || imageLinks.thumbnail;
    }
    return null;
  };

  const highQualityImage = getHighQualityImage(imageLinks);

  const handleAuthorClick = (author) => {
    onAuthorSearch(`"${author}"`);
  };

  return (
    <div className='book-detail'>
      <div className='book-detail__block-left'>
        <div className='book-detail__block-image'>
          {highQualityImage && (
            <img
              className='book-detail__image-big'
              src={highQualityImage}
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
            <p className='book-detail__authors'>
              {authors.map((author, index) => (
                <span
                  key={index}
                  className='book-detail__author-name'
                  onClick={() => handleAuthorClick(author)}
                >
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          <div className='book-detail__description'>
            <p className={description ? 'book-detail__description-text' : ''}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
