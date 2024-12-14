import React from 'react'
import { StyleSheet, View } from 'react-native'
import BookCard from './BookCard'

const BookList = ({ books, onBookSelect }) => {
  const uniqueBooks = Array.from(new Set(books.map((book) => book.id))).map(
    (id) => books.find((book) => book.id === id)
  )

  return (
    <View style={styles.list}>
      {uniqueBooks.map((book) => (
        <BookCard key={book.id} book={book} onClick={onBookSelect} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginLeft: 22,
  },
})

export default BookList
