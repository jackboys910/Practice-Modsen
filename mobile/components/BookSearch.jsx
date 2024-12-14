import React, { useEffect, useState, useRef } from 'react'
import {
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { API_BASE_URL, API_KEY } from '../constants/config'
import BookDetail from './BookDetail'
import BookList from './BookList'
import SearchBar from './SearchBar'

function BookSearch() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [queryParams, setQueryParams] = useState({
    query: 'all',
    category: 'all',
    sort: 'relevance',
    startIndex: 0,
  })
  const [selectedBook, setSelectBook] = useState(null)
  const [error, setError] = useState(null)

  const scrollViewRef = useRef(null)

  const fetchBooks = async (newQueryParams) => {
    const { query, category, sort, startIndex } = newQueryParams

    const categoryQuery =
      category !== 'all' ? `+subject:${encodeURIComponent(category)}` : ''
    const searchQuery = query ? encodeURIComponent(query) : ''
    const url = `${API_BASE_URL}?q=${searchQuery}${categoryQuery}&orderBy=${encodeURIComponent(
      sort
    )}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`

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
        const uniqueBooks = Array.from(
          new Set(allBooks.map((book) => book.id))
        ).map((id) => allBooks.find((book) => book.id === id))
        return uniqueBooks
      })

      setTotalItems(data.totalItems || 0)
      setQueryParams(newQueryParams)
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('An error occurred while fetching books.')
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks(queryParams)
  }, [])

  const handleSearch = (searchParams) => {
    setSelectBook(null)
    setBooks([])
    fetchBooks({ ...searchParams, startIndex: 0 })
  }

  const loadMoreBooks = () => {
    fetchBooks({ ...queryParams, startIndex: queryParams.startIndex + 30 })
  }

  const handleBookSelect = (book) => {
    setSelectBook(book)

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 350, animated: true })
    }
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
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 15 }}
          size="large"
          color="#0000ff"
        />
      )}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {!selectedBook && totalItems > 0 && !loading && (
        <Text style={styles.resultsInfo}>Found {totalItems} results</Text>
      )}
      {selectedBook ? (
        <BookDetail
          book={selectedBook}
          onBack={handleBack}
          onAuthorSearch={handleAuthorSearch}
        />
      ) : (
        <>
          <BookList books={books} onBookSelect={handleBookSelect} />
          {!loading && totalItems > (books?.length || 0) && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMoreBooks}
            >
              <Text style={styles.loadMoreText}>Load more</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  errorMessage: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  resultsInfo: {
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  loadMoreButton: {
    margin: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default BookSearch
