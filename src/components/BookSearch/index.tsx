import './index.css';

import React, { useEffect, useState } from 'react';

import { API_BASE_URL, API_KEY } from '../../constants/config';
import BookDetail from '../BookDetail';
import BookList from '../BookList';
import Loader from '../Loader';
import SearchBar from '../SearchBar';

const BookSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);

  const fetchBooks = async (params: { query: string; category: string; sort: string }) => {
    const { query, category, sort } = params;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}?q=${query}+subject:${category}&orderBy=${sort}&key=${API_KEY}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='book-search'>
      <SearchBar onSearch={fetchBooks} />
      {loading && <Loader />}
      {error && <div className='book-search__error-message'>{error}</div>}
      <div className='book-list'>
        {books.map((book) => (
          <div key={book.id} className='book-list__card'>
            <div className='book-list__card-image'>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            </div>
            <div className='book-list__card-content'>
              <h3 className='book-list__card-title'>{book.volumeInfo.title}</h3>
              <p className='book-list__card-authors'>{book.volumeInfo.authors?.join(', ')}</p>
              <p className='book-list__card-categories'>{book.volumeInfo.categories?.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
