import './index.css'

import React, { useEffect, useState } from 'react'

import { API_BASE_URL, API_KEY } from '../../constants/config'
import BookDetail from '../BookDetail'
import BookList from '../BookList'
import Loader from '../Loader'
import SearchBar from '../SearchBar'

function BookSearch({ initialQuery = '' }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [query, setQuery] = useState(initialQuery || '')
  const [queryParams, setQueryParams] = useState({
    query: initialQuery || 'all',
    category: 'all',
    sort: 'relevance',
    startIndex: 0,
  })
  const [selectedBook, setSelectBook] = useState(null)
  const [error, setError] = useState(null)

  const fetchBooks = async (newQueryParams) => {
    const { query, category, sort, startIndex } = newQueryParams

    const effectiveQuery = query.trim() === '' ? 'all' : query
    const categoryQuery = category !== 'all' ? `+subject:${encodeURIComponent(category)}` : ''
    const searchQuery = effectiveQuery ? encodeURIComponent(effectiveQuery) : ''
    const url = `${API_BASE_URL}?q=${searchQuery}${categoryQuery}&publishedDate=${encodeURIComponent(sort)}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(url)
      const data = await response.json()
      if (!data.items) {
        throw new Error('No books found.')
      }

      const newBooks = data.items || []
      setBooks((prevBooks) => {
        const allBooks = [...prevBooks, ...newBooks]
        const uniqueBooks = Array.from(new Set(allBooks.map((book) => book.id))).map((id) => allBooks.find((book) => book.id === id))
        return uniqueBooks
      })

      setTotalItems(data.totalItems || 0)
      setQueryParams(newQueryParams)
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('An eror occurred while fetching books.')
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      fetchBooks({ ...queryParams, query: initialQuery })
    } else {
      fetchBooks(queryParams)
    }
  }, [initialQuery])

  const handleSearch = (searchParams) => {
    setSelectBook(null)
    setBooks([])
    setQuery(searchParams.query)
    fetchBooks({ ...searchParams, query: searchParams.query.trim() || 'all', startIndex: 0 })
  }

  const loadMoreBooks = () => {
    fetchBooks({ ...queryParams, startIndex: queryParams.startIndex + 30 })
  }

  const handleBookSelect = (book) => {
    setSelectBook(book)
  }

  const handleBack = () => {
    setSelectBook(null)
  }

  const handleAuthorSearch = (author) => {
    handleSearch({
      query: `inauthor:${author}`,
      category: 'all',
      sort: 'relevance',
    })
  }

  return (
    <div className='book-search'>
      <SearchBar onSearch={handleSearch} className={selectedBook ? 'no-margin' : ''} query={query} setQuery={setQuery} />
      {loading && <Loader />}
      {error && <div className='book-search__error-message'>{error}</div>}
      {!selectedBook && totalItems > 0 && !loading && (
        <div className='book-search__results-info'>
          <p>Found {totalItems} results</p>
        </div>
      )}
      {selectedBook ? (
        <BookDetail book={selectedBook} onBack={handleBack} onAuthorSearch={handleAuthorSearch} />
      ) : (
        <>
          {Array.isArray(books) && <BookList books={books} onBookSelect={handleBookSelect} />}
          {!loading && totalItems > (books?.length || 0) && (
            <button onClick={loadMoreBooks} className='book-search__load-more'>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default BookSearch
