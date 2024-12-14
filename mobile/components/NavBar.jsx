import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getCurrentUser } from '../api/userAPI'
import { logout, setUser } from '../store/slices/userSlice'
import { clearRating } from '../store/slices/ratingSlice'

const { width } = Dimensions.get('window')

const NavBar = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const result = await getCurrentUser()
        if (result.success) {
          dispatch(setUser({ user: result.data.nickname }))
        } else {
          dispatch(logout())
        }
      }
    }

    fetchData()
  }, [dispatch, user])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch(clearRating())
    dispatch(logout())
    navigation.navigate('index')
  }

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Text style={styles.logo}>LibraryApp</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        {user ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.actionButton}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.actionButton}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Authorization', { type: 'login' })
              }
              style={styles.secondaryButton}
            >
              <Text style={styles.actionButton}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Authorization', { type: 'registration' })
              }
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#454242',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f39c12',
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    color: '#ecf0f1',
    marginHorizontal: 5,
  },
  secondaryButton: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#f39c12',
    padding: 8,
    borderRadius: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default NavBar
