import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useFocusEffect } from '@react-navigation/native'
import profileValidationSchema from '../../utils/validation/profileValidation'
import {
  fetchProfile,
  resetProfile,
  updateProfile,
} from '../../store/slices/profileSlice'
import { BACKEND_BASE_URL } from '../../constants/config'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { profile, loading } = useSelector((state) => state.profile)
  const user = useSelector((state) => state.user.user)

  const [formData, setFormData] = useState({
    description: '',
    phoneNumber: '',
    location: '',
    favoriteBook: '',
    favoriteAuthor: '',
    profilePicture: null,
  })
  const [selectedFileName, setSelectedFileName] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [errors, setErrors] = useState({})

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProfile())
      setSelectedFileName('')
    }, [dispatch])
  )

  useEffect(() => {
    if (profile) {
      setFormData({
        description: profile.description || '',
        phoneNumber: profile.phoneNumber || '',
        location: profile.location || '',
        favoriteBook: profile.favoriteBook || '',
        favoriteAuthor: profile.favoriteAuthor || '',
        profilePicture: null,
      })

      setProfilePictureUrl(
        profile.profilePicture
          ? `${BACKEND_BASE_URL}/images/${profile.profilePicture}`
          : `${BACKEND_BASE_URL}/images/defaultUser.png`
      )
    }
  }, [profile])

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
  }

  const handleFileChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const file = result.assets[0]
      setFormData({ ...formData, profilePicture: file })
      setSelectedFileName(file.fileName || 'Selected Image')

      setProfilePictureUrl(file.uri)
      validateField('profilePicture', file)
    }
  }

  const validateField = async (field, value) => {
    try {
      await profileValidationSchema.validateAt(field, { [field]: value })
      setErrors((prev) => ({ ...prev, [field]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }))
    }
  }

  const handleSubmit = async () => {
    try {
      await profileValidationSchema.validate(formData, { abortEarly: false })

      const data = new FormData()
      for (const key in formData) {
        if (key === 'profilePicture' && formData.profilePicture) {
          const { uri, fileName, mimeType } = formData.profilePicture
          data.append(key, {
            uri,
            name: fileName || 'profile-image.jpg',
            type: mimeType || 'image/jpeg',
          })
        } else if (formData[key]) {
          data.append(key, formData[key])
        }
      }
      dispatch(updateProfile(data))
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message
      })
      setErrors(validationErrors)
    }
  }

  const handleReset = () => {
    dispatch(resetProfile())
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.highlight}>Welcome,</Text> {user}
      </Text>

      <View style={styles.pictureContainer}>
        {profilePictureUrl && (
          <Image
            source={{ uri: profilePictureUrl }}
            style={styles.picture}
            onError={(error) =>
              console.error('Image load error:', error.nativeEvent.error)
            }
          />
        )}
        <TouchableOpacity onPress={handleFileChange} style={styles.fileButton}>
          <Text style={styles.fileButtonText}>Choose File</Text>
        </TouchableOpacity>
        <Text style={styles.fileName}>
          {selectedFileName || 'No file chosen'}
        </Text>
        {errors.profilePicture && (
          <Text style={styles.error}>{errors.profilePicture}</Text>
        )}
      </View>

      <View style={styles.form}>
        <Text style={styles.inputName}>Description</Text>
        <TextInput
          placeholder="Description"
          style={styles.inputDescription}
          multiline={true}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        {errors.description && (
          <Text style={styles.error}>{errors.description}</Text>
        )}

        <Text style={styles.inputName}>Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber}</Text>
        )}

        <Text style={styles.inputName}>Location</Text>
        <TextInput
          placeholder="Location"
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />
        {errors.location && <Text style={styles.error}>{errors.location}</Text>}

        <Text style={styles.inputName}>Favorite Book</Text>
        <TextInput
          placeholder="Favorite Book"
          style={styles.input}
          value={formData.favoriteBook}
          onChangeText={(text) => handleInputChange('favoriteBook', text)}
        />
        {errors.favoriteBook && (
          <Text style={styles.error}>{errors.favoriteBook}</Text>
        )}

        <Text style={styles.inputName}>Favorite Author</Text>
        <TextInput
          placeholder="Favorite Author"
          style={styles.input}
          value={formData.favoriteAuthor}
          onChangeText={(text) => handleInputChange('favoriteAuthor', text)}
        />
        {errors.favoriteAuthor && (
          <Text style={styles.error}>{errors.favoriteAuthor}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Update Profile" onPress={handleSubmit} />
          <Button title="Reset Profile" onPress={handleReset} color="red" />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 1150,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  pictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  fileButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  fileButtonText: {
    color: '#fff',
  },
  fileName: {
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
  form: {
    width: '100%',
  },
  inputName: {
    marginLeft: 3,
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
  },
  inputDescription: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 150,
    textAlignVertical: 'top',
    multiline: true,
  },
  buttonContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    position: 'relative',
    bottom: 5,
    marginBottom: 10,
  },
})

export default ProfilePage
