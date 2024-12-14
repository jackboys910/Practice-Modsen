import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, API_KEY } from '../constants/config'
import {
  getAverageRating,
  getUserRating,
  setBookRating,
} from '../store/slices/ratingSlice'
import { isUserLoggedIn } from '../utils/auth'

const { width, height } = Dimensions.get('window')

const BookDetail = ({ book, onBack, onAuthorSearch }) => {
  const dispatch = useDispatch()
  const { averageRating, userRating } = useSelector((state) => state.rating)
  const [selectedRating, setSelectedRating] = useState(0)
  const [image, setImage] = useState(null)
  const { volumeInfo } = book
  const { title, authors, categories, description, imageLinks } =
    volumeInfo || {}

  const { user } = useSelector((state) => state.user)
  const isAuthenticated = !!user

  const fetchImage = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${bookId}?key=${API_KEY}`)
      const data = await response.json()
      if (data.volumeInfo && data.volumeInfo.imageLinks) {
        setImage(
          data.volumeInfo.imageLinks.extraLarge ||
            data.volumeInfo.imageLinks.large ||
            data.volumeInfo.imageLinks.medium ||
            data.volumeInfo.imageLinks.small ||
            data.volumeInfo.imageLinks.thumbnail ||
            data.volumeInfo.imageLinks.smallThumbnail
        )
      } else {
        console.error('No image links available')
        setImage(null)
      }
    } catch (error) {
      console.error('Error fetching image:', error)
      setImage(null)
    }
  }

  useEffect(() => {
    if (book.id) {
      fetchImage(book.id)
    }
  }, [book])

  useEffect(() => {
    if (book.id) {
      dispatch(getAverageRating(book.id))
      if (isAuthenticated) {
        dispatch(getUserRating(book.id))
      }
    }
  }, [book.id, dispatch, isAuthenticated])

  useEffect(() => {
    setSelectedRating(userRating || 0)
  }, [userRating])

  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedRating(0)
    }
  }, [isAuthenticated])

  const handleAuthorClick = (author) => {
    onAuthorSearch(`"${author}"`)
  }

  const handleSetRating = (rating) => {
    setSelectedRating(rating)
    dispatch(setBookRating({ bookUri: book.id, rating }))
  }

  const renderStars = (rating, isInteractive = false) =>
    Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1
      const isGold = starValue <= rating
      return (
        <TouchableOpacity
          key={index}
          onPress={isInteractive ? () => handleSetRating(starValue) : null}
          activeOpacity={isInteractive ? 0.7 : 1}
        >
          <Text style={isGold ? styles.goldStar : styles.grayStar}>★</Text>
        </TouchableOpacity>
      )
    })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBlock}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.bookImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.infoBlock}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.infoContent}>
          {categories && categories.length > 0 && (
            <Text style={styles.categories}>{categories.join(', ')}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingBlock}>
            <Text>Average Rating:</Text>
            <View style={styles.inline}>
              {renderStars(averageRating)}
              <Text style={styles.ratingNumber}>
                ({averageRating ? averageRating.toFixed(2) : '0.00'})
              </Text>
            </View>
          </View>
          {authors && authors.length > 0 && (
            <Text style={styles.authors}>
              {authors.map((author, index) => (
                <Text
                  key={index}
                  style={styles.authorName}
                  onPress={() => handleAuthorClick(author)}
                >
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </Text>
              ))}
            </Text>
          )}
          <View style={styles.descriptionBlock}>
            <Text style={description ? styles.descriptionText : null}>
              {description}
            </Text>
          </View>
          {isAuthenticated && (
            <View style={styles.ratingBlock}>
              <Text>Your Rating:</Text>
              <View style={styles.inline}>
                {renderStars(selectedRating, true)}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBlock: {
    backgroundColor: '#eff2f2',
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    width: width * 0.7,
    height: height * 0.5,
  },
  infoBlock: {
    padding: 20,
  },
  backArrow: {
    fontSize: 45,
    color: 'black',
    position: 'absolute',
    left: -10,
    top: -500,
  },
  infoContent: {
    marginTop: 0,
  },
  categories: {
    fontSize: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  ratingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  ratingNumber: {
    marginLeft: 5,
  },
  authors: {
    marginVertical: 10,
    fontSize: 16,
    color: '#b8d8d7',
  },
  authorName: {
    textDecorationLine: 'underline',
    color: '#007bff',
  },
  descriptionBlock: {
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#b8d8d7',
    padding: 10,
  },
  goldStar: {
    fontSize: 32,
    color: 'gold',
    paddingBottom: 5,
  },
  grayStar: {
    fontSize: 32,
    color: 'gray',
    paddingBottom: 5,
  },
})

export default BookDetail
