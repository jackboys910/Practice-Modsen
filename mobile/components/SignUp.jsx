import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { registerUser } from '../api/userAPI'
import { setUser } from '../store/slices/userSlice'
import { signUpValidationSchema } from '../utils/validation/authValidation'

const { width } = Dimensions.get('window')

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
  }

  const validateField = async (field, value) => {
    try {
      await signUpValidationSchema.validateAt(field, { [field]: value })
      setErrors((prev) => ({ ...prev, [field]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }))
    }
  }

  const handleSubmit = async () => {
    try {
      await signUpValidationSchema.validate(formData, { abortEarly: false })

      const result = await registerUser(
        formData.email,
        formData.password,
        formData.nickname
      )
      if (result.success) {
        dispatch(setUser({ user: formData.nickname }))
        navigation.navigate('index')
      } else {
        Alert.alert('Error', result.message)
      }
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={formData.nickname}
          onChangeText={(value) => handleInputChange('nickname', value)}
        />
        {errors.nickname && <Text style={styles.error}>{errors.nickname}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 55,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    width: '90%',
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    width: width * 0.8,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    position: 'relative',
    bottom: 12,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default SignUp
