import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Loader from './components/Loader';
import BookDetail from './components/BookDetail';
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
  const [selectedBook, setSelectBook] = useState(null);

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

  const handleBookSelect = (book) => {
    setSelectBook(book);
  };

  const handleBack = () => {
    setSelectBook(null);
  };

  return (
    <div className='App'>
      <SearchBar
        onSearch={handleSearch}
        className={selectedBook ? 'no-margin' : ''}
      />
      {loading && <Loader />}
      {!selectedBook && totalItems > 0 && (
        <div className='results-info'>
          <p>Found {totalItems} results</p>
        </div>
      )}
      {selectedBook ? (
        <BookDetail book={selectedBook} onBack={handleBack} />
      ) : (
        <>
          {Array.isArray(books) && (
            <BookList books={books} onBookSelect={handleBookSelect} />
          )}
          {totalItems > (books?.length || 0) && (
            <button onClick={loadMoreBooks} className='load-more'>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
