import AsyncStorage from '@react-native-async-storage/async-storage'

export const isUserLoggedIn = async () => {
  const token = await AsyncStorage.getItem('token')
  return !!token
}
