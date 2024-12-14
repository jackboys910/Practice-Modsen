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
import { loginUser } from '../api/userAPI'
import { setUser } from '../store/slices/userSlice'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleSubmit = async () => {
    const result = await loginUser(email, password)
    if (result.success) {
      dispatch(setUser({ user: result.data.nickname }))
      navigation.navigate('index')
    } else {
      Alert.alert('Error', result.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
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
    marginBottom: 25,
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

export default LogIn
