import React from 'react'
import { useRoute } from '@react-navigation/native'
import LogIn from '../../components/LogIn'
import SignUp from '../../components/SignUp'
import { View } from 'react-native'

const AuthorizationPage = () => {
  const route = useRoute()
  const { type } = route.params

  const isLogin = type === 'login'

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      {isLogin ? <LogIn /> : <SignUp />}
    </View>
  )
}

export default AuthorizationPage
