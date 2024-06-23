import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';
import Loader from './Loader';
import BookDetail from './BookDetail';
import { API_KEY } from '../config';
import './BookSearch.css';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [queryParams, setQueryParams] = useState({
    query: 'all',
    category: 'all',
    sort: 'relevance',
    startIndex: 0,
  });
  const [selectedBook, setSelectBook] = useState(null);

  const fetchBooks = async (newQueryParams) => {
    const { query, category, sort, startIndex } = newQueryParams;
    // const categoryQuery = category !== 'all' ? `+subject:${category}` : '';
    // const url = `https://www.googleapis.com/books/v1/volumes?q=${query}${categoryQuery}&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`;

    const categoryQuery =
      category !== 'all' ? `+subject:${encodeURIComponent(category)}` : '';
    const searchQuery = query ? encodeURIComponent(query) : '';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${categoryQuery}&orderBy=${encodeURIComponent(sort)}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`;

    console.log('Fetching books with URL:', url);

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const newBooks = data.items || [];

      setBooks((prevBooks) => {
        // Фильтруем дублирующиеся книги
        const allBooks = [...prevBooks, ...newBooks];
        const uniqueBooks = Array.from(
          new Set(allBooks.map((book) => book.id)),
        ).map((id) => allBooks.find((book) => book.id === id));
        return uniqueBooks;
      });

      setTotalItems(data.totalItems || 0);
      setQueryParams(newQueryParams);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(queryParams);
  }, []);

  const handleSearch = (searchParams) => {
    setSelectBook(null);
    setBooks([]);
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

  const handleAuthorSearch = (author) => {
    handleSearch({
      query: `inauthor:${author}`,
      category: 'all',
      sort: 'relevance',
    });
  };

  return (
    <div className='BookSearch'>
      <SearchBar
        onSearch={handleSearch}
        className={selectedBook ? 'no-margin' : ''}
      />
      {loading && <Loader />}
      {!selectedBook && totalItems > 0 && !loading && (
        <div className='results-info'>
          <p>Found {totalItems} results</p>
        </div>
      )}
      {selectedBook ? (
        <BookDetail
          book={selectedBook}
          onBack={handleBack}
          onAuthorSearch={handleAuthorSearch}
        />
      ) : (
        <>
          {Array.isArray(books) && (
            <BookList books={books} onBookSelect={handleBookSelect} />
          )}
          {!loading && totalItems > (books?.length || 0) && (
            <button onClick={loadMoreBooks} className='load-more'>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default BookSearch;
