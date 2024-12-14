import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const BookCard = ({ book, onClick }) => {
  const { volumeInfo } = book
  const { title, authors, categories, imageLinks } = volumeInfo || {}

  const handleClick = () => {
    onClick(book)
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleClick}>
      <View style={styles.imageContainer}>
        {imageLinks && (
          <Image
            source={{ uri: imageLinks.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.content}>
        {categories && (
          <Text style={styles.categories} numberOfLines={1}>
            {categories.join(', ')}
          </Text>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {authors && (
          <Text style={styles.authors} numberOfLines={1}>
            By {authors.join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    padding: 10,
    width: 300,
    height: 420,
    backgroundColor: '#eff2f2',
    borderRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  categories: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  authors: {
    fontSize: 14,
    color: '#666',
  },
})

export default BookCard
