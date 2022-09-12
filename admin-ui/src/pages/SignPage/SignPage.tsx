import React, { FC } from 'react'

import s from './SignPage.module.scss'

const SignPage: FC = ({ children }) => {
  return <div className={s.signPage}>{children}</div>
}

export default SignPage
