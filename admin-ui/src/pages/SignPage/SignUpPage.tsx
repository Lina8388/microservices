import React, { FC } from 'react'

import { SignUp } from '../../components/Forms'

import SignPage from './SignPage'

// interface SignUpPageProps {}

const SignUpPage: FC = () => {
  return (
    <SignPage>
      <SignUp />
    </SignPage>
  )
}

export default SignUpPage
