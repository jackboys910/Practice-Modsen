import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Loader from './components/Loader';
import { API_KEY } from './config';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [queryParams, setQueryParams] = useState({
    query: '',
    category: 'all',
    sort: 'relevance',
    startIndex: 0,
  });

  const fetchBooks = async (newQueryParams) => {
    const { query, category, sort, startIndex } = newQueryParams;
    const categoryQuery = category !== 'all' ? `+subject:${category}` : '';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}${categoryQuery}&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setBooks((prevBooks) =>
        startIndex === 0 ? data.items : [...prevBooks, ...data.items],
      );
      setTotalItems(data.totalItems || 0);
      setQueryParams(newQueryParams);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchParams) => {
    fetchBooks({ ...searchParams, startIndex: 0 });
  };

  const loadMoreBooks = () => {
    fetchBooks({ ...queryParams, startIndex: queryParams.startIndex + 30 });
  };

  return (
    <div className='App'>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      <div className='results-info'>
        {totalItems > 0 && <p>Found {totalItems} results</p>}
      </div>
      {Array.isArray(books) && <BookList books={books} />}
      {totalItems > (books?.length || 0) && (
        <button onClick={loadMoreBooks} className='load-more'>
          Load more
        </button>
      )}
    </div>
  );
}

export default App;
