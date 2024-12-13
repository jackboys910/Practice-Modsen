import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import LogIn from '../../components/LogIn'
import SignUp from '../../components/SignUp'

const AuthorizationPage = () => {
  const { type } = useParams()

  const isLogin = type === 'login'

  return <div>{isLogin ? <LogIn /> : <SignUp />}</div>
}

export default AuthorizationPage
